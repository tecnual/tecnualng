import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  ElementRef,
  signal,
  viewChild,
  ViewEncapsulation,
  effect,
  OnDestroy,
  NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TngTabComponent } from './tng-tab.component';

@Component({
  selector: 'tng-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tng-tabs">
      <div class="tng-tabs__header">
        @if (showPagination()) {
          <div 
            class="tng-tabs__pagination tng-tabs__pagination--prev"
            [class.tng-tabs__pagination--disabled]="scrollLeft() <= 0"
            (click)="scrollHeader(-1)">
            <i class="fa fa-chevron-left"></i>
          </div>
        }

        <div class="tng-tabs__list-container" #listContainer>
          <div 
            class="tng-tabs__list" 
            #tabList
            [style.transform]="'translateX(' + (-scrollLeft()) + 'px)'">
            @for (tab of tabs(); track tab; let i = $index) {
              <div 
                class="tng-tabs__label"
                [class.tng-tabs__label--active]="activeIndex() === i"
                (click)="selectTab(i)"
                #tabLabel>
                {{ tab.label() }}
              </div>
            }
            <div 
              class="tng-tabs__ink-bar"
              [style.left.px]="inkBarLeft()"
              [style.width.px]="inkBarWidth()">
            </div>
          </div>
        </div>

        @if (showPagination()) {
          <div 
            class="tng-tabs__pagination tng-tabs__pagination--next"
            [class.tng-tabs__pagination--disabled]="isScrolledToEnd()"
            (click)="scrollHeader(1)">
            <i class="fa fa-chevron-right"></i>
          </div>
        }
      </div>

      <div class="tng-tabs__content">
        @for (tab of tabs(); track tab; let i = $index) {
          @if (activeIndex() === i) {
            <ng-container *ngTemplateOutlet="tab.content()"></ng-container>
          }
        }
      </div>
    </div>
  `,
  styleUrl: './tng-tabs.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TngTabsComponent implements AfterViewInit, OnDestroy {
  tabs = contentChildren(TngTabComponent);
  
  activeIndex = signal(0);
  inkBarLeft = signal(0);
  inkBarWidth = signal(0);
  
  // Pagination state
  scrollLeft = signal(0);
  showPagination = signal(false);
  isScrolledToEnd = signal(false);

  // Element refs
  listContainer = viewChild<ElementRef<HTMLElement>>('listContainer');
  tabList = viewChild<ElementRef<HTMLElement>>('tabList');
  tabLabels = viewChild.required<ElementRef<HTMLElement>[]>('tabLabel' as any); // Using any cast as viewChildren is not available in this version or syntax might differ, actually let's use DOM query for labels or just rely on index

  private resizeObserver: ResizeObserver | null = null;

  constructor(private ngZone: NgZone) {
    effect(() => {
      // Recalculate ink bar when active index changes
      this.updateInkBar();
    });

    effect(() => {
        // Recalculate pagination when tabs change
        this.tabs();
        this.checkPagination();
    })
  }

  ngAfterViewInit() {
    this.updateInkBar();
    this.checkPagination();
    
    // Setup resize observer
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.ngZone.run(() => {
          this.checkPagination();
          this.updateInkBar();
        });
      });
      
      const container = this.listContainer()?.nativeElement;
      if (container) {
        this.resizeObserver.observe(container);
      }
    }
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  selectTab(index: number) {
    this.activeIndex.set(index);
  }

  updateInkBar() {
    // We need to find the label element for the active index
    // Since we don't have viewChildren easily accessible in this context without more setup, 
    // we can query the DOM within the list
    const list = this.tabList()?.nativeElement;
    if (!list) return;

    const labels = list.querySelectorAll('.tng-tabs__label');
    const activeLabel = labels[this.activeIndex()] as HTMLElement;

    if (activeLabel) {
      this.inkBarLeft.set(activeLabel.offsetLeft);
      this.inkBarWidth.set(activeLabel.offsetWidth);
      
      // Auto scroll to active tab if needed
      this.scrollToTab(activeLabel);
    }
  }

  checkPagination() {
    const container = this.listContainer()?.nativeElement;
    const list = this.tabList()?.nativeElement;
    
    if (container && list) {
      const containerWidth = container.offsetWidth;
      const listWidth = list.scrollWidth;
      
      this.showPagination.set(listWidth > containerWidth);
      
      // Re-check scroll end
      this.updateScrollState();
    }
  }

  scrollHeader(direction: number) {
    const container = this.listContainer()?.nativeElement;
    if (!container) return;
    
    const scrollAmount = container.offsetWidth * 0.8;
    const currentScroll = this.scrollLeft();
    const maxScroll = this.getMaxScroll();
    
    let newScroll = currentScroll + (direction * scrollAmount);
    newScroll = Math.max(0, Math.min(newScroll, maxScroll));
    
    this.scrollLeft.set(newScroll);
    this.updateScrollState();
  }

  private getMaxScroll(): number {
    const container = this.listContainer()?.nativeElement;
    const list = this.tabList()?.nativeElement;
    if (!container || !list) return 0;
    
    return Math.max(0, list.scrollWidth - container.offsetWidth);
  }

  private updateScrollState() {
    const maxScroll = this.getMaxScroll();
    this.isScrolledToEnd.set(Math.abs(this.scrollLeft() - maxScroll) < 1);
  }

  private scrollToTab(tabLabel: HTMLElement) {
    if (!this.showPagination()) return;

    const container = this.listContainer()?.nativeElement;
    if (!container) return;

    const labelLeft = tabLabel.offsetLeft;
    const labelWidth = tabLabel.offsetWidth;
    const containerWidth = container.offsetWidth;
    const currentScroll = this.scrollLeft();

    // If tab is to the left of view
    if (labelLeft < currentScroll) {
      this.scrollLeft.set(labelLeft);
    }
    // If tab is to the right of view
    else if (labelLeft + labelWidth > currentScroll + containerWidth) {
      this.scrollLeft.set(labelLeft + labelWidth - containerWidth);
    }
    
    this.updateScrollState();
  }
}

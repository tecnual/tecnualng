import { 
  Directive, 
  Input, 
  ElementRef, 
  HostListener, 
  ComponentRef, 
  ApplicationRef, 
  EnvironmentInjector, 
  createComponent, 
  OnDestroy,
  TemplateRef
} from '@angular/core';
import { TngTooltipComponent } from './tng-tooltip.component';

@Directive({
  selector: '[tngTooltip]',
  standalone: true
})
export class TngTooltipDirective implements OnDestroy {
  @Input('tngTooltip') content: string | TemplateRef<any> = '';
  @Input() tngTooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() tngTooltipDelay = 200;

  private componentRef: ComponentRef<TngTooltipComponent> | null = null;
  private timeoutId: any;

  constructor(
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.timeoutId = setTimeout(() => {
      this.show();
    }, this.tngTooltipDelay);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.hide();
  }

  @HostListener('focus')
  onFocus(): void {
    this.show();
  }

  @HostListener('blur')
  onBlur(): void {
    this.hide();
  }

  show(): void {
    if (this.componentRef) return;

    // Create component
    this.componentRef = createComponent(TngTooltipComponent, {
      environmentInjector: this.injector
    });

    // Set input
    this.componentRef.instance.content = this.content;
    
    // Trigger change detection to render content
    this.componentRef.changeDetectorRef.detectChanges();

    // Attach to the view so change detection works
    this.appRef.attachView(this.componentRef.hostView);

    // Get DOM element
    const domElem = (this.componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    // Position it
    this.updatePosition(domElem);
  }

  hide(): void {
    if (!this.componentRef) return;

    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
    this.componentRef = null;
  }

  updatePosition(tooltipElem: HTMLElement): void {
    const hostRect = this.elementRef.nativeElement.getBoundingClientRect();
    const tooltipRect = tooltipElem.getBoundingClientRect();

    let top = 0;
    let left = 0;
    const gap = 8;

    switch (this.tngTooltipPosition) {
      case 'top':
        top = hostRect.top - tooltipRect.height - gap;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = hostRect.bottom + gap;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.left - tooltipRect.width - gap;
        break;
      case 'right':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.right + gap;
        break;
    }

    // Prevent overflow (basic)
    if (top < 0) top = hostRect.bottom + gap; // Flip to bottom if top overflows
    if (left < 0) left = 0;
    
    tooltipElem.style.top = `${top}px`;
    tooltipElem.style.left = `${left}px`;
  }

  ngOnDestroy(): void {
    this.hide();
  }
}

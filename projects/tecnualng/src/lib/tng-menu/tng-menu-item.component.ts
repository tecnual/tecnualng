import { Component, input, signal, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'tng-menu-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="tng-menu-item" 
         [class.tng-menu-item--disabled]="disabled()"
         [class.tng-menu-item--has-children]="hasChildren()"
         [class.tng-menu-item--expanded]="expanded()"
         [style.--level]="level()">
      
      <!-- Item content (clickable) -->
      @if (route() && !hasChildren()) {
        <a [routerLink]="route()"
           routerLinkActive="tng-menu-item__link--active"
           class="tng-menu-item__link"
           [class.tng-menu-item__link--disabled]="disabled()"
           (click)="handleClick($event)">
          @if (icon()) {
            <span class="tng-menu-item__icon">
              <i [class]="icon()"></i>
            </span>
          }
          <span class="tng-menu-item__label">
            <ng-content select="[menu-item-label]"></ng-content>
            {{ label() }}
          </span>
          @if (hasChildren()) {
            <span class="tng-menu-item__chevron">
              <i class="fa fa-chevron-down"></i>
            </span>
          }
        </a>
      } @else {
        <button type="button"
                class="tng-menu-item__link"
                [class.tng-menu-item__link--disabled]="disabled()"
                [disabled]="disabled()"
                (click)="handleClick($event)">
          @if (icon()) {
            <span class="tng-menu-item__icon">
              <i [class]="icon()"></i>
            </span>
          }
          <span class="tng-menu-item__label">
            <ng-content select="[menu-item-label]"></ng-content>
            {{ label() }}
          </span>
          @if (hasChildren()) {
            <span class="tng-menu-item__chevron">
              <i class="fa fa-chevron-down"></i>
            </span>
          }
        </button>
      }

      <!-- Submenu (content projection for nested items) -->
      @if (hasChildren() && expanded()) {
        <div class="tng-menu-item__submenu">
          <ng-content></ng-content>
        </div>
      }
    </div>
  `,
  styleUrls: ['./tng-menu-item.component.scss']
})
export class TngMenuItemComponent implements AfterContentInit {
  icon = input<string>();
  label = input<string>('');
  route = input<string>();
  disabled = input<boolean>(false);
  level = input<number>(0);

  @ContentChildren(TngMenuItemComponent) children!: QueryList<TngMenuItemComponent>;

  expanded = signal(false);
  hasChildren = signal(false);

  ngAfterContentInit() {
    // Check if there are any projected menu items
    this.updateHasChildren();
    
    // Listen for changes in children
    this.children.changes.subscribe(() => {
      this.updateHasChildren();
    });
  }

  private updateHasChildren() {
    this.hasChildren.set(this.children.length > 0);
  }

  handleClick(event: Event) {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }

    if (this.hasChildren()) {
      event.preventDefault();
      this.toggleExpanded();
    }
  }

  toggleExpanded() {
    this.expanded.update(value => !value);
  }
}

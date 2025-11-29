import { Component, Input, signal, ContentChildren, QueryList, AfterContentInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'tng-menu-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="tng-menu-item" 
         [class.tng-menu-item--disabled]="disabled"
         [class.tng-menu-item--has-children]="hasChildren()"
         [class.tng-menu-item--expanded]="expanded()"
         [style.--level]="level">
      
      <!-- Item content (clickable) -->
      <a *ngIf="route && !hasChildren(); else buttonTemplate"
         [routerLink]="route"
         routerLinkActive="tng-menu-item__link--active"
         class="tng-menu-item__link"
         [class.tng-menu-item__link--disabled]="disabled"
         (click)="handleClick($event)">
        <span class="tng-menu-item__icon" *ngIf="icon">
          <span class="material-icons">{{ icon }}</span>
        </span>
        <span class="tng-menu-item__label">
          <ng-content select="[menu-item-label]"></ng-content>
          {{ label }}
        </span>
        <span class="tng-menu-item__chevron" *ngIf="hasChildren()">
          <span class="material-icons">expand_more</span>
        </span>
      </a>

      <ng-template #buttonTemplate>
        <button type="button"
                class="tng-menu-item__link"
                [class.tng-menu-item__link--disabled]="disabled"
                [disabled]="disabled"
                (click)="handleClick($event)">
          <span class="tng-menu-item__icon" *ngIf="icon">
            <span class="material-icons">{{ icon }}</span>
          </span>
          <span class="tng-menu-item__label">
            <ng-content select="[menu-item-label]"></ng-content>
            {{ label }}
          </span>
          <span class="tng-menu-item__chevron" *ngIf="hasChildren()">
            <span class="material-icons">expand_more</span>
          </span>
        </button>
      </ng-template>

      <!-- Submenu (content projection for nested items) -->
      <div class="tng-menu-item__submenu" *ngIf="hasChildren() && expanded()">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./tng-menu-item.component.scss']
})
export class TngMenuItemComponent implements AfterContentInit {
  @Input() icon?: string;
  @Input() label = '';
  @Input() route?: string;
  @Input() disabled = false;
  @Input() level = 0;

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
    if (this.disabled) {
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

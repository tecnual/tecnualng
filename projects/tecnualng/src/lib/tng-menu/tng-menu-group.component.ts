import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tng-menu-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tng-menu-group">
      <div class="tng-menu-group__header" *ngIf="label">{{ label }}</div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .tng-menu-group {
      display: block;
    }
  `]
})
export class TngMenuGroupComponent {
  @Input() label = '';
}

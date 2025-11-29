import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tng-menu-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tng-menu-group">
      @if (label()) {
        <div class="tng-menu-group__header">{{ label() }}</div>
      }
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
  label = input<string>('');
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tng-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="tng-menu" 
         [class.tng-menu--horizontal]="mode === 'horizontal'"
         [class.tng-menu--vertical]="mode === 'vertical'"
         [class.tng-menu--compact]="density === 'compact'"
         [class.tng-menu--comfortable]="density === 'comfortable'">
      <ng-content></ng-content>
    </nav>
  `,
  styleUrls: ['./tng-menu.component.scss']
})
export class TngMenuComponent {
  @Input() mode: 'vertical' | 'horizontal' = 'vertical';
  @Input() density: 'compact' | 'comfortable' = 'comfortable';
}

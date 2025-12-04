import { Component, ChangeDetectionStrategy, ViewEncapsulation, signal, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tng-expansion-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tng-expansion-panel.component.html',
  styleUrl: './tng-expansion-panel.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tng-expansion-panel',
    '[class.tng-expansion-panel--expanded]': 'isExpanded()',
    '[class.tng-expansion-panel--disabled]': 'disabled()'
  }
})
export class TngExpansionPanelComponent {
  // Signal inputs
  title = input<string>('Panel Title');
  disabled = input<boolean>(false);
  expanded = input<boolean>(false);
  
  // Signal output
  toggled = output<boolean>();

  // Internal state
  protected isExpanded = signal(false);

  constructor() {
    // Sync the expanded input with internal state
    effect(() => {
      this.isExpanded.set(this.expanded());
    });
  }

  toggle(): void {
    if (this.disabled()) return;
    
    const newState = !this.isExpanded();
    this.isExpanded.set(newState);
    this.toggled.emit(newState);
  }
}

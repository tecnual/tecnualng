import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

export type TngButtonAppearance = 'text' | 'filled' | 'elevated' | 'outlined' | 'tonal';

@Component({
  selector: 'button[tngButton], a[tngButton]',
  imports: [],
  host: {
    'class': 'tng-button',
  },
  templateUrl: './tng-button.html',
  styleUrl: './tng-button.scss',
  exportAs: 'tngButton',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TngButton {
  
}

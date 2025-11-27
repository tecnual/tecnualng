import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

export type TngCardVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';

@Component({
  selector: 'tng-card',
  standalone: true,
  imports: [],
  templateUrl: './tng-card.component.html',
  styleUrl: './tng-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tng-card',
    '[class.tng-card--primary]': 'variant() === "primary"',
    '[class.tng-card--secondary]': 'variant() === "secondary"',
    '[class.tng-card--success]': 'variant() === "success"',
    '[class.tng-card--warning]': 'variant() === "warning"',
    '[class.tng-card--error]': 'variant() === "error"',
    '[class.tng-card--elevated]': 'elevated()',
    '[class.tng-card--outlined]': 'outlined()',
  }
})
export class TngCardComponent {
  variant = input<TngCardVariant>('default');
  title = input<string | null>(null);
  subtitle = input<string | null>(null);
  elevated = input(false);
  outlined = input(false);
  image = input<string | null>(null);
  imageAlt = input<string>('Card image');
}

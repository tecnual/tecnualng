import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

export type TngButtonAppearance = 'text' | 'filled' | 'elevated' | 'outlined' | 'tonal';

@Component({
  selector: 'button[tngButton], a[tngButton]',
  imports: [],
  host: {
    'class': 'tng-button',
    '[class.tng-button--primary]': 'variant() === "primary"',
    '[class.tng-button--secondary]': 'variant() === "secondary"',
    '[class.tng-button--success]': 'variant() === "success"',
    '[class.tng-button--warning]': 'variant() === "warning"',
    '[class.tng-button--error]': 'variant() === "error"',
    '[class.tng-button--basic]': 'variant() === "basic"',
    '[class.tng-button--outlined]': 'variant() === "outlined"',
    '[class.tng-button--rounded]': 'rounded()',
    '[class.tng-button--soft]': 'soft()',
    '(click)': 'createRipple($event)',
  },
  templateUrl: './tng-button.html',
  styleUrl: './tng-button.scss',
  exportAs: 'tngButton',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TngButton {
  variant = input<'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'basic' | 'outlined' | null>(null);
  rounded = input(false);
  soft = input(false);
  ripple = input(true);
  icon = input<string | null>(null);
  iconPosition = input<'left' | 'right'>('left');

  createRipple(event: any) {
    if (!this.ripple()) return;

    const button = event.currentTarget as HTMLElement;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('tng-ripple');

    const ripple = button.getElementsByClassName('tng-ripple')[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }
}

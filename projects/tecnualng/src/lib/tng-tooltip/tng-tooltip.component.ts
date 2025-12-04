import { Component, input, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tng-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tng-tooltip-container">
      @if (isTemplate(content())) {
        <ng-container *ngTemplateOutlet="$any(content())"></ng-container>
      } @else {
        {{ content() }}
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      pointer-events: none;
      z-index: 10000;
      position: fixed;
      animation: tooltipFadeIn 150ms cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
    }

    .tng-tooltip-container {
      background: rgba(20, 20, 30, 0.9);
      backdrop-filter: blur(8px);
      color: #fff;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 14px;
      font-family: 'Inter', sans-serif;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
      max-width: 250px;
      word-wrap: break-word;
      line-height: 1.4;
    }

    @keyframes tooltipFadeIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TngTooltipComponent {
  content = input<string | TemplateRef<any>>('');

  isTemplate(value: any): value is TemplateRef<any> {
    return value instanceof TemplateRef;
  }
}

import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

export type TngToolbarPosition = 'top' | 'bottom' | 'static';
export type TngToolbarColor = 'default' | 'primary' | 'secondary';

@Component({
  selector: 'tng-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './tng-toolbar.component.html',
  styleUrl: './tng-toolbar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tng-toolbar',
    '[class.tng-toolbar--top]': 'position() === "top"',
    '[class.tng-toolbar--bottom]': 'position() === "bottom"',
    '[class.tng-toolbar--primary]': 'color() === "primary"',
    '[class.tng-toolbar--secondary]': 'color() === "secondary"',
    '[class.tng-toolbar--elevated]': 'elevation()',
  }
})
export class TngToolbarComponent {
  position = input<TngToolbarPosition>('static');
  color = input<TngToolbarColor>('default');
  elevation = input(true);
}

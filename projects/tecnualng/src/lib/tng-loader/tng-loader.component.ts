import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

export type TngLoaderType = 'spinner' | 'bar' | 'dots' | 'pulse';
export type TngLoaderSize = 'sm' | 'md' | 'lg' | 'xl';
export type TngLoaderColor = 'primary' | 'secondary' | 'accent' | 'warn';

@Component({
  selector: 'tng-loader',
  imports: [],
  templateUrl: './tng-loader.component.html',
  styleUrl: './tng-loader.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tng-loader',
    '[class]': 'hostClasses()',
    '[attr.role]': '"status"',
    '[attr.aria-label]': 'label() || "Loading"',
    '[attr.aria-hidden]': 'hidden() ? "true" : "false"',
  }
})
export class TngLoaderComponent {
  type = input<TngLoaderType>('spinner');
  size = input<TngLoaderSize>('md');
  duration = input<string | null>(null);
  label = input<string>('');
  progress = input<number | null>(null);
  fullscreen = input<boolean>(false);
  inline = input<boolean>(false);
  hidden = input<boolean>(false);
  color = input<TngLoaderColor | null>(null);

  hostClasses = computed(() => {
    const classes = [];
    
    if (this.fullscreen()) {
      classes.push('tng-loader--fullscreen');
    }
    
    if (this.inline()) {
      classes.push('tng-loader--inline');
    }
    
    if (this.hidden()) {
      classes.push('tng-loader--hidden');
    }

    if (this.color()) {
      classes.push(`tng-loader--${this.color()}`);
    }

    classes.push(`tng-loader--type-${this.type()}`);
    classes.push(`tng-loader--size-${this.size()}`);

    return classes.join(' ');
  });

  // Helper for dynamic styles like duration
  containerStyles = computed(() => {
    const styles: Record<string, string> = {};
    if (this.duration()) {
      styles['--tng-loader-duration'] = this.duration()!;
    }
    return styles;
  });
}

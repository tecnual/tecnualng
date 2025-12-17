
import {
  Component,
  ElementRef,
  HostListener,
  computed,
  effect,
  forwardRef,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tng-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tng-slider.component.html',
  styleUrls: ['./tng-slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TngSliderComponent),
      multi: true,
    },
  ],
})
export class TngSliderComponent implements ControlValueAccessor {
  // Inputs
  min = input<number>(0);
  max = input<number>(100);
  step = input<number>(1);
  label = input<string>('');
  disabled = input<boolean>(false);
  orientation = input<'horizontal' | 'vertical'>('horizontal');

  // Internal state
  value = model<number>(0);
  isDragging = signal<boolean>(false);
  
  // Elements
  track = viewChild.required<ElementRef<HTMLElement>>('track');

  // Computed
  percentage = computed(() => {
    const min = this.min();
    const max = this.max();
    const val = this.value();
    if (max === min) return 0;
    const percent = ((val - min) / (max - min)) * 100;
    return Math.min(Math.max(percent, 0), 100);
  });

  // CVA callbacks
  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    // Ensure value respects min/max/step when inputs change
    effect(() => {
      const val = this.value();
      const clamped = this.clampAndStep(val);
      if (val !== clamped) {
        this.value.set(clamped);
      }
    });
  }

  // CVA Implementation
  writeValue(value: number): void {
    if (value !== null && value !== undefined) {
      this.value.set(this.clampAndStep(value));
    }
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // We handle disabled state via input, but CVA can also set it
    // Usually we'd sync this with a signal if we wanted to support both
  }

  // Interaction Logic
  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onStart(event: MouseEvent | TouchEvent) {
    if (this.disabled()) return;
    
    this.isDragging.set(true);
    this.onTouched();
    this.updateValueFromEvent(event);
    
    // Prevent text selection while dragging
    event.preventDefault();
  }

  @HostListener('window:mousemove', ['$event'])
  @HostListener('window:touchmove', ['$event'])
  onMove(event: MouseEvent | TouchEvent) {
    if (!this.isDragging() || this.disabled()) return;
    this.updateValueFromEvent(event);
  }

  @HostListener('window:mouseup')
  @HostListener('window:touchend')
  onEnd() {
    this.isDragging.set(false);
  }

  private updateValueFromEvent(event: MouseEvent | TouchEvent) {
    const rect = this.track().nativeElement.getBoundingClientRect();
    let percent = 0;

    if (this.orientation() === 'horizontal') {
        const clientX = this.getClientX(event);
        percent = (clientX - rect.left) / rect.width;
    } else {
        const clientY = this.getClientY(event);
        // In vertical mode, 0 is at bottom, so we invert logic or CSS
        // Typically slider goes bottom->top.
        // clientY is 0 at top.
        // So percent = (rect.bottom - clientY) / rect.height
        percent = (rect.bottom - clientY) / rect.height;
    }

    percent = Math.min(Math.max(percent, 0), 1);
    
    const range = this.max() - this.min();
    const rawValue = this.min() + percent * range;
    
    const newValue = this.clampAndStep(rawValue);
    
    if (this.value() !== newValue) {
      this.value.set(newValue);
      this.onChange(newValue);
    }
  }

  private getClientX(event: MouseEvent | TouchEvent): number {
    if (event instanceof MouseEvent) {
      return event.clientX;
    }
    return event.touches[0].clientX;
  }

  private getClientY(event: MouseEvent | TouchEvent): number {
      if (event instanceof MouseEvent) {
        return event.clientY;
      }
      return event.touches[0].clientY;
  }

  private clampAndStep(value: number): number {
    const min = this.min();
    const max = this.max();
    const step = this.step();
    
    let clamped = Math.min(Math.max(value, min), max);
    
    if (step > 0) {
      const steps = Math.round((clamped - min) / step);
      clamped = min + steps * step;
      // Re-clamp to handle floating point issues or partial steps at max
      clamped = Math.min(Math.max(clamped, min), max);
    }
    
    return clamped;
  }
}

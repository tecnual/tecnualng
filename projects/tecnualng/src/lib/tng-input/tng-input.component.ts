import { ChangeDetectionStrategy, Component, computed, inject, input, model, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tng-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './tng-input.component.html',
  styleUrls: ['./tng-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TecnualInputComponent implements ControlValueAccessor {
  private ngControl = inject(NgControl, { optional: true, self: true });

  label = input('');
  type = input<'text' | 'number' | 'password' | 'email' | 'tel'>('text');
  placeholder = input('');
  required = input<boolean>(false);
  disabled = model<boolean>(false);
  id = input<string>(`tng-input-${Math.random().toString(36).substr(2, 9)}`);

  value = signal<any>('');
  isFocused = signal<boolean>(false);

  hasValue = computed(() => {
    const v = this.value();
    return v !== null && v !== undefined && v !== '';
  });

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value.set(input.value);
    this.onChange(input.value);
  }

  onFocus(): void {
    this.isFocused.set(true);
  }

  onBlur(): void {
    this.isFocused.set(false);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}

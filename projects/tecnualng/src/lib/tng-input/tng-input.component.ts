import { ChangeDetectionStrategy, Component, Input, forwardRef, input, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tng-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './tng-input.component.html',
  styleUrls: ['./tng-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TecnualInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TecnualInputComponent implements ControlValueAccessor {
  label = input('');
  type = input<'text' | 'number' | 'password' | 'email' | 'tel'>('text');
  placeholder = input('');
  required = input<boolean>(false);
  disabled = model<boolean>(false);
  id = input<string>(`tng-input-${Math.random().toString(36).substr(2, 9)}`);

  value: any = '';
  isFocused: boolean = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  get hasValue(): boolean {
    return this.value !== null && this.value !== undefined && this.value !== '';
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.update(() => isDisabled);
  }
}

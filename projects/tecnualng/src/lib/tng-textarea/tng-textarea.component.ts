import { Component, Input, forwardRef, input, model, signal, computed, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TngFormFieldComponent } from '../tng-form-field/tng-form-field.component';
import { TngTextareaDirective } from './tng-textarea.directive';

@Component({
  selector: 'tng-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule, TngFormFieldComponent, TngTextareaDirective],
  templateUrl: './tng-textarea.component.html',
  styleUrls: ['./tng-textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TngTextareaComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class TngTextareaComponent implements ControlValueAccessor {
  label = input('');
  placeholder = input('');
  required = input<boolean>(false);
  disabled = model<boolean>(false);
  maxLength = input<number | undefined>(undefined);
  id = input<string>(`tng-textarea-${Math.random().toString(36).substr(2, 9)}`);

  value = signal<string>('');
  
  onChange: any = () => {};
  onTouched: any = () => {};

  onInput(event: Event): void {
    const input = event.target as HTMLTextAreaElement;
    this.value.set(input.value);
    this.onChange(this.value());
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value.set(value || '');
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

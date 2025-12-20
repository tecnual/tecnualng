import { Component, input, model, ChangeDetectionStrategy, computed, forwardRef, effect, signal, viewChild, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NgControl } from '@angular/forms';
import { TngSelectDirective, SelectOption } from './tng-select.directive';

@Component({
  selector: 'tng-select',
  standalone: true,
  imports: [CommonModule, FormsModule, TngSelectDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './tng-select.component.html',
  styleUrl: './tng-select.component.scss'
})
export class TngSelectComponent implements ControlValueAccessor {
  private ngControl = inject(NgControl, { optional: true, self: true });

  // Inputs
  label = input<string>('');
  options = input.required<SelectOption[]>();
  enableMulti = input<boolean>(false);
  enableSearch = input<boolean>(false);
  placeholder = input<string>('Select an option');
  disabled = input<boolean>(false);
  hint = input<string>('');
  ariaLabel = input<string>('');

  // Model for two-way binding
  value = model<any[]>([]);

  // Internal state
  private cvaDisabled = signal(false);
  
  // ViewChild
  selectDirective = viewChild(TngSelectDirective);

  // Computed
  selectId = computed(() => `tng-select-${Math.random().toString(36).substr(2, 9)}`);
  
  effectiveDisabled = computed(() => this.disabled() || this.cvaDisabled());

  displayText = computed(() => {
    const values = this.value();
    const opts = this.options();
    
    if (!values || values.length === 0) {
      return this.placeholder();
    }
    
    const selectedOpts = opts.filter(opt => values.includes(opt.value));
    return selectedOpts.map(opt => opt.label).join(', ');
  });

  // CVA callbacks
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  onSelectionChange(newValues: any[]) {
    this.value.set(newValues);
    
    // Avoid circular updates if possible, but for now just emit
    if (this.enableMulti()) {
      this.onChange(newValues);
    } else {
      this.onChange(newValues.length > 0 ? newValues[0] : null);
    }
    this.onTouched();
  }

  onDisplayClick(event: Event) {
    if (this.effectiveDisabled()) return;
    
    event.preventDefault();
    event.stopPropagation();
    this.selectDirective()?.togglePanel();
  }

  // ControlValueAccessor implementation
  writeValue(obj: any): void {
    if (obj !== null && obj !== undefined) {
      if (Array.isArray(obj)) {
        this.value.set(obj);
      } else {
        this.value.set([obj]);
      }
    } else {
      this.value.set([]);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }
}

import { Directive, ElementRef, HostListener, signal, inject, computed, input, effect } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[tngInput], textarea[tngInput]',
  standalone: true,
  host: {
    'class': 'tng-input-field',
    '[disabled]': 'disabled()',
    '[attr.placeholder]': 'computedPlaceholder()'
  }
})
export class TngInputDirective {
  private el = inject(ElementRef<HTMLInputElement | HTMLTextAreaElement>);
  public ngControl = inject(NgControl, { optional: true, self: true });

  // Inputs
  disabled = input<boolean>(false);
  placeholder = input<string>('');
  
  // State signals
  focused = signal(false);
  private _value = signal('');
  
  // Computed
  hasValue = computed(() => {
    const val = this._value();
    return val !== null && val !== undefined && val !== '';
  });

  computedPlaceholder = computed(() => {
    return this.focused() ? this.placeholder() : '';
  });

  constructor() {
    // Initialize value on creation
    effect(() => {
      this.updateValue();
    }, { allowSignalWrites: true });
  }

  @HostListener('focus')
  onFocus() {
    this.focused.set(true);
  }

  @HostListener('blur')
  onBlur() {
    this.focused.set(false);
    this.updateValue();
  }

  @HostListener('input')
  onInput() {
    this.updateValue();
  }

  ngAfterViewInit() {
    this.updateValue();
  }
  
  private updateValue() {
    this._value.set(this.el.nativeElement.value);
  }
}

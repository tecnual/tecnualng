import { Directive, ElementRef, HostListener, signal, inject, computed, input, effect } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'textarea[tngTextarea]',
  standalone: true,
  host: {
    '[class.tng-textarea-field]': 'true',
    '[disabled]': 'disabled()',
    '[attr.maxlength]': 'maxLength() || null',
    '[attr.placeholder]': 'computedPlaceholder()'
  },
  exportAs: 'tngTextarea'
})
export class TngTextareaDirective {
  private el = inject(ElementRef<HTMLTextAreaElement>);
  public ngControl = inject(NgControl, { optional: true, self: true });

  // Inputs
  disabled = input<boolean>(false);
  placeholder = input<string>('');
  maxLength = input<number | undefined>(undefined);
  
  // State signals
  focused = signal(false);
  private _value = signal('');
  
  // Computed
  hasValue = computed(() => {
    const val = this._value();
    return val !== null && val !== undefined && val !== '';
  });

  valueLength = computed(() => this._value().length);

  computedPlaceholder = computed(() => {
    return this.focused() ? this.placeholder() : '';
  });

  constructor() {
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

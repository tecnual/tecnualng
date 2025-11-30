import { Directive, ElementRef, HostListener, signal, inject, computed, input, effect, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[tngInput], textarea[tngInput]',
  standalone: true,
  host: {
    '[class.tng-input-field]': 'isTextField()',
    '[class.tng-checkbox]': 'isCheckbox()',
    '[class.tng-radio]': 'isRadio()',
    '[disabled]': 'disabled()',
    '[attr.placeholder]': 'computedPlaceholder()'
  }
})
export class TngInputDirective {
  private el = inject(ElementRef<HTMLInputElement | HTMLTextAreaElement>);
  private renderer = inject(Renderer2);
  public ngControl = inject(NgControl, { optional: true, self: true });

  // Inputs
  disabled = input<boolean>(false);
  placeholder = input<string>('');
  
  // State signals
  focused = signal(false);
  checked = signal(false);
  private _value = signal('');
  private _inputType = signal<string>('text');
  
  // Computed
  hasValue = computed(() => {
    const val = this._value();
    return val !== null && val !== undefined && val !== '';
  });

  computedPlaceholder = computed(() => {
    return this.focused() ? this.placeholder() : '';
  });

  isCheckbox = computed(() => this._inputType() === 'checkbox');
  isRadio = computed(() => this._inputType() === 'radio');
  isTextField = computed(() => !this.isCheckbox() && !this.isRadio());

  constructor() {
    // Initialize value on creation
    effect(() => {
      this.updateValue();
    }, { allowSignalWrites: true });

    // Detect input type after view init
    effect(() => {
      this.detectInputType();
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

  @HostListener('change')
  onChange() {
    if (this.isCheckbox() || this.isRadio()) {
      const element = this.el.nativeElement as HTMLInputElement;
      this.checked.set(element.checked);
    }
  }

  ngAfterViewInit() {
    this.detectInputType();
    this.updateValue();
    
    // For checkbox/radio, also update checked state
    if (this.isCheckbox() || this.isRadio()) {
      const element = this.el.nativeElement as HTMLInputElement;
      this.checked.set(element.checked);
    }
  }
  
  private detectInputType() {
    const element = this.el.nativeElement;
    if ('type' in element) {
      this._inputType.set((element as HTMLInputElement).type || 'text');
    }
  }

  private updateValue() {
    this._value.set(this.el.nativeElement.value);
  }
}

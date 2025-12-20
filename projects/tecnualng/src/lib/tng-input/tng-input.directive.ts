import { Directive, ElementRef, HostListener, signal, inject, computed, input, effect, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
export class TngInputDirective implements OnInit {
  private el = inject(ElementRef<HTMLInputElement | HTMLTextAreaElement>);
  public ngControl = inject(NgControl, { optional: true, self: true });
  private destroyRef = inject(DestroyRef);

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
    });

    // Detect input type after view init
    effect(() => {
      this.detectInputType();
    });
  }

  ngOnInit() {
    if (this.ngControl) {
      this.ngControl.valueChanges?.pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe((val) => {
        this._value.set(val);
      });
    }
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
    const val = this.el.nativeElement.value;
    this._value.set(val);
  }
}

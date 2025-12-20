import { Directive, ElementRef, HostListener, signal, inject, computed, input, effect, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
export class TngTextareaDirective implements OnInit {
  private el = inject(ElementRef<HTMLTextAreaElement>);
  public ngControl = inject(NgControl, { optional: true, self: true });
  private destroyRef = inject(DestroyRef);

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

  ngAfterViewInit() {
    this.updateValue();
  }
  
  private updateValue() {
    this._value.set(this.el.nativeElement.value);
  }
}

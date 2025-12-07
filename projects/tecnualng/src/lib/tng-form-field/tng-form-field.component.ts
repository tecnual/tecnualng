import { Component, contentChild, input, computed, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TngInputDirective } from '../tng-input/tng-input.directive';
import { TngTextareaDirective } from '../tng-textarea/tng-textarea.directive';

@Component({
  selector: 'tng-form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tng-form-field.component.html',
  styleUrls: ['./tng-form-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TngFormFieldComponent {
  label = input<string>('');
  
  // Query for the input or textarea directive inside this component
  inputDirective = contentChild(TngInputDirective);
  textareaDirective = contentChild(TngTextareaDirective);

  // Computed states based on the input/textarea directive
  activeDirective = computed(() => this.inputDirective() || this.textareaDirective());
  
  isFocused = computed(() => this.activeDirective()?.focused() ?? false);
  hasValue = computed(() => this.activeDirective()?.hasValue() ?? false);
  isDisabled = computed(() => this.activeDirective()?.disabled() ?? false);

  // Character count logic
  maxLength = computed(() => this.textareaDirective()?.maxLength());
  currentLength = computed(() => this.textareaDirective()?.valueLength() ?? 0);
  showCounter = computed(() => this.maxLength() !== undefined);

  // Style helper
  hasTextarea = computed(() => !!this.textareaDirective());
}

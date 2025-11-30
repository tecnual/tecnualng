import { Component, contentChild, input, computed, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TngInputDirective } from '../tng-input/tng-input.directive';

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
  
  // Query for the input directive inside this component
  inputDirective = contentChild(TngInputDirective);

  // Computed states based on the input directive
  isFocused = computed(() => this.inputDirective()?.focused() ?? false);
  hasValue = computed(() => this.inputDirective()?.hasValue() ?? false);
  isDisabled = computed(() => this.inputDirective()?.disabled() ?? false);
}

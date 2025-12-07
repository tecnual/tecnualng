import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  TecnualInputComponent, 
  TngInputDirective, 
  TngFormFieldComponent, 
  TngTextareaComponent, 
  TngTextareaDirective 
} from 'tecnualng';
import { CodeExampleComponent, CodeTab } from '../../components/code-example/code-example.component';

@Component({
  selector: 'app-input-demo',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    TecnualInputComponent, 
    TngInputDirective, 
    TngFormFieldComponent, 
    TngTextareaComponent, 
    TngTextareaDirective,
    CodeExampleComponent
  ],
  templateUrl: './input-demo.component.html',
  styleUrls: ['./input-demo.component.scss']
})
export class InputDemoComponent {
  protected textValue = signal('');
  protected emailValue = signal('');
  protected numberValue = signal(0);
  protected passwordValue = signal('');
  
  protected textareaValue = signal('');
  protected textareaDirectiveValue = '';
  
  protected directiveValue1 = '';
  protected directiveValue2 = '';
  
  // Checkbox values
  protected checkbox1 = false;
  protected checkbox2 = false;
  protected checkbox3 = true;
  
  // Radio values
  protected selectedTheme = 'auto';
  protected selectedPlan = '';
  
  protected basicInputCode: CodeTab[] = [
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TecnualInputComponent } from 'tecnualng';

@Component({
  selector: 'app-example',
  imports: [FormsModule, TecnualInputComponent],
  template: '...'
})
export class ExampleComponent {
  textValue = signal('');
}`
    },
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-input
  label="Username"
  placeholder="Enter your username"
  [ngModel]="textValue()"
  (ngModelChange)="textValue.set($event)"
></tng-input>`
    }
  ];
  
  protected numberInputCode: CodeTab[] = [
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TecnualInputComponent } from 'tecnualng';

@Component({
  selector: 'app-example',
  imports: [FormsModule, TecnualInputComponent],
  template: '...'
})
export class ExampleComponent {
  numberValue = signal(0);
}`
    },
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-input
  label="Age"
  type="number"
  placeholder="Enter your age"
  [ngModel]="numberValue()"
  (ngModelChange)="numberValue.set($event)"
></tng-input>`
    }
  ];
  
  protected passwordInputCode: CodeTab[] = [
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TecnualInputComponent } from 'tecnualng';

@Component({
  selector: 'app-example',
  imports: [FormsModule, TecnualInputComponent],
  template: '...'
})
export class ExampleComponent {
  passwordValue = signal('');
}`
    },
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-input
  label="Password"
  type="password"
  placeholder="Enter password"
  [ngModel]="passwordValue()"
  (ngModelChange)="passwordValue.set($event)"
></tng-input>`
    }
  ];
  
  protected textareaInputCode: CodeTab[] = [
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TngTextareaComponent, TngTextareaDirective, TngFormFieldComponent } from 'tecnualng';

@Component({
  selector: 'app-example',
  imports: [FormsModule, TngTextareaComponent, TngTextareaDirective, TngFormFieldComponent],
  template: '...'
})
export class ExampleComponent {
  bio = signal('');
  description = '';
}`
    },
    {
      label: 'HTML',
      language: 'html',
      code: `<!-- Component version -->
<tng-textarea
  label="Bio"
  placeholder="Tell us about yourself"
  [maxLength]="100"
  [ngModel]="bio()"
  (ngModelChange)="bio.set($event)"
></tng-textarea>

<!-- Directive version -->
<tng-form-field label="Description">
  <textarea
    tngTextarea
    [maxLength]="200"
    placeholder="Enter a detailed description"
    [(ngModel)]="description"
  ></textarea>
</tng-form-field>`
    }
  ];

  protected directiveInputCode: CodeTab[] = [
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TngInputDirective, TngFormFieldComponent } from 'tecnualng';

@Component({
  selector: 'app-example',
  imports: [FormsModule, TngInputDirective, TngFormFieldComponent],
  template: '...'
})
export class ExampleComponent {
  fullName = '';
  phoneNumber = '';
}`
    },
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-form-field label="Full Name">
  <input tngInput 
         placeholder="Enter your full name"
         [(ngModel)]="fullName">
</tng-form-field>

<tng-form-field label="Phone Number">
  <input tngInput 
         type="tel"
         placeholder="+1 (555) 000-0000"
         [(ngModel)]="phoneNumber">
</tng-form-field>`
    }
  ];
  
  protected checkboxCode: CodeTab[] = [
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TngInputDirective } from 'tecnualng';

@Component({
  selector: 'app-example',
  imports: [FormsModule, TngInputDirective],
  template: '...'
})
export class ExampleComponent {
  acceptTerms = false;
  subscribeNewsletter = false;
  enableNotifications = true;
}`
    },
    {
      label: 'HTML',
      language: 'html',
      code: `<label class="checkbox-label">
  <input type="checkbox" tngInput [(ngModel)]="acceptTerms">
  <span>Accept terms and conditions</span>
</label>

<label class="checkbox-label">
  <input type="checkbox" tngInput [(ngModel)]="subscribeNewsletter">
  <span>Subscribe to newsletter</span>
</label>

<label class="checkbox-label">
  <input type="checkbox" tngInput [(ngModel)]="enableNotifications" checked>
  <span>Enable notifications (checked by default)</span>
</label>

<label class="checkbox-label disabled">
  <input type="checkbox" tngInput disabled>
  <span>Disabled option</span>
</label>`
    },
    {
      label: 'CSS',
      language: 'css',
      code: `.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
}

.checkbox-label:hover:not(.disabled) {
  background: var(--tng-background, #fafafa);
}

.checkbox-label.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}`
    }
  ];
  
  protected radioCode: CodeTab[] = [
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TngInputDirective } from 'tecnualng';

@Component({
  selector: 'app-example',
  imports: [FormsModule, TngInputDirective],
  template: '...'
})
export class ExampleComponent {
  selectedTheme = 'auto';
  selectedPlan = '';
}`
    },
    {
      label: 'HTML',
      language: 'html',
      code: `<div class="radio-group">
  <h3>Select your preferred theme:</h3>
  
  <label class="radio-label">
    <input type="radio" name="theme" value="light" 
           tngInput [(ngModel)]="selectedTheme">
    <span>Light Theme</span>
  </label>
  
  <label class="radio-label">
    <input type="radio" name="theme" value="dark" 
           tngInput [(ngModel)]="selectedTheme">
    <span>Dark Theme</span>
  </label>
  
  <label class="radio-label">
    <input type="radio" name="theme" value="auto" 
           tngInput [(ngModel)]="selectedTheme" checked>
    <span>Auto (System Default)</span>
  </label>
</div>`
    },
    {
      label: 'CSS',
      language: 'css',
      code: `.radio-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
}

.radio-label:hover:not(.disabled) {
  background: var(--tng-background, #fafafa);
}`
    }
  ];
}

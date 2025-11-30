import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TecnualInputComponent, TngInputDirective, TngFormFieldComponent } from 'tecnualng';
import { CodeExampleComponent, CodeTab } from '../../components/code-example/code-example.component';

@Component({
  selector: 'app-input-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, TecnualInputComponent, TngInputDirective, TngFormFieldComponent, CodeExampleComponent],
  template: `
    <div class="page-container">
      <h1>Input Component</h1>
      <p class="subtitle">Material Design inspired text input with floating labels</p>
      
      <div class="demo-section">
        <h2>Basic Inputs</h2>
        <div class="demo-grid">
          <tng-input
            label="Username"
            placeholder="Enter your username"
            [ngModel]="textValue()"
            (ngModelChange)="textValue.set($event)"
          ></tng-input>
          
          <tng-input
            label="Email"
            type="email"
            placeholder="your@email.com"
            [ngModel]="emailValue()"
            (ngModelChange)="emailValue.set($event)"
          ></tng-input>
        </div>
        
        <app-code-example [tabs]="basicInputCode"></app-code-example>
      </div>
      
      <div class="demo-section">
        <h2>Number Input</h2>
        <div class="demo-grid">
          <tng-input
            label="Age"
            type="number"
            placeholder="Enter your age"
            [ngModel]="numberValue()"
            (ngModelChange)="numberValue.set($event)"
          ></tng-input>
        </div>
        
        <app-code-example [tabs]="numberInputCode"></app-code-example>
      </div>
      
      <div class="demo-section">
        <h2>Password Input</h2>
        <div class="demo-grid">
          <tng-input
            label="Password"
            type="password"
            placeholder="Enter password"
            [ngModel]="passwordValue()"
            (ngModelChange)="passwordValue.set($event)"
          ></tng-input>
        </div>
        
        <app-code-example [tabs]="passwordInputCode"></app-code-example>
      </div>
      
      <div class="demo-section">
        <h2>Directive Usage (New!)</h2>
        <p class="section-description">Use the <code>tngInput</code> directive on native HTML input elements with <code>tng-form-field</code> wrapper</p>
        <div class="demo-grid">
          <tng-form-field label="Full Name">
            <input tngInput 
                   placeholder="Enter your full name"
                   [(ngModel)]="directiveValue1">
          </tng-form-field>
          
          <tng-form-field label="Phone Number">
            <input tngInput 
                   type="tel"
                   placeholder="+1 (555) 000-0000"
                   [(ngModel)]="directiveValue2">
          </tng-form-field>
        </div>
        
        <app-code-example [tabs]="directiveInputCode"></app-code-example>
      </div>
      
      <div class="demo-section">
        <h2>Checkbox Inputs</h2>
        <p class="section-description">Modern checkbox styling with smooth animations and theme integration</p>
        <div class="checkbox-demo">
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" tngInput [(ngModel)]="checkbox1">
              <span>Accept terms and conditions</span>
            </label>
            
            <label class="checkbox-label">
              <input type="checkbox" tngInput [(ngModel)]="checkbox2">
              <span>Subscribe to newsletter</span>
            </label>
            
            <label class="checkbox-label">
              <input type="checkbox" tngInput [(ngModel)]="checkbox3" [checked]="true">
              <span>Enable notifications (checked by default)</span>
            </label>
            
            <label class="checkbox-label disabled">
              <input type="checkbox" tngInput [disabled]="true">
              <span>Disabled option</span>
            </label>
            
            <label class="checkbox-label disabled">
              <input type="checkbox" tngInput [disabled]="true" [checked]="true">
              <span>Disabled and checked</span>
            </label>
          </div>
        </div>
        
        <app-code-example [tabs]="checkboxCode"></app-code-example>
      </div>
      
      <div class="demo-section">
        <h2>Radio Inputs</h2>
        <p class="section-description">Elegant radio button styling with ripple effects</p>
        <div class="radio-demo">
          <div class="radio-group">
            <h3>Select your preferred theme:</h3>
            <label class="radio-label">
              <input type="radio" name="theme" value="light" tngInput [(ngModel)]="selectedTheme">
              <span>Light Theme</span>
            </label>
            
            <label class="radio-label">
              <input type="radio" name="theme" value="dark" tngInput [(ngModel)]="selectedTheme">
              <span>Dark Theme</span>
            </label>
            
            <label class="radio-label">
              <input type="radio" name="theme" value="auto" tngInput [(ngModel)]="selectedTheme" [checked]="true">
              <span>Auto (System Default)</span>
            </label>
          </div>
          
          <div class="radio-group">
            <h3>Choose your plan:</h3>
            <label class="radio-label">
              <input type="radio" name="plan" value="free" tngInput [(ngModel)]="selectedPlan">
              <span>Free Plan</span>
            </label>
            
            <label class="radio-label">
              <input type="radio" name="plan" value="pro" tngInput [(ngModel)]="selectedPlan">
              <span>Pro Plan ($9.99/month)</span>
            </label>
            
            <label class="radio-label">
              <input type="radio" name="plan" value="enterprise" tngInput [(ngModel)]="selectedPlan">
              <span>Enterprise Plan (Contact us)</span>
            </label>
            
            <label class="radio-label disabled">
              <input type="radio" name="plan" value="disabled" tngInput [disabled]="true">
              <span>Disabled option</span>
            </label>
          </div>
        </div>
        
        <app-code-example [tabs]="radioCode"></app-code-example>
      </div>
      
      <div class="demo-section">
        <h2>Values</h2>
        <div class="values-display">
          <p><strong>Text:</strong> {{ textValue() || '(empty)' }}</p>
          <p><strong>Email:</strong> {{ emailValue() || '(empty)' }}</p>
          <p><strong>Number:</strong> {{ numberValue() }}</p>
          <p><strong>Password:</strong> {{ passwordValue() ? '••••••' : '(empty)' }}</p>
          <p><strong>Full Name (directive):</strong> {{ directiveValue1 || '(empty)' }}</p>
          <p><strong>Phone (directive):</strong> {{ directiveValue2 || '(empty)' }}</p>
          <hr>
          <p><strong>Checkbox 1:</strong> {{ checkbox1 }}</p>
          <p><strong>Checkbox 2:</strong> {{ checkbox2 }}</p>
          <p><strong>Checkbox 3:</strong> {{ checkbox3 }}</p>
          <p><strong>Selected Theme:</strong> {{ selectedTheme || '(none)' }}</p>
          <p><strong>Selected Plan:</strong> {{ selectedPlan || '(none)' }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      color: var(--tng-text, #333);
    }
    
    .subtitle {
      font-size: 1rem;
      color: var(--tng-text-secondary, #666);
      margin-bottom: 2rem;
    }
    
    .demo-section {
      margin-bottom: 3rem;
    }
    
    .demo-section h2 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
      color: var(--tng-text, #333);
    }
    
    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .values-display {
      padding: 1.5rem;
      background: var(--tng-background, #fafafa);
      border-radius: var(--tng-border-radius, 4px);
      border: 1px solid var(--tng-border, #e0e0e0);
    }
    
    .values-display p {
      margin: 0.5rem 0;
      color: var(--tng-text, #333);
      font-size: 0.9rem;
    }
    
    .values-display strong {
      color: var(--tng-primary, #6200ee);
    }
    
    .values-display hr {
      margin: 1rem 0;
      border: none;
      border-top: 1px solid var(--tng-border, #e0e0e0);
    }
    
    .section-description {
      font-size: 0.9rem;
      color: var(--tng-text-secondary, #666);
      margin-bottom: 1rem;
    }
    
    code {
      background: var(--tng-background, #fafafa);
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 0.85em;
      color: var(--tng-primary, #6200ee);
    }
    
    /* Checkbox and Radio Styles */
    .checkbox-demo,
    .radio-demo {
      padding: 1.5rem;
      background: var(--tng-surface, #ffffff);
      border-radius: var(--tng-border-radius, 4px);
      border: 1px solid var(--tng-border, #e0e0e0);
      margin-bottom: 1.5rem;
    }
    
    .checkbox-group,
    .radio-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    
    .radio-group:last-child {
      margin-bottom: 0;
    }
    
    .radio-group h3 {
      font-size: 1rem;
      font-weight: 500;
      color: var(--tng-text, #333);
      margin-bottom: 0.75rem;
    }
    
    .checkbox-label,
    .radio-label {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      user-select: none;
      transition: all 0.2s ease;
      padding: 0.5rem;
      border-radius: var(--tng-border-radius, 4px);
    }
    
    .checkbox-label:hover:not(.disabled),
    .radio-label:hover:not(.disabled) {
      background: var(--tng-background, #fafafa);
    }
    
    .checkbox-label.disabled,
    .radio-label.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .checkbox-label span,
    .radio-label span {
      color: var(--tng-text, #333);
      font-size: 0.95rem;
    }
  `]
})
export class InputDemoComponent {
  protected textValue = signal('');
  protected emailValue = signal('');
  protected numberValue = signal(0);
  protected passwordValue = signal('');
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

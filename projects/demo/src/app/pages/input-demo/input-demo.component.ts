import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TecnualInputComponent } from 'tecnualng';
import { CodeExampleComponent, CodeTab } from '../../components/code-example/code-example.component';

@Component({
  selector: 'app-input-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, TecnualInputComponent, CodeExampleComponent],
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
        <h2>Values</h2>
        <div class="values-display">
          <p><strong>Text:</strong> {{ textValue() || '(empty)' }}</p>
          <p><strong>Email:</strong> {{ emailValue() || '(empty)' }}</p>
          <p><strong>Number:</strong> {{ numberValue() }}</p>
          <p><strong>Password:</strong> {{ passwordValue() ? '••••••' : '(empty)' }}</p>
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
  `]
})
export class InputDemoComponent {
  protected textValue = signal('');
  protected emailValue = signal('');
  protected numberValue = signal(0);
  protected passwordValue = signal('');
  
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
}

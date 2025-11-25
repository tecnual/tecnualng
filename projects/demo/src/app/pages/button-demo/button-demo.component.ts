import { Component } from '@angular/core';
import { TngButton } from 'tecnualng';
import { CodeExampleComponent, CodeTab } from '../../components/code-example/code-example.component';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [TngButton, CodeExampleComponent],
  template: `
    <div class="page-container">
      <h1>Button Component</h1>
      <p class="subtitle">Styled button directive for consistent button appearance</p>
      
      <div class="demo-section">
        <h2>Basic Button</h2>
        <div class="button-row">
          <button tngButton>Default Button</button>
          <button tngButton>Click Me</button>
          <button tngButton>Submit</button>
        </div>
        
        <app-code-example [tabs]="basicButtonCode"></app-code-example>
      </div>
      
      <div class="demo-section">
        <h2>Custom Styled Buttons</h2>
        <div class="button-row">
          <button class="custom-btn primary">Primary</button>
          <button class="custom-btn secondary">Secondary</button>
          <button class="custom-btn success">Success</button>
          <button class="custom-btn danger">Danger</button>
        </div>
        
        <app-code-example [tabs]="customButtonCode"></app-code-example>
      </div>
      
      <div class="demo-section">
        <h2>Button Sizes</h2>
        <div class="button-row">
          <button tngButton class="btn-sm">Small</button>
          <button tngButton>Medium</button>
          <button tngButton class="btn-lg">Large</button>
        </div>
        
        <app-code-example [tabs]="sizeButtonCode"></app-code-example>
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
    
    .button-row {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 1.5rem;
    }
    
    .custom-btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: var(--tng-border-radius, 4px);
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s;
      font-family: var(--tng-font-family, 'Inter', sans-serif);
    }
    
    .custom-btn.primary {
      background: var(--tng-primary, #6200ee);
      color: var(--tng-primary-contrast, #fff);
    }
    
    .custom-btn.primary:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
    
    .custom-btn.secondary {
      background: var(--tng-secondary, #ff4081);
      color: var(--tng-secondary-contrast, #fff);
    }
    
    .custom-btn.secondary:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
    
    .custom-btn.success {
      background: var(--tng-success, #4caf50);
      color: #fff;
    }
    
    .custom-btn.success:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
    
    .custom-btn.danger {
      background: var(--tng-error, #f44336);
      color: #fff;
    }
    
    .custom-btn.danger:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
    
    .btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }
    
    .btn-lg {
      padding: 1rem 2rem;
      font-size: 1.125rem;
    }
  `]
})
export class ButtonDemoComponent {
  protected basicButtonCode: CodeTab[] = [
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `import { Component } from '@angular/core';
import { TngButton } from 'tecnualng';

@Component({
  selector: 'app-example',
  imports: [TngButton],
  template: '...'
})
export class ExampleComponent {}`
    },
    {
      label: 'HTML',
      language: 'html',
      code: `<button tngButton>Click Me</button>`
    }
  ];
  
  protected customButtonCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<button class="custom-btn primary">Primary</button>
<button class="custom-btn secondary">Secondary</button>
<button class="custom-btn success">Success</button>
<button class="custom-btn danger">Danger</button>`
    },
    {
      label: 'CSS',
      language: 'css',
      code: `.custom-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--tng-border-radius, 4px);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.custom-btn.primary {
  background: var(--tng-primary, #6200ee);
  color: var(--tng-primary-contrast, #fff);
}

.custom-btn.primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}`
    }
  ];
  
  protected sizeButtonCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<button tngButton class="btn-sm">Small</button>
<button tngButton>Medium</button>
<button tngButton class="btn-lg">Large</button>`
    },
    {
      label: 'CSS',
      language: 'css',
      code: `.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}`
    }
  ];
}

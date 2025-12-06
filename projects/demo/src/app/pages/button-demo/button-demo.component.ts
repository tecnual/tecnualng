import { Component } from '@angular/core';
import { CodeExampleComponent, CodeTab } from '../../components/code-example/code-example.component';
import { TngButton } from 'tecnualng';

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
          <button tngButton [soft]="true">Default Button</button>
          <button tngButton>Click Me</button>
          <button tngButton>Submit</button>
        </div>
        
        <app-code-example [tabs]="basicButtonCode"></app-code-example>
      </div>
      
      <div class="demo-section">
        <h2>Custom Styled Buttons</h2>
        <div class="button-row">
          <button tngButton variant="primary">Primary</button>
          <button tngButton variant="secondary">Secondary</button>
          <button tngButton variant="success">Success</button>
          <button tngButton variant="warning">Warning</button>
          <button tngButton variant="error">Error</button>
        </div>
        
        <app-code-example [tabs]="customButtonCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Basic and Outlined Variants</h2>
        <div class="button-row">
          <button tngButton variant="basic">Basic</button>
          <button tngButton variant="outlined">Outlined</button>
          <button tngButton variant="basic" [rounded]="true">Basic Rounded</button>
          <button tngButton variant="outlined" [rounded]="true">Outlined Rounded</button>
        </div>
        
        <app-code-example [tabs]="basicOutlinedCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Enhanced Buttons</h2>
        <div class="button-row">
          <button tngButton variant="primary" [rounded]="true">Rounded</button>
          <button tngButton variant="secondary" [soft]="true">Soft</button>
          <button tngButton variant="success" [rounded]="true" [soft]="true">Rounded & Soft</button>
          <button tngButton variant="warning" [ripple]="false">No Ripple</button>
        </div>
        
        <app-code-example [tabs]="enhancedButtonCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Buttons with Icons</h2>
        <p class="subtitle">Note: Requires an icon library (e.g., FontAwesome) to be loaded.</p>
        <div class="button-row">
          <button tngButton variant="primary" icon="fa fa-home">Home</button>
          <button tngButton variant="secondary" icon="fa fa-arrow-right" iconPosition="right">Next</button>
          <button tngButton variant="success" icon="fa fa-check" aria-label="Confirm"></button>
        </div>
        
        <app-code-example [tabs]="iconButtonCode"></app-code-example>
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
      code: `<button tngButton variant="primary">Primary</button>
<button tngButton variant="secondary">Secondary</button>
<button tngButton variant="success">Success</button>
<button tngButton variant="warning">Warning</button>
<button tngButton variant="error">Error</button>`
    }
  ];

  protected basicOutlinedCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<button tngButton variant="basic">Basic</button>
<button tngButton variant="outlined">Outlined</button>
<button tngButton variant="basic" [rounded]="true">Basic Rounded</button>
<button tngButton variant="outlined" [rounded]="true">Outlined Rounded</button>`
    }
  ];


  protected enhancedButtonCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<!-- Rounded Buttons -->
<button tngButton variant="primary" [rounded]="true">Rounded</button>

<!-- Soft Buttons -->
<button tngButton variant="secondary" [soft]="true">Soft</button>

<!-- No Ripple -->
<button tngButton variant="primary" [ripple]="false">No Ripple</button>`
    }
  ];
  
  protected iconButtonCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<!-- Left Icon -->
<button tngButton variant="primary" icon="fa fa-home">Home</button>

<!-- Right Icon -->
<button tngButton variant="secondary" icon="fa fa-arrow-right" iconPosition="right">Next</button>

<!-- Icon Only (using aria-label for accessibility) -->
<button tngButton variant="success" icon="fa fa-check" aria-label="Confirm"></button>`
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

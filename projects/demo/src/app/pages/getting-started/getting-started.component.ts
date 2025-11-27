import { Component } from '@angular/core';
import { CodeExampleComponent, CodeTab } from '../../components/code-example/code-example.component';

@Component({
  selector: 'app-getting-started',
  standalone: true,
  imports: [CodeExampleComponent],
  template: `
    <div class="page-container">
      <h1>Getting Started</h1>
      <p class="subtitle">Quick guide to install and configure TecnualNG in your Angular application</p>
      
      <div class="demo-section">
        <h2>Installation</h2>
        <p>Install the library using npm:</p>
        <app-code-example [tabs]="installCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Import Components</h2>
        <p>Import the components you need in your Angular module or standalone component:</p>
        <app-code-example [tabs]="importCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Add Icon Library</h2>
        <p>For components that use icons, add FontAwesome to your <code>index.html</code>:</p>
        <app-code-example [tabs]="iconLibraryCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Configure Theme (Optional)</h2>
        <p>To use the theme system, import and use the ThemeService:</p>
        <app-code-example [tabs]="themeCode"></app-code-example>
        
        <p style="margin-top: 1rem;">Define your CSS variables in your global styles:</p>
        <app-code-example [tabs]="cssVariablesCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Usage Example</h2>
        <p>Here's a complete example using multiple components:</p>
        <app-code-example [tabs]="usageExampleCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Next Steps</h2>
        <ul class="next-steps-list">
          <li>Explore the <strong>Components</strong> section in the sidebar to see all available components</li>
          <li>Check out the demo examples for each component</li>
          <li>Customize the theme by modifying CSS variables</li>
          <li>Read the component documentation for available inputs and options</li>
        </ul>
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
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: var(--tng-text, #333);
    }

    .demo-section p {
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    code {
      background-color: #f5f5f5;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
    }

    .next-steps-list {
      list-style: none;
      padding: 0;
    }

    .next-steps-list li {
      padding: 0.75rem 0;
      border-bottom: 1px solid #e0e0e0;
      line-height: 1.6;
    }

    .next-steps-list li:last-child {
      border-bottom: none;
    }

    .next-steps-list strong {
      color: var(--tng-primary, #1976d2);
    }
  `]
})
export class GettingStartedComponent {
  protected installCode: CodeTab[] = [
    {
      label: 'npm',
      language: 'bash',
      code: `npm install tecnualng`
    }
  ];

  protected importCode: CodeTab[] = [
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `import { Component } from '@angular/core';
import { TngButton, TngCardComponent, TngToolbarComponent } from 'tecnualng';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TngButton, TngCardComponent, TngToolbarComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}`
    }
  ];

  protected iconLibraryCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<!-- In your index.html <head> section -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />`
    }
  ];

  protected themeCode: CodeTab[] = [
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `import { ThemeService } from 'tecnualng';

export class AppComponent {
  constructor(private themeService: ThemeService) {
    // Set theme
    this.themeService.setTheme('dark');
    
    // Get current theme
    const currentTheme = this.themeService.getTheme();
  }
}`
    }
  ];

  protected cssVariablesCode: CodeTab[] = [
    {
      label: 'CSS',
      language: 'css',
      code: `:root {
  --tng-primary: #1976d2;
  --tng-primary-contrast: #ffffff;
  --tng-secondary: #dc004e;
  --tng-secondary-contrast: #ffffff;
  --tng-success: #4caf50;
  --tng-warning: #ff9800;
  --tng-error: #f44336;
  --tng-text: #333333;
  --tng-text-secondary: #666666;
}`
    }
  ];

  protected usageExampleCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-toolbar position="top" color="primary" [elevation]="true">
  <div toolbar-left>
    <button tngButton icon="fa fa-bars">Menu</button>
  </div>
  <div toolbar-center>
    <span>My App</span>
  </div>
</tng-toolbar>

<tng-card title="Welcome" [elevated]="true">
  <p>Get started with TecnualNG components!</p>
  <div card-footer>
    <button tngButton variant="primary">Learn More</button>
  </div>
</tng-card>`
    }
  ];
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TngTooltipDirective, TngButton } from 'tecnualng';
import { CodeExampleComponent, CodeTab } from '../../components/code-example/code-example.component';

@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  imports: [CommonModule, TngTooltipDirective, TngButton, CodeExampleComponent],
  template: `
    <div class="demo-page">
      <h1>Tooltip Component</h1>
      <p class="description">
        A highly configurable and animated tooltip component that can be applied to any element.
      </p>

      <div class="demo-section">
        <h2>Basic Usage</h2>
        <div class="button-group">
          <button tngButton tngTooltip="Simple tooltip text">Hover me</button>
        </div>
        
        <app-code-example [tabs]="basicUsageCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Positions</h2>
        <div class="button-group">
          <button tngButton tngTooltip="Tooltip on Top" tngTooltipPosition="top">Top</button>
          <button tngButton tngTooltip="Tooltip on Bottom" tngTooltipPosition="bottom">Bottom</button>
          <button tngButton tngTooltip="Tooltip on Left" tngTooltipPosition="left">Left</button>
          <button tngButton tngTooltip="Tooltip on Right" tngTooltipPosition="right">Right</button>
        </div>
        
        <app-code-example [tabs]="positionsCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Delays</h2>
        <div class="button-group">
          <button tngButton tngTooltip="Instant Tooltip" [tngTooltipDelay]="0">Instant</button>
          <button tngButton tngTooltip="Delayed Tooltip (500ms)" [tngTooltipDelay]="500">Delayed</button>
        </div>
        
        <app-code-example [tabs]="delaysCode"></app-code-example>
      </div>
      
      <div class="demo-section">
        <h2>Custom Template</h2>
        <ng-template #customTooltip>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 20px;">🚀</span>
            <div>
              <strong>Rich Content</strong><br>
              <span>With HTML support</span>
            </div>
          </div>
        </ng-template>
        <button tngButton [tngTooltip]="customTooltip" tngTooltipPosition="right">Hover me</button>
        
        <app-code-example [tabs]="customTemplateCode"></app-code-example>
      </div>
    </div>
  `,
  styles: [`
    .demo-page {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      background: linear-gradient(45deg, #3b82f6, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .description {
      font-size: 1.1rem;
      color: var(--text-secondary, #666);
      margin-bottom: 3rem;
    }

    .demo-section {
      margin-bottom: 3rem;
      padding: 2rem;
      border-radius: 16px;
      background: var(--surface-card, rgba(255, 255, 255, 0.05));
      border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
    }

    h2 {
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
      color: var(--text-primary, #333);
    }

    .button-group {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 1.5rem;
    }
  `]
})
export class TooltipDemoComponent {
  protected basicUsageCode: CodeTab[] = [
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `import { Component } from '@angular/core';
import { TngTooltipDirective, TngButton } from 'tecnualng';

@Component({
  selector: 'app-example',
  imports: [TngTooltipDirective, TngButton],
  template: '...'
})
export class ExampleComponent {}`
    },
    {
      label: 'HTML',
      language: 'html',
      code: `<button tngButton tngTooltip="Simple tooltip text">Hover me</button>`
    }
  ];

  protected positionsCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<button tngButton tngTooltip="Tooltip on Top" tngTooltipPosition="top">Top</button>
<button tngButton tngTooltip="Tooltip on Bottom" tngTooltipPosition="bottom">Bottom</button>
<button tngButton tngTooltip="Tooltip on Left" tngTooltipPosition="left">Left</button>
<button tngButton tngTooltip="Tooltip on Right" tngTooltipPosition="right">Right</button>`
    }
  ];

  protected delaysCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<!-- Instant (no delay) -->
<button tngButton tngTooltip="Instant Tooltip" [tngTooltipDelay]="0">Instant</button>

<!-- Default delay (200ms) -->
<button tngButton tngTooltip="Default delay">Default</button>

<!-- Custom delay (500ms) -->
<button tngButton tngTooltip="Delayed Tooltip" [tngTooltipDelay]="500">Delayed</button>`
    }
  ];

  protected customTemplateCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<ng-template #customTooltip>
  <div style="display: flex; align-items: center; gap: 8px;">
    <span style="font-size: 20px;">🚀</span>
    <div>
      <strong>Rich Content</strong><br>
      <span>With HTML support</span>
    </div>
  </div>
</ng-template>

<button tngButton [tngTooltip]="customTooltip" tngTooltipPosition="right">
  Hover me
</button>`
    }
  ];
}

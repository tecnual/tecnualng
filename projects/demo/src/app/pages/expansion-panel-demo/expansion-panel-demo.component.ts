import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TngExpansionPanelComponent } from 'tecnualng';
import { CodeExampleComponent, CodeTab } from '../../components/code-example/code-example.component';

@Component({
  selector: 'app-expansion-panel-demo',
  standalone: true,
  imports: [CommonModule, TngExpansionPanelComponent, CodeExampleComponent],
  template: `
    <div class="demo-page">
      <h1>Expansion Panel Component</h1>
      <p class="description">
        A collapsible expansion panel with smooth animations and configurable options.
      </p>

      <div class="demo-section">
        <h2>Basic Usage</h2>
        <tng-expansion-panel title="What is an Expansion Panel?">
          <p>An expansion panel is a lightweight container that can be expanded or collapsed to show or hide content. It's perfect for organizing information in a clean, space-efficient way.</p>
        </tng-expansion-panel>
        
        <app-code-example [tabs]="basicUsageCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Initially Expanded</h2>
        <tng-expansion-panel title="This panel starts open" [expanded]="true">
          <p>You can set the initial state of the panel using the <code>expanded</code> input property.</p>
        </tng-expansion-panel>
        
        <app-code-example [tabs]="expandedCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Multiple Panels</h2>
        <tng-expansion-panel title="Panel 1">
          <p>This is the content of the first panel.</p>
        </tng-expansion-panel>
        
        <tng-expansion-panel title="Panel 2">
          <p>This is the content of the second panel.</p>
        </tng-expansion-panel>
        
        <tng-expansion-panel title="Panel 3">
          <p>This is the content of the third panel.</p>
        </tng-expansion-panel>
        
        <app-code-example [tabs]="multiplePanelsCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Disabled State</h2>
        <tng-expansion-panel title="This panel is disabled" [disabled]="true">
          <p>This content cannot be accessed because the panel is disabled.</p>
        </tng-expansion-panel>
        
        <app-code-example [tabs]="disabledCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Event Handling</h2>
        <tng-expansion-panel 
          title="Toggle me to see events" 
          (toggled)="onPanelToggled($event)"
        >
          <p>Every time you toggle this panel, an event is fired.</p>
        </tng-expansion-panel>
        
        <div class="event-log">
          <strong>Event Log:</strong>
          @if (eventLog().length === 0) {
            <p>No events yet. Try toggling the panel above.</p>
          } @else {
            <ul>
              @for (event of eventLog(); track $index) {
                <li>Panel {{ event.state }}: {{ event.timestamp }}</li>
              }
            </ul>
          }
        </div>
        
        <app-code-example [tabs]="eventHandlingCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Rich Content</h2>
        <tng-expansion-panel title="Panel with Complex Content">
          <h4>Nested Heading</h4>
          <p>You can include any content inside the panel:</p>
          <ul>
            <li>Lists</li>
            <li>Images</li>
            <li>Forms</li>
            <li>Other components</li>
          </ul>
          <p>The panel will adjust its height automatically.</p>
        </tng-expansion-panel>
        
        <app-code-example [tabs]="richContentCode"></app-code-example>
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

    .event-log {
      margin-top: 1rem;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 8px;
      border: 1px solid #ddd;
    }

    .event-log ul {
      margin: 0.5rem 0 0 0;
      padding-left: 1.5rem;
    }

    .event-log li {
      margin: 0.25rem 0;
      font-family: monospace;
      font-size: 0.9rem;
    }

    code {
      background: #f0f0f0;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
    }
  `]
})
export class ExpansionPanelDemoComponent {
  eventLog = signal<Array<{ state: string, timestamp: string }>>([]);

  onPanelToggled(isExpanded: boolean): void {
    const state = isExpanded ? 'opened' : 'closed';
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.update(log => [...log, { state, timestamp }]);
  }

  protected basicUsageCode: CodeTab[] = [
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `import { Component } from '@angular/core';
import { TngExpansionPanelComponent } from 'tecnualng';

@Component({
  selector: 'app-example',
  imports: [TngExpansionPanelComponent],
  template: '...'
})
export class ExampleComponent {}`
    },
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-expansion-panel title="What is an Expansion Panel?">
  <p>Content goes here...</p>
</tng-expansion-panel>`
    }
  ];

  protected expandedCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-expansion-panel title="This panel starts open" [expanded]="true">
  <p>This panel is initially expanded.</p>
</tng-expansion-panel>`
    }
  ];

  protected multiplePanelsCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-expansion-panel title="Panel 1">
  <p>Content for panel 1</p>
</tng-expansion-panel>

<tng-expansion-panel title="Panel 2">
  <p>Content for panel 2</p>
</tng-expansion-panel>

<tng-expansion-panel title="Panel 3">
  <p>Content for panel 3</p>
</tng-expansion-panel>`
    }
  ];

  protected disabledCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-expansion-panel title="This panel is disabled" [disabled]="true">
  <p>This content cannot be accessed.</p>
</tng-expansion-panel>`
    }
  ];

  protected eventHandlingCode: CodeTab[] = [
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `import { Component } from '@angular/core';
import { TngExpansionPanelComponent } from 'tecnualng';

@Component({
  selector: 'app-example',
  imports: [TngExpansionPanelComponent],
  template: \`
    <tng-expansion-panel 
      title="Toggle me" 
      (toggled)="onPanelToggled($event)"
    >
      <p>Content here</p>
    </tng-expansion-panel>
  \`
})
export class ExampleComponent {
  onPanelToggled(isExpanded: boolean): void {
    console.log('Panel is now:', isExpanded ? 'open' : 'closed');
  }
}`
    }
  ];

  protected richContentCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-expansion-panel title="Panel with Complex Content">
  <h4>Nested Heading</h4>
  <p>You can include any content:</p>
  <ul>
    <li>Lists</li>
    <li>Images</li>
    <li>Forms</li>
    <li>Other components</li>
  </ul>
</tng-expansion-panel>`
    }
  ];
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TngToolbarComponent } from 'tecnualng';
import { TngButton } from 'tecnualng';
import { CodeExampleComponent, CodeTab } from '../../components/code-example/code-example.component';

@Component({
  selector: 'app-toolbar-demo',
  standalone: true,
  imports: [CommonModule, TngToolbarComponent, TngButton, CodeExampleComponent],
  template: `
    <div class="page-container">
      <h1>Toolbar Component</h1>
      <p class="subtitle">Dynamic, responsive toolbar that can be fixed as header or footer</p>
      
      <div class="demo-section">
        <h2>Static Toolbar</h2>
        <tng-toolbar positionType="static">
          <div toolbar-left>
            <button tngButton icon="fa fa-bars">Menu</button>
          </div>
          <div toolbar-center>
            <span style="font-weight: 500; font-size: 1.25rem;">Static Toolbar</span>
          </div>
          <div toolbar-right>
            <button tngButton icon="fa fa-search"></button>
            <button tngButton icon="fa fa-bell"></button>
          </div>
        </tng-toolbar>
        <app-code-example [tabs]="staticToolbarCode"></app-code-example>
      </div>
      <div class="demo-section">
        <h2>Fixed Top Toolbar</h2>
        <p class="note">This toolbar would be fixed at the top of the page</p>
        <tng-toolbar position="top" positionType="fixed" [elevation]="true">
          <div toolbar-left>
            <button tngButton icon="fa fa-bars">Menu</button>
          </div>
          <div toolbar-center>
            <span style="font-weight: 500; font-size: 1.25rem;">Fixed Top</span>
          </div>
          <div toolbar-right>
            <button tngButton icon="fa fa-user"></button>
          </div>
        </tng-toolbar>
        <app-code-example [tabs]="topToolbarCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Fixed Bottom Toolbar</h2>
        <p class="note">This toolbar would be fixed at the bottom of the page</p>
        <div class="example-container">
        <tng-toolbar position="bottom" positionType="fixed" [elevation]="true">
          <div toolbar-left>
            <button tngButton variant="primary" icon="fa fa-home">Home</button>
          </div>
          <div toolbar-center>
            <button tngButton icon="fa fa-search">Search</button>
          </div>
          <div toolbar-right>
            <button tngButton icon="fa fa-cog">Settings</button>
          </div>
        </tng-toolbar>
        
        <app-code-example [tabs]="bottomToolbarCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Colored Toolbars</h2>
        <div class="toolbar-stack">
          <tng-toolbar color="primary" [elevation]="true">
            <div toolbar-left>
              <button tngButton icon="fa fa-arrow-left">Back</button>
            </div>
            <div toolbar-center>
              <span style="font-weight: 500; font-size: 1.25rem;">Primary Toolbar</span>
            </div>
            <div toolbar-right>
              <button tngButton icon="fa fa-ellipsis-v"></button>
            </div>
          </tng-toolbar>

          <tng-toolbar color="secondary" [elevation]="true">
            <div toolbar-left>
              <button tngButton icon="fa fa-arrow-left">Back</button>
            </div>
            <div toolbar-center>
              <span style="font-weight: 500; font-size: 1.25rem;">Secondary Toolbar</span>
            </div>
            <div toolbar-right>
              <button tngButton icon="fa fa-ellipsis-v"></button>
            </div>
          </tng-toolbar>
        </div>
        
        <app-code-example [tabs]="coloredToolbarCode"></app-code-example>
      </div>
      <div class="demo-section">
        <h2>Sticky Toolbar</h2>
        <p class="note">Scroll inside the box to see the toolbar stick to the top</p>
        <div class="example-container">
          <tng-toolbar positionType="sticky" [elevation]="true">
            <div toolbar-left>
              <button tngButton icon="fa fa-bars">Menu</button>
            </div>
            <div toolbar-center>
              <span style="font-weight: 500; font-size: 1.25rem;">Sticky Header</span>
            </div>
            <div toolbar-right>
              <button tngButton icon="fa fa-user"></button>
            </div>
          </tng-toolbar>
          <div style="padding: 20px;">
            <p *ngFor="let i of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]">
              Scrollable content section {{i}}. The toolbar above should stick to the top of this container when you scroll down.
            </p>
          </div>
        </div>
        <app-code-example [tabs]="stickyToolbarCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Responsive Toolbar</h2>
        <p class="note">Try resizing the window to see the responsive behavior</p>
        <tng-toolbar color="primary" [elevation]="true">
          <div toolbar-left>
            <button tngButton icon="fa fa-bars"></button>
            <span style="font-weight: 500; display: none; @media (min-width: 768px) { display: inline; }">MyApp</span>
          </div>
          <div toolbar-center>
            <!-- Empty on mobile, content on desktop -->
          </div>
          <div toolbar-right>
            <button tngButton icon="fa fa-search"></button>
            <button tngButton icon="fa fa-user"></button>
          </div>
        </tng-toolbar>
        
        <app-code-example [tabs]="responsiveToolbarCode"></app-code-example>
      </div>
    </div>
  `,
  styles: [`
    .example-container {
      border: 1px solid var(--tng-border);
      padding: 1rem;
      height: 500px;
      overflow-y: scroll;
      position: relative;
    }

    .empty-space {
      height: 600px;
      border: 1px solid var(--tng-border);
      overflow-y: auto;
    }
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

    .note {
      font-size: 0.875rem;
      color: var(--tng-text-secondary, #666);
      margin-bottom: 1rem;
      font-style: italic;
    }

    .toolbar-stack {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    tng-toolbar {
      margin-bottom: 1.5rem;
    }
  `]
})
export class ToolbarDemoComponent {
  protected staticToolbarCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-toolbar>
  <div toolbar-left>
    <button tngButton icon="fa fa-bars">Menu</button>
  </div>
  <div toolbar-center>
    <span>Static Toolbar</span>
  </div>
  <div toolbar-right>
    <button tngButton icon="fa fa-search"></button>
    <button tngButton icon="fa fa-bell"></button>
  </div>
</tng-toolbar>`
    }
  ];

  protected topToolbarCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-toolbar position="top" [elevation]="true">
  <div toolbar-left>
    <button tngButton icon="fa fa-bars">Menu</button>
  </div>
  <div toolbar-center>
    <span>Fixed Top</span>
  </div>
  <div toolbar-right>
    <button tngButton icon="fa fa-user"></button>
  </div>
</tng-toolbar>`
    }
  ];

  protected bottomToolbarCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-toolbar position="bottom" [elevation]="true">
  <div toolbar-left>
    <button tngButton variant="primary">Home</button>
  </div>
  <div toolbar-center>
    <button tngButton>Search</button>
  </div>
  <div toolbar-right>
    <button tngButton>Settings</button>
  </div>
</tng-toolbar>`
    }
  ];

  protected coloredToolbarCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-toolbar color="primary" [elevation]="true">
  <div toolbar-left>
    <button tngButton>Back</button>
  </div>
  <div toolbar-center>
    <span>Primary Toolbar</span>
  </div>
  <div toolbar-right>
    <button tngButton icon="fa fa-ellipsis-v"></button>
  </div>
</tng-toolbar>

<tng-toolbar color="secondary" [elevation]="true">
  <div toolbar-center>
    <span>Secondary Toolbar</span>
  </div>
</tng-toolbar>`
    }
  ];

  protected stickyToolbarCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<div class="container" style="height: 500px; overflow-y: auto;">
  <tng-toolbar positionType="sticky" [elevation]="true">
    <div toolbar-left>
      <button tngButton icon="fa fa-bars">Menu</button>
    </div>
    <div toolbar-center>
      <span>Sticky Header</span>
    </div>
    <div toolbar-right>
      <button tngButton icon="fa fa-user"></button>
    </div>
  </tng-toolbar>
  
  <div class="content">
    <!-- Scrollable content -->
  </div>
</div>`
    }
  ];

  protected responsiveToolbarCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-toolbar color="primary" [elevation]="true">
  <div toolbar-left>
    <button tngButton icon="fa fa-bars"></button>
    <span class="hide-mobile">MyApp</span>
  </div>
  <div toolbar-right>
    <button tngButton icon="fa fa-search"></button>
    <button tngButton icon="fa fa-user"></button>
  </div>
</tng-toolbar>`
    }
  ];
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TngTabsComponent, TngTabComponent } from 'tecnualng';
import { CodeExampleComponent, CodeTab } from '../../components/code-example/code-example.component';

@Component({
  selector: 'app-tabs-demo',
  standalone: true,
  imports: [CommonModule, TngTabsComponent, TngTabComponent, CodeExampleComponent],
  template: `
    <div class="page-container">
      <h1>Tabs Component</h1>
      <p class="subtitle">Organize content into separate views where only one view can be visible at a time.</p>
      
      <div class="demo-section">
        <h2>Basic Usage</h2>
        <div class="example-container">
          <tng-tabs>
            <tng-tab label="First">
              <div class="tab-content">
                <h3>First Tab Content</h3>
                <p>This is the content of the first tab.</p>
              </div>
            </tng-tab>
            <tng-tab label="Second">
              <div class="tab-content">
                <h3>Second Tab Content</h3>
                <p>This is the content of the second tab.</p>
              </div>
            </tng-tab>
            <tng-tab label="Third">
              <div class="tab-content">
                <h3>Third Tab Content</h3>
                <p>This is the content of the third tab.</p>
              </div>
            </tng-tab>
          </tng-tabs>
        </div>
        <app-code-example [tabs]="basicTabsCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Pagination</h2>
        <p class="note">When there are too many tabs to fit, pagination controls appear.</p>
        <div class="example-container">
          <tng-tabs>
            <tng-tab *ngFor="let i of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]" [label]="'Tab ' + i">
              <div class="tab-content">
                <h3>Content for Tab {{i}}</h3>
                <p>This is the content for tab number {{i}}. Try scrolling through the tabs using the arrows.</p>
              </div>
            </tng-tab>
          </tng-tabs>
        </div>
        <app-code-example [tabs]="paginationTabsCode"></app-code-example>
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

    .note {
      font-size: 0.875rem;
      color: var(--tng-text-secondary, #666);
      margin-bottom: 1rem;
      font-style: italic;
    }

    .example-container {
      border: 1px solid var(--tng-border);
      margin-bottom: 1rem;
    }

    .tab-content {
      padding: 1rem;
    }
  `]
})
export class TabsDemoComponent {
  protected basicTabsCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-tabs>
  <tng-tab label="First">
    <div class="tab-content">
      <h3>First Tab Content</h3>
      <p>This is the content of the first tab.</p>
    </div>
  </tng-tab>
  <tng-tab label="Second">
    <div class="tab-content">
      <h3>Second Tab Content</h3>
      <p>This is the content of the second tab.</p>
    </div>
  </tng-tab>
  <tng-tab label="Third">
    <div class="tab-content">
      <h3>Third Tab Content</h3>
      <p>This is the content of the third tab.</p>
    </div>
  </tng-tab>
</tng-tabs>`
    }
  ];

  protected paginationTabsCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-tabs>
  <tng-tab *ngFor="let i of tabs" [label]="'Tab ' + i">
    <div class="tab-content">
      <h3>Content for Tab {{i}}</h3>
    </div>
  </tng-tab>
</tng-tabs>`
    }
  ];
}

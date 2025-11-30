import { Component } from '@angular/core';
import { CodeExampleComponent, CodeTab } from '../../components/code-example/code-example.component';
import { TngMenuComponent, TngMenuItemComponent, TngMenuGroupComponent } from 'tecnualng';

@Component({
  selector: 'app-menu-demo',
  standalone: true,
  imports: [TngMenuComponent, TngMenuItemComponent, TngMenuGroupComponent, CodeExampleComponent],
  template: `
    <div class="page-container">
      <h1>Menu Component</h1>
      <p class="subtitle">A flexible menu system with multi-level support, signals, and CSS animations</p>
      
      <div class="demo-section">
        <h2>Basic Menu</h2>
        <div class="menu-demo">
          <tng-menu>
            <tng-menu-item icon="home" label="Home" route="/home"></tng-menu-item>
            <tng-menu-item icon="info" label="About"></tng-menu-item>
            <tng-menu-item icon="settings" label="Settings"></tng-menu-item>
          </tng-menu>
        </div>
        
        <app-code-example [tabs]="basicMenuCode"></app-code-example>
      </div>
      
      <div class="demo-section">
        <h2>Grouped Menu</h2>
        <div class="menu-demo">
          <tng-menu>
            <tng-menu-group label="Navigation">
              <tng-menu-item icon="dashboard" label="Dashboard"></tng-menu-item>
              <tng-menu-item icon="analytics" label="Analytics"></tng-menu-item>
            </tng-menu-group>
            
            <tng-menu-group label="Settings">
              <tng-menu-item icon="person" label="Profile"></tng-menu-item>
              <tng-menu-item icon="security" label="Security"></tng-menu-item>
            </tng-menu-group>
          </tng-menu>
        </div>
        
        <app-code-example [tabs]="groupedMenuCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Multi-Level Menu</h2>
        <p class="subtitle">Nested menu items with expand/collapse functionality</p>
        <div class="menu-demo">
          <tng-menu>
            <tng-menu-item icon="folder" label="Documents">
              <tng-menu-item icon="description" label="Reports" [level]="1"></tng-menu-item>
              <tng-menu-item icon="picture_as_pdf" label="PDFs" [level]="1"></tng-menu-item>
              <tng-menu-item icon="image" label="Images" [level]="1">
                <tng-menu-item icon="photo" label="Photos" [level]="2">
                  <tng-menu-item icon="photo" label="Photos2" [level]="4"></tng-menu-item>
                </tng-menu-item>
                <tng-menu-item icon="wallpaper" label="Wallpapers" [level]="2"></tng-menu-item>
              </tng-menu-item>
            </tng-menu-item>
            <tng-menu-item icon="cloud" label="Cloud Storage">
              <tng-menu-item icon="cloud_upload" label="Upload" [level]="1"></tng-menu-item>
              <tng-menu-item icon="cloud_download" label="Download" [level]="1"></tng-menu-item>
            </tng-menu-item>
          </tng-menu>
        </div>
        
        <app-code-example [tabs]="nestedMenuCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Compact Menu</h2>
        <div class="menu-demo">
          <tng-menu density="compact">
            <tng-menu-item icon="inbox" label="Inbox"></tng-menu-item>
            <tng-menu-item icon="send" label="Sent"></tng-menu-item>
            <tng-menu-item icon="drafts" label="Drafts"></tng-menu-item>
            <tng-menu-item icon="delete" label="Trash"></tng-menu-item>
          </tng-menu>
        </div>
        
        <app-code-example [tabs]="compactMenuCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Menu with Disabled Items</h2>
        <div class="menu-demo">
          <tng-menu>
            <tng-menu-item icon="edit" label="Edit"></tng-menu-item>
            <tng-menu-item icon="copy" label="Copy" [disabled]="true"></tng-menu-item>
            <tng-menu-item icon="paste" label="Paste" [disabled]="true"></tng-menu-item>
            <tng-menu-item icon="delete" label="Delete"></tng-menu-item>
          </tng-menu>
        </div>
        
        <app-code-example [tabs]="disabledMenuCode"></app-code-example>
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
    
    .menu-demo {
      max-width: 350px;
      margin-bottom: 1.5rem;
      border: 1px solid var(--tng-border, #e0e0e0);
      border-radius: 8px;
      overflow: hidden;
      background: var(--tng-surface, white);
    }
  `]
})
export class MenuDemoComponent {
  protected basicMenuCode: CodeTab[] = [
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `import { Component } from '@angular/core';
import { TngMenuComponent, TngMenuItemComponent } from 'tecnualng';

@Component({
  selector: 'app-example',
  imports: [TngMenuComponent, TngMenuItemComponent],
  template: '...'
})
export class ExampleComponent {}`
    },
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-menu>
  <tng-menu-item icon="home" label="Home" route="/home"></tng-menu-item>
  <tng-menu-item icon="info" label="About"></tng-menu-item>
  <tng-menu-item icon="settings" label="Settings"></tng-menu-item>
</tng-menu>`
    }
  ];
  
  protected groupedMenuCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-menu>
  <tng-menu-group label="Navigation">
    <tng-menu-item icon="dashboard" label="Dashboard"></tng-menu-item>
    <tng-menu-item icon="analytics" label="Analytics"></tng-menu-item>
  </tng-menu-group>
  
  <tng-menu-group label="Settings">
    <tng-menu-item icon="person" label="Profile"></tng-menu-item>
    <tng-menu-item icon="security" label="Security"></tng-menu-item>
  </tng-menu-group>
</tng-menu>`
    }
  ];

  protected nestedMenuCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-menu>
  <tng-menu-item icon="folder" label="Documents">
    <tng-menu-item icon="description" label="Reports" [level]="1"></tng-menu-item>
    <tng-menu-item icon="image" label="Images" [level]="1">
      <tng-menu-item icon="photo" label="Photos" [level]="2"></tng-menu-item>
      <tng-menu-item icon="wallpaper" label="Wallpapers" [level]="2"></tng-menu-item>
    </tng-menu-item>
  </tng-menu-item>
</tng-menu>`
    }
  ];
  
  protected compactMenuCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-menu density="compact">
  <tng-menu-item icon="inbox" label="Inbox"></tng-menu-item>
  <tng-menu-item icon="send" label="Sent"></tng-menu-item>
  <tng-menu-item icon="drafts" label="Drafts"></tng-menu-item>
</tng-menu>`
    }
  ];

  protected disabledMenuCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-menu>
  <tng-menu-item icon="edit" label="Edit"></tng-menu-item>
  <tng-menu-item icon="copy" label="Copy" [disabled]="true"></tng-menu-item>
  <tng-menu-item icon="paste" label="Paste" [disabled]="true"></tng-menu-item>
  <tng-menu-item icon="delete" label="Delete"></tng-menu-item>
</tng-menu>`
    }
  ];
}

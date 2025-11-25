import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CodeTab {
  label: string;
  language: string;
  code: string;
}

@Component({
  selector: 'app-code-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="code-example">
      <div class="code-tabs">
        <button 
          *ngFor="let tab of tabs; let i = index"
          class="tab-button"
          [class.active]="activeTab() === i"
          (click)="activeTab.set(i)"
        >
          {{ tab.label }}
        </button>
      </div>
      
      <div class="code-content">
        <button class="copy-button" (click)="copyCode()" title="Copy code">
          <span class="material-icons">content_copy</span>
        </button>
        <pre><code [attr.data-language]="tabs[activeTab()].language">{{ tabs[activeTab()].code }}</code></pre>
      </div>
    </div>
  `,
  styles: [`
    .code-example {
      margin: 1.5rem 0;
      border: 1px solid var(--tng-border, #e0e0e0);
      border-radius: var(--tng-border-radius, 4px);
      overflow: hidden;
      background: var(--tng-surface, #fff);
    }
    
    .code-tabs {
      display: flex;
      background: var(--tng-background, #fafafa);
      border-bottom: 1px solid var(--tng-border, #e0e0e0);
    }
    
    .tab-button {
      padding: 0.75rem 1.5rem;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      font-family: var(--tng-font-family, 'Roboto', sans-serif);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--tng-text-secondary, #666);
      transition: all 0.2s;
    }
    
    .tab-button:hover {
      background: rgba(0,0,0,0.04);
    }
    
    .tab-button.active {
      color: var(--tng-primary, #6200ee);
      border-bottom-color: var(--tng-primary, #6200ee);
      background: var(--tng-surface, #fff);
    }
    
    .code-content {
      position: relative;
      background: #f8f8f8;
    }
    
    .copy-button {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: var(--tng-surface, #fff);
      border: 1px solid var(--tng-border, #e0e0e0);
      border-radius: var(--tng-border-radius, 4px);
      padding: 0.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      z-index: 10;
    }
    
    .copy-button:hover {
      background: var(--tng-background, #fafafa);
      border-color: var(--tng-primary, #6200ee);
    }
    
    .copy-button .material-icons {
      font-size: 18px;
      color: var(--tng-text-secondary, #666);
    }
    
    pre {
      margin: 0;
      padding: 1.5rem;
      padding-top: 3rem;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      font-size: 0.875rem;
      line-height: 1.5;
    }
    
    code {
      color: var(--tng-text, #333);
    }
    
    /* Simple syntax highlighting */
    code[data-language="typescript"] {
      color: #0066cc;
    }
    
    code[data-language="html"] {
      color: #cc0066;
    }
    
    code[data-language="css"] {
      color: #006600;
    }
  `]
})
export class CodeExampleComponent {
  @Input() tabs: CodeTab[] = [];
  
  protected activeTab = signal(0);
  
  copyCode() {
    const code = this.tabs[this.activeTab()].code;
    navigator.clipboard.writeText(code).then(() => {
      // Could show a toast notification here
      console.log('Code copied to clipboard!');
    });
  }
}

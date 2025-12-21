import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { TngSelectComponent, TngSelectDirective, SelectOption } from 'tecnualng';
import { CodeExampleComponent, CodeTab } from '../../components/code-example/code-example.component';

@Component({
  selector: 'app-select-demo',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    TngSelectComponent, 
    TngSelectDirective, 
    CodeExampleComponent
  ],
  template: `
    <div class="page-container">
      <h1>Select Component</h1>
      <p class="subtitle">Enhanced native select with search, multi-selection, and custom styling</p>
      
      <div class="demo-section">
        <h2>Basic Usage</h2>
        <p class="section-description">Standard single selection with custom styling</p>
        
        <div class="demo-grid">
          <tng-select
            label="Favorite Fruit"
            [options]="fruitOptions"
            [(value)]="selectedFruit"
            placeholder="Choose a fruit"
          ></tng-select>
          
          <div class="value-display">
            Selected: <strong>{{ selectedFruit[0] || 'None' }}</strong>
          </div>
        </div>
        
        <app-code-example [tabs]="basicCode"></app-code-example>
      </div>
      
      <div class="demo-section">
        <h2>Searchable Select</h2>
        <p class="section-description">Enable search functionality for long lists</p>
        
        <div class="demo-grid">
          <tng-select
            label="Country"
            [options]="countryOptions"
            [enableSearch]="true"
            [(value)]="selectedCountry"
            placeholder="Search for a country..."
          ></tng-select>
          
          <div class="value-display">
            Selected: <strong>{{ selectedCountry[0] || 'None' }}</strong>
          </div>
        </div>
        
        <app-code-example [tabs]="searchCode"></app-code-example>
      </div>
      
      <div class="demo-section">
        <h2>Multi-Select</h2>
        <p class="section-description">Select multiple options with checkboxes</p>
        
        <div class="demo-grid">
          <tng-select
            label="Skills"
            [options]="skillOptions"
            [enableMulti]="true"
            [enableSearch]="true"
            [(value)]="selectedSkills"
            placeholder="Select skills"
          ></tng-select>
          
          <div class="value-display">
            Selected: <strong>{{ selectedSkills.join(', ') || 'None' }}</strong>
          </div>
        </div>
        
        <app-code-example [tabs]="multiCode"></app-code-example>
      </div>
      
      <div class="demo-section">
        <h2>Reactive Forms</h2>
        <p class="section-description">Full integration with Angular Reactive Forms</p>
        
        <div class="demo-grid">
          <tng-select
            label="Role"
            [options]="roleOptions"
            [formControl]="roleControl"
            placeholder="Select a role"
          >
        </tng-select>
          
          <div class="value-display">
            Control Value: <strong>{{ roleControl.value || 'None' }}</strong>
            <br>
            Valid: <strong>{{ roleControl.valid }}</strong>
            <br>
            Touched: <strong>{{ roleControl.touched }}</strong>
          </div>
          
          <div class="actions">
            <button class="demo-btn" (click)="roleControl.setValue('admin')">Set Admin</button>
            <button class="demo-btn" (click)="roleControl.reset()">Reset</button>
            <button class="demo-btn" (click)="roleControl.disable()">Disable</button>
            <button class="demo-btn" (click)="roleControl.enable()">Enable</button>
          </div>
        </div>
        
        <app-code-example [tabs]="reactiveCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Groups & Projection</h2>
        <p class="section-description">Support for <code>optgroup</code> and rich HTML content via projection</p>
        
        <div class="demo-grid">
          <tng-select
            label="Categorized Items"
            [(value)]="groupedValue"
            placeholder="Select an item"
            [enableMulti]="true"
            [enableSearch]="true"
          >
            <optgroup label="Fruits">
              <option value="apple" selected>🍎 Apple</option>
              <option value="banana">🍌 Banana</option>
            </optgroup>
            <optgroup label="Vegetables">
              <option value="carrot">🥕 Carrot</option>
              <option value="broccoli">🥦 Broccoli</option>
            </optgroup>
            <option value="other">📦 Other</option>
          </tng-select>
          
          <div class="value-display">
            Selected: <strong>{{ groupedValue[0] || 'None' }}</strong>
          </div>
        </div>
        
        <app-code-example [tabs]="groupedCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Directive Usage</h2>
        <p class="section-description">Use <code>tngSelect</code> directive directly on a native <code>select</code> element</p>
        
        <div class="demo-grid">
          <div class="native-wrapper">
            <label>Native Select with Directive</label>
            <select tngSelect [enableSearch]="true" multiple [enableMulti]="true" [(selectedValues)]="nativeValue">
              <option value="" disabled>Select an option</option>
              <optgroup label="Group 1">
                  <option value="opt1">Option 1</option>
                  <option value="opt2">Option 2</option>
              </optgroup>
              <option value="opt3">Option 3</option>
            </select>
          </div>
          
          <div class="value-display">
            Selected: <strong>{{ nativeValue.join(', ') || 'None' }}</strong>
          </div>
        </div>
        
        <app-code-example [tabs]="directiveCode"></app-code-example>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
      max-width: 800px;
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
    
    .section-description {
      font-size: 0.9rem;
      color: var(--tng-text-secondary, #666);
      margin-bottom: 1.5rem;
    }
    
    .demo-grid {
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .value-display {
      padding: 1rem;
      background: var(--tng-background, #fafafa);
      border: 1px solid var(--tng-border, #e0e0e0);
      border-radius: 4px;
      font-size: 0.9rem;
      color: var(--tng-text, #333);
    }
    
    .actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
    
    .demo-btn {
      padding: 0.5rem 1rem;
      border: 1px solid var(--tng-border, #e0e0e0);
      background: var(--tng-surface, #fff);
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.2s;
    }
    
    .demo-btn:hover {
      background: var(--tng-background, #fafafa);
      border-color: var(--tng-primary, #00f2ff);
    }
    
    .native-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .native-wrapper label {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--tng-text, #333);
    }
  `]
})
export class SelectDemoComponent {
  // Data
  fruitOptions: SelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
    { value: 'elderberry', label: 'Elderberry' }
  ];
  
  countryOptions: SelectOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' },
    { value: 'gb', label: 'United Kingdom' },
    { value: 'fr', label: 'France' },
    { value: 'de', label: 'Germany' },
    { value: 'jp', label: 'Japan' },
    { value: 'cn', label: 'China' },
    { value: 'in', label: 'India' },
    { value: 'br', label: 'Brazil' }
  ];
  
  skillOptions: SelectOption[] = [
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'html', label: 'HTML5' },
    { value: 'css', label: 'CSS3' },
    { value: 'sass', label: 'SASS/SCSS' }
  ];
  
  roleOptions: SelectOption[] = [
    { value: 'admin', label: 'Administrator' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' },
    { value: 'guest', label: 'Guest', disabled: true }
  ];

  // Models
  selectedFruit: any[] = [];
  selectedCountry: any[] = [];
  selectedSkills: any[] = [];
  groupedValue: any[] = [];
  nativeValue: any[] = [];
  
  // Reactive Form
  roleControl = new FormControl('viewer');

  // Code Examples
  basicCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-select
  label="Favorite Fruit"
  [options]="fruitOptions"
  [(value)]="selectedFruit"
  placeholder="Choose a fruit"
></tng-select>`
    },
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  // ...
];
selectedFruit = [];`
    }
  ];

  searchCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-select
  label="Country"
  [options]="countryOptions"
  [enableSearch]="true"
  [(value)]="selectedCountry"
  placeholder="Search for a country..."
></tng-select>`
    }
  ];

  multiCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-select
  label="Skills"
  [options]="skillOptions"
  [enableMulti]="true"
  [enableSearch]="true"
  [(value)]="selectedSkills"
  placeholder="Select skills"
></tng-select>`
    }
  ];

  reactiveCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-select
  label="Role"
  [options]="roleOptions"
  [formControl]="roleControl"
  placeholder="Select a role"
></tng-select>`
    },
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `roleControl = new FormControl('viewer');`
    }
  ];



  groupedCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-select
  label="Categorized Items"
  [(value)]="groupedValue"
  placeholder="Select an item"
>
  <optgroup label="Fruits">
    <option value="apple">🍎 Apple</option>
    <option value="banana">🍌 Banana</option>
  </optgroup>
  <optgroup label="Vegetables">
    <option value="carrot">🥕 Carrot</option>
    <!-- ... -->
  </optgroup>
  <option value="other">📦 Other</option>
</tng-select>`
    }
  ];

  directiveCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<select tngSelect [enableSearch]="true" [(ngModel)]="nativeValue">
  <option value="" disabled selected>Select an option</option>
  <option value="opt1">Option 1</option>
  <option value="opt2">Option 2</option>
  <option value="opt3">Option 3</option>
</select>`
    }
  ];
}

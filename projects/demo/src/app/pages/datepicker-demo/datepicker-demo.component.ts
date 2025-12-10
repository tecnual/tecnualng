import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TecnualDatepickerComponent } from 'tecnualng';
import { CodeExampleComponent, CodeTab } from '../../components/code-example/code-example.component';

@Component({
  selector: 'app-datepicker-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, TecnualDatepickerComponent, CodeExampleComponent],
  template: `
    <div class="page-container">
      <h1>Datepicker Component</h1>
      <p class="subtitle">Beautiful calendar picker with single date and range selection</p>
      
      <div class="demo-section">
        <h2>Single Date Selection</h2>
        <div class="demo-grid">
          <tng-datepicker
            label="Birth Date"
            placeholder="Select a date"
            [ngModel]="birthDate()"
            (ngModelChange)="birthDate.set($event)"
          ></tng-datepicker>
          
          <tng-datepicker
            label="Appointment"
            placeholder="Choose appointment date"
            [ngModel]="appointmentDate()"
            (ngModelChange)="appointmentDate.set($event)"
          ></tng-datepicker>
        </div>
        
        <app-code-example [tabs]="singleDateCode"></app-code-example>
      </div>
      
      <div class="demo-section">
        <h2>Date Range Selection</h2>
        <div class="demo-grid">
          <tng-datepicker
            label="Vacation Range"
            mode="range"
            placeholder="Select range"
            [ngModel]="vacationRange()"
            (ngModelChange)="vacationRange.set($event)"
          ></tng-datepicker>
          
          <tng-datepicker
            label="Project Duration"
            mode="range"
            placeholder="Select project dates"
            [ngModel]="projectRange()"
            (ngModelChange)="projectRange.set($event)"
          ></tng-datepicker>
        </div>
        
        <app-code-example [tabs]="rangeDateCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Internationalization</h2>
        <p>Support for locales and configurable start of the week.</p>
        <div class="demo-grid">
          <tng-datepicker
            label="Spanish (es-ES) - Mon"
            locale="es-ES"
            placeholder="Starts on Monday"
            [ngModel]="localeDate1()"
            (ngModelChange)="localeDate1.set($event)"
          ></tng-datepicker>
          
          <tng-datepicker
            label="US (en-US) - Sun"
            locale="en-US"
            placeholder="Starts on Sunday"
            [ngModel]="localeDate2()"
            (ngModelChange)="localeDate2.set($event)"
          ></tng-datepicker>

          <tng-datepicker
            label="Custom Start (Sunday)"
            [firstDayOfWeek]="0"
            placeholder="Forced Sunday Start"
            [ngModel]="customStart()"
            (ngModelChange)="customStart.set($event)"
          ></tng-datepicker>
        </div>
        
        <app-code-example [tabs]="intlDateCode"></app-code-example>
      </div>
      
      <div class="demo-section">
        <h2>Selected Values</h2>
        <div class="values-display">
          <p><strong>Birth Date:</strong> {{ birthDate() | date:'fullDate' }}</p>
          <p><strong>Appointment:</strong> {{ appointmentDate() | date:'fullDate' }}</p>
          <p><strong>Vacation:</strong> 
            {{ vacationRange().start | date:'mediumDate' }} - 
            {{ vacationRange().end | date:'mediumDate' }}
          </p>
          <p><strong>Project:</strong> 
            {{ projectRange().start | date:'mediumDate' }} - 
            {{ projectRange().end | date:'mediumDate' }}
          </p>
        </div>
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
    
    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .values-display {
      padding: 1.5rem;
      background: var(--tng-background, #fafafa);
      border-radius: var(--tng-border-radius, 4px);
      border: 1px solid var(--tng-border, #e0e0e0);
    }
    
    .values-display p {
      margin: 0.5rem 0;
      color: var(--tng-text, #333);
      font-size: 0.9rem;
    }
    
    .values-display strong {
      color: var(--tng-primary, #6200ee);
    }
  `]
})
export class DatepickerDemoComponent {
  protected birthDate = signal<Date | null>(null);
  protected appointmentDate = signal<Date | null>(null);
  protected vacationRange = signal<{start: Date | null, end: Date | null}>({start: null, end: null});
  protected projectRange = signal<{start: Date | null, end: Date | null}>({start: null, end: null});
  
  // Intl Demo Signals
  protected localeDate1 = signal<Date | null>(null);
  protected localeDate2 = signal<Date | null>(null);
  protected customStart = signal<Date | null>(null);
  
  protected singleDateCode: CodeTab[] = [
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TecnualDatepickerComponent } from 'tecnualng';

@Component({
  selector: 'app-example',
  imports: [FormsModule, TecnualDatepickerComponent],
  template: '...'
})
export class ExampleComponent {
  birthDate = signal<Date | null>(null);
}`
    },
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-datepicker
  label="Birth Date"
  placeholder="Select a date"
  [ngModel]="birthDate()"
  (ngModelChange)="birthDate.set($event)"
></tng-datepicker>`
    }
  ];
  
  protected rangeDateCode: CodeTab[] = [
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TecnualDatepickerComponent } from 'tecnualng';

@Component({
  selector: 'app-example',
  imports: [FormsModule, TecnualDatepickerComponent],
  template: '...'
})
export class ExampleComponent {
  vacationRange = signal<{start: Date | null, end: Date | null}>({
    start: null, 
    end: null
  });
}`
    },
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-datepicker
  label="Vacation Range"
  mode="range"
  placeholder="Select range"
  [ngModel]="vacationRange()"
  (ngModelChange)="vacationRange.set($event)"
></tng-datepicker>`
    }
  ];

  protected intlDateCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<!-- Spanish Locale (starts Monday) -->
<tng-datepicker
  label="Spanish (es-ES)"
  locale="es-ES"
  [ngModel]="date1"
></tng-datepicker>

<!-- US Locale (starts Sunday) -->
<tng-datepicker
  label="US (en-US)"
  locale="en-US"
  [ngModel]="date2"
></tng-datepicker>

<!-- Custom Start Day (0=Sun, 1=Mon, etc) -->
<tng-datepicker
  label="Custom Start (Sunday)"
  [firstDayOfWeek]="0"
  [ngModel]="date3"
></tng-datepicker>`
    },
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `// ... imports

@Component({...})
export class ExampleComponent {
  date1 = signal<Date | null>(null);
  date2 = signal<Date | null>(null);
  date3 = signal<Date | null>(null);
}`
    }
  ];
}

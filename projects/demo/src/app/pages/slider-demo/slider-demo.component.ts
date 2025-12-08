
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { TngSliderComponent, TngCardComponent } from 'tecnualng';
import { CodeExampleComponent, CodeTab } from '../../components/code-example/code-example.component';

@Component({
  selector: 'app-slider-demo',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    TngSliderComponent,
    TngCardComponent,
    CodeExampleComponent
  ],
  template: `
    <div class="demo-container">
      <h1>Slider Component</h1>
      <p class="demo-description">
        A futuristic, interactive slider component with support for signals and reactive forms.
      </p>

      <div class="demo-grid">
        <!-- Basic Usage -->
        <div class="demo-section">
          <tng-card>
            <h2>Basic Usage</h2>
            <div class="demo-content">
              <tng-slider 
                label="Volume Level" 
                [min]="0" 
                [max]="100" 
                [(ngModel)]="volume">
              </tng-slider>
              <p class="value-display">Value: {{ volume() }}</p>
            </div>
          </tng-card>
          <app-code-example [tabs]="basicCode"></app-code-example>
        </div>

        <!-- Reactive Forms -->
        <div class="demo-section">
          <tng-card>
            <h2>Reactive Forms</h2>
            <div class="demo-content">
              <tng-slider 
                label="Brightness" 
                [min]="0" 
                [max]="100" 
                [formControl]="brightnessControl">
              </tng-slider>
              <div class="control-actions">
                <p class="value-display">Control Value: {{ brightnessControl.value }}</p>
                <button (click)="brightnessControl.disable()">Disable</button>
                <button (click)="brightnessControl.enable()">Enable</button>
                <button (click)="brightnessControl.setValue(50)">Set to 50</button>
              </div>
            </div>
          </tng-card>
          <app-code-example [tabs]="reactiveFormCode"></app-code-example>
        </div>

        <!-- Custom Step -->
        <div class="demo-section">
          <tng-card>
            <h2>Custom Step (Step: 10)</h2>
            <div class="demo-content">
              <tng-slider 
                label="Zoom Level" 
                [min]="0" 
                [max]="200" 
                [step]="10"
                [(ngModel)]="zoom">
              </tng-slider>
              <p class="value-display">Value: {{ zoom() }}</p>
            </div>
          </tng-card>
          <app-code-example [tabs]="stepCode"></app-code-example>
        </div>

         <!-- Disabled -->
        <div class="demo-section">
          <tng-card>
            <h2>Disabled State</h2>
            <div class="demo-content">
             <tng-slider 
              label="Disabled Slider" 
              [min]="0" 
              [max]="100" 
              [value]="50"
              [disabled]="true">
            </tng-slider>
            </div>
          </tng-card>
          <app-code-example [tabs]="disabledCode"></app-code-example>
        </div>

        <!-- Vertical Orientation -->
        <div class="demo-section">
          <tng-card>
            <h2>Vertical Orientation</h2>
            <div class="demo-content vertical-demo">
              <div class="vertical-slider-container">
                <tng-slider 
                  orientation="vertical"
                  [min]="0" 
                  [max]="100" 
                  [(ngModel)]="verticalValue"
                  label="Vertical">
                </tng-slider>
              </div>
              <p class="value-display">Value: {{ verticalValue() }}</p>
            </div>
          </tng-card>
          <app-code-example [tabs]="verticalCode"></app-code-example>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      background: linear-gradient(90deg, #60a5fa, #a78bfa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .demo-description {
      color: #94a3b8;
      margin-bottom: 2rem;
      font-size: 1.1rem;
    }
    
    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(600px, 1fr)); /* Wider col for code */
      gap: 2rem;
    }

    .demo-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .demo-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 1rem 0;
    }

    .vertical-demo {
      align-items: center;
    }

    .vertical-slider-container {
        height: 300px;
        width: 100px;
        display: flex;
        justify-content: center;
    }
    
    .value-display {
      font-family: monospace;
      color: #94a3b8;
      background: rgba(255, 255, 255, 0.05);
      padding: 0.5rem;
      border-radius: 4px;
      margin-top: 0.5rem;
    }

    .control-actions {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-top: 1rem;

      button {
        padding: 0.5rem 1rem;
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.05);
        color: white;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }
  `]
})
export class SliderDemoComponent {
  volume = signal(35);
  zoom = signal(100);
  verticalValue = signal(50);
  
  brightnessControl = new FormControl(75);

  basicCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-slider 
  label="Volume Level" 
  [min]="0" 
  [max]="100" 
  [(ngModel)]="volume">
</tng-slider>
<p>Value: {{ volume() }}</p>`
    },
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `import { Component, signal } from '@angular/core';

@Component({ ... })
export class ExampleComponent {
  volume = signal(35);
}`
    }
  ];

  reactiveFormCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-slider 
  label="Brightness" 
  [min]="0" 
  [max]="100" 
  [formControl]="brightnessControl">
</tng-slider>`
    },
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `import { FormControl } from '@angular/forms';

export class ExampleComponent {
  brightnessControl = new FormControl(75);
}`
    }
  ];

  stepCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-slider 
  label="Zoom Level" 
  [min]="0" 
  [max]="200" 
  [step]="10"
  [(ngModel)]="zoom">
</tng-slider>`
    }
  ];

  disabledCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-slider 
  label="Disabled Slider" 
  [min]="0" 
  [max]="100" 
  [value]="50"
  [disabled]="true">
</tng-slider>`
    }
  ];

  verticalCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<div style="height: 300px;">
  <tng-slider 
    orientation="vertical"
    [min]="0" 
    [max]="100" 
    [(ngModel)]="verticalValue"
    label="Vertical">
  </tng-slider>
</div>`
    }
  ];
}

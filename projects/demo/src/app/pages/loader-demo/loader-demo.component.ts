import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TngLoaderComponent, TngCardComponent, TngButton } from 'tecnualng';
import { CodeExampleComponent, CodeTab } from '../../components/code-example/code-example.component';

@Component({
  selector: 'app-loader-demo',
  standalone: true,
  imports: [
    CommonModule,
    TngLoaderComponent,
    TngCardComponent,
    TngButton,
    CodeExampleComponent
  ],
  templateUrl: './loader-demo.component.html',
  styleUrls: ['./loader-demo.component.scss']
})
export class LoaderDemoComponent {
  fullscreenLoading = signal(false);
  progress = signal(0);
  intervalId: any;

  toggleFullscreen() {
    this.fullscreenLoading.set(true);
    setTimeout(() => {
      this.fullscreenLoading.set(false);
    }, 3000);
  }

  startProgress() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.progress.set(0);
    this.intervalId = setInterval(() => {
      this.progress.update(p => {
        if (p >= 100) {
          clearInterval(this.intervalId);
          return 100;
        }
        return p + 10;
      });
    }, 500);
  }

  // --- Code Examples ---

  protected spinnerCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-loader type="spinner" size="sm"></tng-loader>
<tng-loader type="spinner" size="md"></tng-loader>
<tng-loader type="spinner" size="lg"></tng-loader>
<tng-loader type="spinner" size="xl" color="accent"></tng-loader>`
    }
  ];

  protected barCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<!-- Indeterminate -->
<tng-loader type="bar" color="primary"></tng-loader>

<!-- Determinate -->
<tng-loader type="bar" [progress]="progress()" color="accent"></tng-loader>`
    }
  ];

  protected dotsCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-loader type="dots" size="sm" color="primary"></tng-loader>
<tng-loader type="dots" size="md" color="secondary"></tng-loader>
<tng-loader type="dots" size="lg" color="warn"></tng-loader>`
    }
  ];

  protected pulseCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-loader type="pulse" size="md" color="accent"></tng-loader>
<tng-loader type="pulse" size="lg" color="primary"></tng-loader>`
    }
  ];

  protected labelCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-loader type="spinner" label="Loading data..."></tng-loader>
<tng-loader type="dots" label="Please wait"></tng-loader>`
    }
  ];
}

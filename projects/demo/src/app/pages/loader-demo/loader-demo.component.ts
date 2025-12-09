import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TngLoaderComponent, TngCardComponent, TngButton } from 'tecnualng';

@Component({
  selector: 'app-loader-demo',
  standalone: true,
  imports: [
    CommonModule,
    TngLoaderComponent,
    TngCardComponent,
    TngButton
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
}

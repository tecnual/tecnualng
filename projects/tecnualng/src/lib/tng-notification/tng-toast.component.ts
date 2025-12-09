import { Component, input, output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TngNotificationConfig } from './tng-notification.types';
import { TngNotificationService } from './tng-notification.service';

@Component({
  selector: 'tng-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tng-toast.component.html',
  styleUrl: './tng-toast.component.scss'
})
export class TngToastComponent {
  config = input.required<TngNotificationConfig>();
  
  private service = inject(TngNotificationService);

  onMouseEnter() {
    this.service.pauseTimer(this.config().id);
  }

  onMouseLeave() {
    this.service.resumeTimer(this.config().id);
  }

  close() {
    this.service.remove(this.config().id);
  }

  // Copied tooltip state
  showCopiedTooltip = signal(false);

  copyToClipboard() {
    const text = this.config().clipboard;
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        // Show tooltip
        this.showCopiedTooltip.set(true);
        console.log('Copied to clipboard');

        // Hide after 4 seconds
        setTimeout(() => {
          this.showCopiedTooltip.set(false);
        }, 4000);
      });
    }
  }

  get iconClass(): string {
    const type = this.config().type;
    const customIcon = this.config().icon;

    if (customIcon) return customIcon;

    switch (type) {
      case 'success': return 'fa fa-check-circle';
      case 'error': return 'fa fa-exclamation-circle';
      case 'warning': return 'fa fa-exclamation-triangle';
      case 'info': return 'fa fa-info-circle';
      default: return 'fa fa-bell';
    }
  }
}

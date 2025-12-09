import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TngNotificationService } from './tng-notification.service';
import { TngToastComponent } from './tng-toast.component';

@Component({
  selector: 'tng-notification-container',
  standalone: true,
  imports: [CommonModule, TngToastComponent],
  templateUrl: './tng-notification-container.component.html',
  styleUrl: './tng-notification-container.component.scss'
})
export class TngNotificationContainerComponent {
  private service = inject(TngNotificationService);
  notifications = this.service.activeNotifications;

  topLeft = computed(() => this.notifications().filter(n => n.position === 'top-left'));
  topRight = computed(() => this.notifications().filter(n => n.position === 'top-right' || !n.position));
  topCenter = computed(() => this.notifications().filter(n => n.position === 'top-center'));
  bottomLeft = computed(() => this.notifications().filter(n => n.position === 'bottom-left'));
  bottomRight = computed(() => this.notifications().filter(n => n.position === 'bottom-right'));
  bottomCenter = computed(() => this.notifications().filter(n => n.position === 'bottom-center'));
}

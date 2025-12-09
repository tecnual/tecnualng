import { Injectable, signal, computed } from '@angular/core';
import { TngNotificationConfig, TngNotificationOptions, TngNotificationType } from './tng-notification.types';

@Injectable({
  providedIn: 'root'
})
export class TngNotificationService {
  private notifications = signal<TngNotificationConfig[]>([]);
  private timers: Map<string, any> = new Map();
  private remainingTimes: Map<string, number> = new Map();
  private startTimes: Map<string, number> = new Map();

  readonly activeNotifications = this.notifications.asReadonly();

  show(message: string, options: Partial<TngNotificationConfig> = {}): string {
    const id = options.id || this.generateId();
    const duration = options.duration ?? 3000;
    
    const config: TngNotificationConfig = {
      id,
      message,
      type: options.type || 'default',
      position: options.position || 'top-right',
      duration,
      clipboard: options.clipboard,
      closable: options.closable ?? true,
      icon: options.icon,
      pauseOnHover: options.pauseOnHover ?? true,
    };

    this.notifications.update(current => [...current, config]);

    if (duration > 0) {
      this.startTimer(id, duration);
    }

    return id;
  }

  success(message: string, options?: TngNotificationOptions) {
    return this.show(message, { ...options, type: 'success' });
  }

  error(message: string, options?: TngNotificationOptions) {
    return this.show(message, { ...options, type: 'error' });
  }

  warning(message: string, options?: TngNotificationOptions) {
    return this.show(message, { ...options, type: 'warning' });
  }

  info(message: string, options?: TngNotificationOptions) {
    return this.show(message, { ...options, type: 'info' });
  }

  remove(id: string) {
    this.clearTimer(id);
    this.notifications.update(current => current.filter(n => n.id !== id));
  }

  clear() {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();
    this.remainingTimes.clear();
    this.startTimes.clear();
    this.notifications.set([]);
  }

  pauseTimer(id: string) {
    const notification = this.notifications().find(n => n.id === id);
    if (!notification?.pauseOnHover || !this.timers.has(id)) return;

    clearTimeout(this.timers.get(id));
    this.timers.delete(id);

    const elapsed = Date.now() - (this.startTimes.get(id) || 0);
    const duration = notification.duration || 3000;
    const remaining = this.remainingTimes.has(id) 
      ? this.remainingTimes.get(id)! - elapsed 
      : duration - elapsed;
    
    this.remainingTimes.set(id, remaining > 0 ? remaining : 0);
  }

  resumeTimer(id: string) {
    const notification = this.notifications().find(n => n.id === id);
    if (!notification?.pauseOnHover || !this.remainingTimes.has(id)) return;

    const remaining = this.remainingTimes.get(id) || 0;
    if (remaining > 0) {
      this.startTimer(id, remaining);
    } else {
      this.remove(id);
    }
  }

  private startTimer(id: string, duration: number) {
    this.startTimes.set(id, Date.now());
    const timerId = setTimeout(() => {
      this.remove(id);
    }, duration);
    this.timers.set(id, timerId);
  }

  private clearTimer(id: string) {
    if (this.timers.has(id)) {
      clearTimeout(this.timers.get(id));
      this.timers.delete(id);
    }
    this.remainingTimes.delete(id);
    this.startTimes.delete(id);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}

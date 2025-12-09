import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  TngButton, 
  TngCardComponent, 
  TngNotificationService 
} from 'tecnualng';
import { CodeExampleComponent, CodeTab } from '../../components/code-example/code-example.component';

@Component({
  selector: 'app-notification-demo',
  standalone: true,
  imports: [CommonModule, TngButton, TngCardComponent, CodeExampleComponent],
  templateUrl: './notification-demo.component.html',
  styleUrl: './notification-demo.component.scss'
})
export class NotificationDemoComponent {
  private notificationService = inject(TngNotificationService);

  showSuccess() {
    this.notificationService.success('Action completed successfully!', {
      position: 'top-right'
    });
  }

  showError() {
    this.notificationService.error('An error occurred during the process.', {
      position: 'top-right'
    });
  }

  showWarning() {
    this.notificationService.warning('Please review your inputs.', {
      position: 'top-center'
    });
  }

  showInfo() {
    this.notificationService.info('New updates are available.', {
      position: 'bottom-left'
    });
  }

  showWithClipboard() {
    this.notificationService.show('Here is your API Key: xyz-123', {
      type: 'default',
      position: 'bottom-right',
      clipboard: 'xyz-123',
      duration: 5000
    });
  }

  showCustomPosition(position: any) {
    this.notificationService.show(`Notification at ${position}`, {
      position,
      type: 'info'
    });
  }

  // --- Code Examples ---

  protected usageCode: CodeTab[] = [
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `import { Component, inject } from '@angular/core';
import { TngNotificationService } from 'tecnualng';

@Component({...})
export class MyComponent {
  private ns = inject(TngNotificationService);

  showSuccess() {
    this.ns.success('Saved successfully!', {
      position: 'top-right'
    });
  }
}`
    },
    {
        label: 'App HTML',
        language: 'html',
        code: `<!-- Add to your app root template -->
<tng-notification-container></tng-notification-container>`
    }
  ];

  protected clipboardCode: CodeTab[] = [
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `this.ns.show('Here is your API Key: xyz-123', {
  clipboard: 'xyz-123',
  position: 'bottom-right',
  duration: 5000
});`
    }
  ];
}

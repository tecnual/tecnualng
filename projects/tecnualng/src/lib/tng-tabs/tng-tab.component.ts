import { ChangeDetectionStrategy, Component, input, TemplateRef, viewChild } from '@angular/core';

@Component({
  selector: 'tng-tab',
  standalone: true,
  imports: [],
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TngTabComponent {
  label = input.required<string>();
  
  // We use a template to lazy load the content or just to hold the reference
  content = viewChild.required(TemplateRef);
}

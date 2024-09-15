import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TngBreadcrumbsComponent } from '../../../tng-breadcrumbs/src/lib/tng-breadcrumbs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TngBreadcrumbsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo';
}

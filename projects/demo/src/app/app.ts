import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import { 
  TngButton, 
  TngToolbarComponent,
  TngMenuComponent,
  TngMenuItemComponent,
  TngMenuGroupComponent 
} from 'tecnualng';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    ThemeSelectorComponent,
    TngToolbarComponent,
    TngButton,
    TngMenuComponent,
    TngMenuItemComponent,
    TngMenuGroupComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('demo');
  
  // Sidebar states
  protected leftSidebarOpen = signal(true);
  protected rightSidebarOpen = signal(false);
  
  // Theme state
  protected isDarkTheme = signal(false);

  toggleLeftSidebar() {
    this.leftSidebarOpen.update(v => !v);
  }

  toggleRightSidebar() {
    this.rightSidebarOpen.update(v => !v);
  }
  
  toggleTheme() {
    this.isDarkTheme.update(v => !v);
    if (this.isDarkTheme()) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}

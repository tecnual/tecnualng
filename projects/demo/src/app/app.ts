import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('demo');
  
  // Sidebar states
  protected leftSidebarOpen = signal(true);
  protected rightSidebarOpen = signal(false);

  toggleLeftSidebar() {
    this.leftSidebarOpen.update(v => !v);
  }

  toggleRightSidebar() {
    this.rightSidebarOpen.update(v => !v);
  }
}

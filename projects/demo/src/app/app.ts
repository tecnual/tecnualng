import { Component, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import { 
  TngButton, 
  TngToolbarComponent,
  TngMenuComponent,
  TngMenuItemComponent,
  TngMenuGroupComponent, 
  TngSidebarComponent,
  TngNotificationContainerComponent
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
    TngMenuGroupComponent,
    TngSidebarComponent,
    TngNotificationContainerComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('demo');
  
  // Referencias a los sidebars
  leftSidebar = viewChild<TngSidebarComponent>('leftSidebar');
  rightSidebar = viewChild<TngSidebarComponent>('rightSidebar');

  // Estado de los ejemplos
  leftSidebarOpen = signal(false);
  rightSidebarOpen = signal(false);

  /**
   * Abre el sidebar izquierdo
   */
  openLeftSidebar(): void {
    this.leftSidebar()?.open();
  }

  /**
   * Abre el sidebar derecho
   */
  openRightSidebar(): void {
    this.rightSidebar()?.open();
  }

  /**
   * Maneja el evento apertura y cierre del sidebar izquierdo
   */
  toggleLeftSidebar(): void {
    if(this.leftSidebarOpen()) {
      this.leftSidebar()?.close();
    } else {
      this.leftSidebar()?.open();
    }
  }
  /**
   * Maneja el evento de apertura del sidebar izquierdo
   */
  onLeftSidebarOpened(): void {
    this.leftSidebarOpen.set(true);
    console.log('Sidebar izquierdo abierto');
  }

  /**
   * Maneja el evento de cierre del sidebar izquierdo
   */
  onLeftSidebarClosed(): void {
    this.leftSidebarOpen.set(false);
    console.log('Sidebar izquierdo cerrado');
  }

  /**
   * Maneja el evento de apertura del sidebar derecho
   */
  onRightSidebarOpened(): void {
    this.rightSidebarOpen.set(true);
    console.log('Sidebar derecho abierto');
  }

  /**
   * Maneja el evento de cierre del sidebar derecho
   */
  onRightSidebarClosed(): void {
    this.rightSidebarOpen.set(false);
    console.log('Sidebar derecho cerrado');
  }

  /**
   * Cierra el sidebar izquierdo cuando se hace clic en un elemento del menú
   */
  closeLeftSidebar(): void {
    this.leftSidebar()?.close();
  }
}

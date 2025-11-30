import { Component, signal, viewChild } from '@angular/core';
import { TngSidebarComponent } from 'tecnualng';

/**
 * Página de demostración del componente TngSidebar
 */
@Component({
  selector: 'app-sidebar-demo',
  standalone: true,
  imports: [TngSidebarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
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
}

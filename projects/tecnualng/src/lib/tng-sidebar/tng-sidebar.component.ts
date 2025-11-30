import { Component, signal, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * TngSidebar - Componente moderno de barra lateral
 * 
 * Características:
 * - Totalmente basado en Signals
 * - Animaciones CSS puras
 * - Posicionamiento configurable (izquierda/derecha)
 * - Proyección de contenido
 * - Responsive y accesible
 */
@Component({
  selector: 'tng-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tng-sidebar.component.html',
  styleUrl: './tng-sidebar.component.scss'
})
export class TngSidebarComponent {
  /**
   * Controla si el sidebar está abierto o cerrado
   */
  isOpen = signal<boolean>(false);

  /**
   * Posición del sidebar: 'left' o 'right'
   */
  position = input<'left' | 'right'>('left');

  /**
   * Ancho del sidebar en píxeles
   */
  width = input<number>(280);

  /**
   * Muestra un overlay de fondo cuando está abierto
   */
  showOverlay = input<boolean>(true);

  /**
   * Evento emitido cuando el sidebar se cierra
   */
  closed = output<void>();

  /**
   * Evento emitido cuando el sidebar se abre
   */
  opened = output<void>();

  /**
   * Alterna el estado del sidebar
   */
  toggle(): void {
    this.isOpen.set(!this.isOpen());
    
    if (this.isOpen()) {
      this.opened.emit();
    } else {
      this.closed.emit();
    }
  }

  /**
   * Abre el sidebar
   */
  open(): void {
    if (!this.isOpen()) {
      this.isOpen.set(true);
      this.opened.emit();
    }
  }

  /**
   * Cierra el sidebar
   */
  close(): void {
    if (this.isOpen()) {
      this.isOpen.set(false);
      this.closed.emit();
    }
  }

  /**
   * Maneja el clic en el overlay para cerrar el sidebar
   */
  handleOverlayClick(): void {
    this.close();
  }
}

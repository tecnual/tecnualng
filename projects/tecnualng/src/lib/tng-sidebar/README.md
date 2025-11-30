# TngSidebar Component

Componente moderno de barra lateral (sidebar) totalmente compatible con **Angular 20+**.

## ✨ Características

- ✅ **Basado en Signals**: Utiliza la nueva API de Signals de Angular
- ✅ **Animaciones CSS puras**: Sin dependencias de Angular Animations
- ✅ **Posicionamiento configurable**: Izquierda o derecha
- ✅ **Proyección de contenido**: Usa `<ng-content>` para máxima flexibilidad
- ✅ **Responsive**: Adaptado para dispositivos móviles
- ✅ **Overlay opcional**: Fondo oscuro cuando está abierto
- ✅ **Eventos**: `opened` y `closed` para reaccionar a cambios de estado
- ✅ **Accesible**: Atributos ARIA incluidos
- ✅ **Tema oscuro**: Soporte automático para `prefers-color-scheme: dark`

## 📦 Instalación

```bash
npm install tecnualng
```

## 🚀 Uso Básico

### 1. Importar el componente

```typescript
import { Component, viewChild } from '@angular/core';
import { TngSidebarComponent } from 'tecnualng';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TngSidebarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  sidebar = viewChild<TngSidebarComponent>('sidebar');

  openSidebar() {
    this.sidebar()?.open();
  }
}
```

### 2. Usar en el template

```html
<!-- Sidebar -->
<tng-sidebar
  #sidebar
  [position]="'left'"
  [width]="280"
  [showOverlay]="true"
  (opened)="onSidebarOpened()"
  (closed)="onSidebarClosed()"
>
  <h2>Mi Sidebar</h2>
  <nav>
    <ul>
      <li>Inicio</li>
      <li>Perfil</li>
      <li>Configuración</li>
    </ul>
  </nav>
</tng-sidebar>

<!-- Botón para abrir -->
<button (click)="sidebar.open()">Abrir Sidebar</button>
```

## 🎛️ API

### Inputs

| Input         | Tipo                | Default  | Descripción                                     |
| ------------- | ------------------- | -------- | ----------------------------------------------- |
| `position`    | `'left' \| 'right'` | `'left'` | Posición del sidebar en la pantalla             |
| `width`       | `number`            | `280`    | Ancho del sidebar en píxeles                    |
| `showOverlay` | `boolean`           | `true`   | Muestra un overlay de fondo cuando está abierto |

### Outputs

| Output   | Tipo   | Descripción                         |
| -------- | ------ | ----------------------------------- |
| `opened` | `void` | Emitido cuando el sidebar se abre   |
| `closed` | `void` | Emitido cuando el sidebar se cierra |

### Métodos Públicos

| Método     | Descripción                     |
| ---------- | ------------------------------- |
| `open()`   | Abre el sidebar                 |
| `close()`  | Cierra el sidebar               |
| `toggle()` | Alterna entre abierto y cerrado |

### Signals

| Signal   | Tipo              | Descripción                                 |
| -------- | ----------------- | ------------------------------------------- |
| `isOpen` | `signal<boolean>` | Estado actual del sidebar (abierto/cerrado) |

## 💡 Ejemplos Avanzados

### Sidebar con menú de navegación

```html
<tng-sidebar #navSidebar [position]="'left'" [width]="300">
  <div class="sidebar-header">
    <h2>Navegación</h2>
    <button (click)="navSidebar.close()">×</button>
  </div>

  <nav class="sidebar-nav">
    <a routerLink="/home"> <i class="fa fa-home"></i> Inicio </a>
    <a routerLink="/profile"> <i class="fa fa-user"></i> Perfil </a>
    <a routerLink="/settings"> <i class="fa fa-cog"></i> Configuración </a>
  </nav>
</tng-sidebar>
```

### Sidebar derecho con información

```html
<tng-sidebar #infoSidebar [position]="'right'" [width]="350">
  <div class="info-panel">
    <h3>Detalles</h3>
    <p>Información adicional sobre el elemento seleccionado.</p>

    <div class="actions">
      <button class="btn-primary">Guardar</button>
      <button class="btn-secondary" (click)="infoSidebar.close()">Cancelar</button>
    </div>
  </div>
</tng-sidebar>
```

### Control programático con Signals

```typescript
import { Component, signal, viewChild } from '@angular/core';
import { TngSidebarComponent } from 'tecnualng';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TngSidebarComponent],
  template: `
    <tng-sidebar
      #sidebar
      [position]="sidebarPosition()"
      [width]="sidebarWidth()"
      (opened)="handleOpened()"
      (closed)="handleClosed()"
    >
      <p>Contenido dinámico</p>
    </tng-sidebar>

    <button (click)="toggleSidebar()">Toggle</button>
    <button (click)="changeSide()">Cambiar lado</button>
  `,
})
export class DashboardComponent {
  sidebar = viewChild<TngSidebarComponent>('sidebar');

  sidebarPosition = signal<'left' | 'right'>('left');
  sidebarWidth = signal(280);

  toggleSidebar() {
    this.sidebar()?.toggle();
  }

  changeSide() {
    const current = this.sidebarPosition();
    this.sidebarPosition.set(current === 'left' ? 'right' : 'left');
  }

  handleOpened() {
    console.log('Sidebar abierto');
  }

  handleClosed() {
    console.log('Sidebar cerrado');
  }
}
```

## 🎨 Personalización de Estilos

El componente utiliza variables CSS que puedes sobrescribir:

```scss
tng-sidebar {
  --sidebar-bg: #ffffff;
  --sidebar-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  --overlay-bg: rgba(0, 0, 0, 0.5);
  --transition-duration: 0.3s;
}

// Tema oscuro personalizado
@media (prefers-color-scheme: dark) {
  tng-sidebar {
    --sidebar-bg: #1e1e1e;
    --sidebar-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    --overlay-bg: rgba(0, 0, 0, 0.7);
  }
}
```

## 📱 Responsive

El componente es responsive por defecto. En dispositivos móviles (< 768px):

- El ancho máximo es 85vw
- El padding interno se reduce
- Las animaciones se mantienen fluidas

## ♿ Accesibilidad

- Usa `role="complementary"` para semántica correcta
- Incluye `aria-hidden` cuando está cerrado
- Compatible con navegación por teclado
- El overlay puede cerrarse haciendo clic fuera

## 🔧 Compatibilidad

- **Angular**: 20+
- **TypeScript**: 5.7+
- **Navegadores**: Todos los navegadores modernos

## 📄 Licencia

MIT

---

**Desarrollado con ❤️ por Tecnual**

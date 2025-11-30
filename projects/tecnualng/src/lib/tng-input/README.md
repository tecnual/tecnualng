# TngInput - Directiva y Componente

El sistema de inputs de TecnualNG ahora ofrece dos formas de uso:

## 1. Componente Tradicional (tng-input)

El componente original que encapsula todo el input con su diseño:

```typescript
import { TecnualInputComponent } from 'tecnualng';

@Component({
  imports: [TecnualInputComponent, FormsModule]
})
```

```html
<tng-input label="Username" placeholder="Enter your username" [(ngModel)]="username"></tng-input>
```

## 2. Directiva (tngInput) con tng-form-field

**Nuevo!** Usa la directiva `tngInput` en elementos `<input>` nativos de HTML, envueltos en `tng-form-field`:

```typescript
import { TngInputDirective, TngFormFieldComponent } from 'tecnualng';

@Component({
  imports: [TngInputDirective, TngFormFieldComponent, FormsModule]
})
```

```html
<tng-form-field label="Username">
  <input tngInput placeholder="Enter your username" [(ngModel)]="username" />
</tng-form-field>
```

### Ventajas de la Directiva

1. **Mayor flexibilidad**: Acceso completo a todos los atributos nativos de HTML input
2. **Mejor integración**: Funciona perfectamente con formularios reactivos y template-driven
3. **Más control**: Puedes aplicar validaciones HTML5 nativas directamente
4. **Compatibilidad**: Funciona con cualquier tipo de input (text, email, tel, number, etc.)

### Ejemplos

#### Input de Email con validación HTML5

```html
<tng-form-field label="Email">
  <input
    tngInput
    type="email"
    required
    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
    [(ngModel)]="email"
  />
</tng-form-field>
```

#### Input de Teléfono

```html
<tng-form-field label="Phone">
  <input tngInput type="tel" placeholder="+1 (555) 000-0000" [(ngModel)]="phone" />
</tng-form-field>
```

#### Input con Reactive Forms

```typescript
import { FormControl, ReactiveFormsModule } from '@angular/forms';

export class MyComponent {
  nameControl = new FormControl('');
}
```

```html
<tng-form-field label="Name">
  <input tngInput [formControl]="nameControl" />
</tng-form-field>
```

## Características

Ambas implementaciones incluyen:

- ✨ Label flotante animado
- 🎨 Diseño Material Design
- 🎯 Estados de focus y hover
- ♿ Accesibilidad completa
- 🌈 Soporte para temas
- 📱 Diseño responsive

## API

### TngFormFieldComponent

| Input   | Tipo     | Default | Descripción        |
| ------- | -------- | ------- | ------------------ |
| `label` | `string` | `''`    | Etiqueta del campo |

### TngInputDirective

| Input         | Tipo      | Default | Descripción          |
| ------------- | --------- | ------- | -------------------- |
| `disabled`    | `boolean` | `false` | Deshabilita el input |
| `placeholder` | `string`  | `''`    | Texto placeholder    |

Además, todos los atributos nativos de `<input>` están disponibles (type, required, pattern, min, max, etc.)

## Migración

Si estás usando `tng-input` y quieres migrar a la directiva:

**Antes:**

```html
<tng-input label="Email" type="email" placeholder="your@email.com" [(ngModel)]="email"></tng-input>
```

**Después:**

```html
<tng-form-field label="Email">
  <input tngInput type="email" placeholder="your@email.com" [(ngModel)]="email" />
</tng-form-field>
```

## Notas

- El componente `tng-input` seguirá siendo soportado para compatibilidad hacia atrás
- La directiva `tngInput` es la forma recomendada para nuevos desarrollos
- Ambas implementaciones comparten los mismos estilos y comportamiento visual

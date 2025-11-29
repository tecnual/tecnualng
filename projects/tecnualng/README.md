# TecnualNG

TecnualNG is a modern Angular UI component library designed to provide reusable, customizable, and well‑structured components for building professional web applications. It aims to accelerate development by offering consistent, accessible, and theme‑friendly UI elements that integrate seamlessly into any Angular project.

---

## 🚀 Purpose of the Library

TecnualNG was created to:

- Offer a robust collection of reusable Angular components.
- Standardize the visual and functional design of Angular applications.
- Reduce development time by avoiding repetitive UI implementation.
- Serve as a scalable base for internal and external Angular projects.
- Provide a live demo application where all components can be previewed.

---

## 📦 Installation

Install the library from **npm**:

```bash
npm install tecnualng
```

Or with **pnpm**:

```bash
pnpm add tecnualng
```

---

## 🛠 Development Requirements

To use TecnualNG:

- **Node.js 20+**
- **Angular 21+** (fully compatible with Angular 21)
- **TypeScript 5+**

To contribute to the project:

- Git
- npm or pnpm
- Angular CLI

---

## 🔧 Getting Started in Your Angular Project

### 1. Install the library

```bash
pnpm add tecnualng
```

### 2. Import a component

Each component can be imported individually to keep your bundle small.

```ts
import { TnButtonComponent } from 'tecnualng';
```

### 3. Use it in a template

```html
<tn-button label="Accept" (click)="onClick()"></tn-button>
```

### 4. Apply styling or theming

TecnualNG supports flexible styling with theme‑ready architecture.

---

## 📁 Project Structure

The repository consists of the library source code and a demo application used for showcasing the components.

```
tecnualng/
│
├── projects/
│   ├── tecnualng/        → Main library source code
│   └── demo/             → Demo Angular application
│
├── dist/                 → Build output
├── angular.json          → Angular workspace configuration
├── package.json
└── README.md
```

### 📦 Library (`projects/tecnualng`)

- Components
- Modules
- Services
- Styles and configuration

### 🎨 Demo (`projects/demo`)

- Component examples
- Navigation and layout
- Real usage scenarios

---

## 🧪 Running the Project in Development Mode

Install dependencies:

```bash
pnpm install
```

Build the library in watch mode:

```bash
ng build tecnualng --watch
```

Run the demo application:

```bash
ng serve demo
```

Open in the browser:

```
http://localhost:4200/
```

---

## 🚀 Publishing the Library

To publish manually:

```bash
npm publish dist/tecnualng
```

This repository includes GitHub Actions workflows for:

- Publishing automatically to **npm** when a version tag is pushed
- Generating an automatic **changelog**
- Deploying the demo application to **GitHub Pages**

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch using Git Flow:
   ```bash
   git flow feature start feature-name
   ```
3. Follow **Conventional Commits**:

   - `feat:` new features
   - `fix:` bug fixes
   - `docs:` documentation updates
   - `refactor:` internal improvements
   - `chore:` maintenance tasks

4. Add tests where applicable.
5. Open a Pull Request to the **develop** branch.

### 📝 Contribution Guidelines

- Follow Angular best practices.
- Use strict TypeScript typing.
- Avoid unnecessary dependencies.
- Validate your changes in the demo application before submitting a PR.

---

## 📄 License

TecnualNG is released under the **Hippocratic License** — free for personal and commercial projects.

---

## 🌐 Online Demo

A hosted demo will be available on GitHub Pages:

```
https://tecnual.github.io/tecnualng/
```

---

If you’d like to include advanced examples, screenshots, a full component list, or FAQs, let me know and I’ll expand the README.

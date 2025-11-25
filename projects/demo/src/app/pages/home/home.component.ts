import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="page-container">
      <h1>Welcome to TecnualNG</h1>
      <p class="subtitle">A modern Angular component library</p>
      
      <div class="features">
        <div class="feature-card">
          <span class="material-icons">widgets</span>
          <h3>Rich Components</h3>
          <p>Beautiful, accessible components built with Angular signals</p>
        </div>
        
        <div class="feature-card">
          <span class="material-icons">palette</span>
          <h3>Themeable</h3>
          <p>Customize colors and styles with CSS variables</p>
        </div>
        
        <div class="feature-card">
          <span class="material-icons">speed</span>
          <h3>Performant</h3>
          <p>Optimized for speed with modern Angular features</p>
        </div>
      </div>
      
      <div class="getting-started">
        <h2>Getting Started</h2>
        <p>Explore the components using the sidebar navigation.</p>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: var(--tng-text, #333);
    }
    
    .subtitle {
      font-size: 1.25rem;
      color: var(--tng-text-secondary, #666);
      margin-bottom: 3rem;
    }
    
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }
    
    .feature-card {
      padding: 2rem;
      border-radius: var(--tng-border-radius, 4px);
      background: var(--tng-surface, #fff);
      border: 1px solid var(--tng-border, #e0e0e0);
      text-align: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .feature-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--tng-shadow-md, 0 4px 8px rgba(0,0,0,0.12));
    }
    
    .feature-card .material-icons {
      font-size: 48px;
      color: var(--tng-primary, #6200ee);
      margin-bottom: 1rem;
    }
    
    .feature-card h3 {
      margin-bottom: 0.5rem;
      color: var(--tng-text, #333);
    }
    
    .feature-card p {
      color: var(--tng-text-secondary, #666);
      font-size: 0.9rem;
    }
    
    .getting-started {
      margin-top: 3rem;
      padding: 2rem;
      background: var(--tng-background, #fafafa);
      border-radius: var(--tng-border-radius, 4px);
    }
    
    .getting-started h2 {
      margin-bottom: 1rem;
      color: var(--tng-text, #333);
    }
    
    .getting-started p {
      color: var(--tng-text-secondary, #666);
    }
  `]
})
export class HomeComponent {}

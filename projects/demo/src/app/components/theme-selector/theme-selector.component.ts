import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeName } from 'tecnualng';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="theme-selector">
      <button 
        class="theme-selector-trigger"
        (click)="isOpen.set(!isOpen())"
        aria-label="Select theme"
      >
        <i class="fa fa-palette"></i>
        <span class="theme-name">{{ getCurrentThemeName() }}</span>
        <i [class]="isOpen() ? 'fa fa-chevron-up' : 'fa fa-chevron-down'"></i>
      </button>
      
      <div class="theme-dropdown" *ngIf="isOpen()" (click)="$event.stopPropagation()">
        <div class="theme-grid">
          <button
            *ngFor="let theme of themeService.themes"
            class="theme-option"
            [class.active]="themeService.currentTheme() === theme.name"
            (click)="selectTheme(theme.name)"
          >
            <div class="theme-preview" [style.background]="theme.primaryColor"></div>
            <div class="theme-info">
              <div class="theme-title">{{ theme.displayName }}</div>
              <div class="theme-desc">{{ theme.description }}</div>
            </div>
            <i class="fa fa-check-circle check" *ngIf="themeService.currentTheme() === theme.name"></i>
          </button>
        </div>
      </div>
    </div>
    
    <div class="theme-overlay" *ngIf="isOpen()" (click)="isOpen.set(false)"></div>
  `,
  styles: [`
    .theme-selector {
      position: relative;
    }
    
    .theme-selector-trigger {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: var(--tng-surface);
      border: 1px solid var(--tng-border);
      border-radius: var(--tng-border-radius);
      color: var(--tng-text);
      cursor: pointer;
      transition: all 0.2s;
      font-family: var(--tng-font-family);
      font-size: var(--tng-font-size-base);
      
      &:hover {
        background: var(--tng-background);
        border-color: var(--tng-primary);
      }
      
      i {
        font-size: 20px;
      }
      
      .theme-name {
        font-weight: var(--tng-font-weight-medium);
      }
    }
    
    .theme-dropdown {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      background: var(--tng-surface);
      border: 1px solid var(--tng-border);
      border-radius: var(--tng-border-radius);
      box-shadow: var(--tng-shadow-md);
      z-index: 1000;
      min-width: 320px;
      max-width: 400px;
    }
    
    .theme-grid {
      padding: 8px;
      display: grid;
      gap: 4px;
    }
    
    .theme-option {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: transparent;
      border: 1px solid transparent;
      border-radius: var(--tng-border-radius);
      cursor: pointer;
      transition: all 0.2s;
      text-align: left;
      
      &:hover {
        background: var(--tng-background);
        border-color: var(--tng-border);
      }
      
      &.active {
        background: var(--tng-background);
        border-color: var(--tng-primary);
      }
    }
    
    .theme-preview {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      flex-shrink: 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .theme-info {
      flex: 1;
    }
    
    .theme-title {
      font-weight: var(--tng-font-weight-medium);
      color: var(--tng-text);
      margin-bottom: 2px;
    }
    
    .theme-desc {
      font-size: 12px;
      color: var(--tng-text-secondary);
    }
    
    .check {
      color: var(--tng-primary);
      font-size: 20px;
    }
    
    .theme-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
    }
  `]
})
export class ThemeSelectorComponent {
  themeService = inject(ThemeService);
  isOpen = signal(false);
  
  selectTheme(theme: ThemeName) {
    this.themeService.setTheme(theme);
    this.isOpen.set(false);
  }
  
  getCurrentThemeName(): string {
    const theme = this.themeService?.getThemeInfo(this.themeService.currentTheme());
    return theme?.displayName || 'Light';
  }
}

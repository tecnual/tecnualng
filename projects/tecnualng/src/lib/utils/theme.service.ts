import { Injectable, signal, effect } from '@angular/core';

export type ThemeName = 'light' | 'dark' | 'ocean' | 'forest' | 'sunset' | 'royal' | 'monochrome' | 'aurora' | 'aurora-dark' | 'futuristic';

export interface Theme {
  name: ThemeName;
  displayName: string;
  description: string;
  primaryColor: string;
  isDark: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'tng-theme';
  
  currentTheme = signal<ThemeName>(this.loadTheme());
  
  readonly themes: Theme[] = [
    {
      name: 'light',
      displayName: 'Light',
      description: 'Clean and bright',
      primaryColor: '#3f51b5',
      isDark: false
    },
    {
      name: 'dark',
      displayName: 'Dark',
      description: 'Easy on the eyes',
      primaryColor: '#7986cb',
      isDark: true
    },
    {
      name: 'ocean',
      displayName: 'Ocean',
      description: 'Deep blue waters',
      primaryColor: '#0288d1',
      isDark: false
    },
    {
      name: 'forest',
      displayName: 'Forest',
      description: 'Natural greens',
      primaryColor: '#388e3c',
      isDark: false
    },
    {
      name: 'sunset',
      displayName: 'Sunset',
      description: 'Warm oranges',
      primaryColor: '#f57c00',
      isDark: false
    },
    {
      name: 'royal',
      displayName: 'Royal',
      description: 'Regal purples',
      primaryColor: '#7b1fa2',
      isDark: false
    },
    {
      name: 'monochrome',
      displayName: 'Monochrome',
      description: 'Elegant grayscale',
      primaryColor: '#616161',
      isDark: false
    },
    {
      name: 'aurora',
      displayName: 'Aurora',
      description: 'Elegant gradients',
      primaryColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      isDark: false
    },
    {
      name: 'aurora-dark',
      displayName: 'Aurora Dark',
      description: 'Dark mode gradients',
      primaryColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      isDark: true
    },
    {
      name: 'futuristic',
      displayName: 'Futuristic',
      description: 'Neon cyberpunk vibes',
      primaryColor: '#00f2ff',
      isDark: true
    }
  ];

  constructor() {
    // Apply initial theme immediately
    const initialTheme = this.loadTheme();
    this.applyTheme(initialTheme);
    
    // Watch for theme changes
    effect(() => {
      const theme = this.currentTheme();
      console.log('Theme changed to:', theme);
      this.applyTheme(theme);
    });
  }

  setTheme(theme: ThemeName) {
    this.currentTheme.set(theme);
    this.saveTheme(theme);
  }

  private applyTheme(theme: ThemeName) {
    console.log('Applying theme:', theme);
    
    // Remove all theme classes (optional if we rely solely on CSS files, but good for safety)
    this.themes.forEach(t => {
      document.body.classList.remove(`${t.name}-theme`);
    });
    
    // Add new theme class (still useful for component-level hooks)
    document.body.classList.add(`${theme}-theme`);
    
    // Set data attribute for CSS
    document.body.setAttribute('data-theme', theme);
    
    // Load the theme CSS file
    this.loadThemeCss(theme);
    
    console.log('Body classes:', document.body.className);
    console.log('Data theme:', document.body.getAttribute('data-theme'));
  }

  private loadThemeCss(theme: ThemeName) {
    const head = document.head;
    const existingLink = document.getElementById('theme-css') as HTMLLinkElement;
    
    const link = document.createElement('link');
    link.id = 'theme-css';
    link.rel = 'stylesheet';
    link.href = `theme-${theme}.css`;
    
    if (existingLink) {
      head.replaceChild(link, existingLink);
    } else {
      head.appendChild(link);
    }
  }

  private loadTheme(): ThemeName {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return (saved as ThemeName) || 'light';
  }

  private saveTheme(theme: ThemeName) {
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  getThemeInfo(name: ThemeName): Theme | undefined {
    return this.themes.find(t => t.name === name);
  }
}

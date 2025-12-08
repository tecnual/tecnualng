import { Routes } from '@angular/router';

import { Empty } from './empty/empty';
import { HomeComponent } from './pages/home/home.component';
import { GettingStartedComponent } from './pages/getting-started/getting-started.component';
import { InputDemoComponent } from './pages/input-demo/input-demo.component';
import { DatepickerDemoComponent } from './pages/datepicker-demo/datepicker-demo.component';
import { ButtonDemoComponent } from './pages/button-demo/button-demo.component';
import { CardDemoComponent } from './pages/card-demo/card-demo.component';
import { ToolbarDemoComponent } from './pages/toolbar-demo/toolbar-demo.component';
import { TableDemoComponent } from './pages/table-demo/table-demo.component';
import { TooltipDemoComponent } from './pages/tooltip-demo/tooltip-demo.component';
import { ExpansionPanelDemoComponent } from './pages/expansion-panel-demo/expansion-panel-demo.component';
import { MenuDemoComponent } from './pages/menu-demo/menu-demo.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'getting-started',
    component: GettingStartedComponent,
  },
  {
    path: 'input',
    component: InputDemoComponent,
  },
  {
    path: 'datepicker',
    component: DatepickerDemoComponent,
  },
  {
    path: 'button',
    component: ButtonDemoComponent,
  },
  {
    path: 'card',
    component: CardDemoComponent,
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs-demo/tabs-demo.component').then(m => m.TabsDemoComponent)
  },
  {
    path: 'toolbar',
    component: ToolbarDemoComponent,
  },
  {
    path: 'table',
    component: TableDemoComponent,
  },
  {
    path: 'tooltip',
    component: TooltipDemoComponent,
  },
  {
    path: 'expansion-panel',
    component: ExpansionPanelDemoComponent,
  },
  {
    path: 'menu',
    component: MenuDemoComponent,
  },
  {
    path: 'sidebar',
    component: SidebarComponent,
  },
  {
    path: 'select',
    loadComponent: () => import('./pages/select-demo/select-demo.component').then(m => m.SelectDemoComponent)
  },
  {
    path: 'slider',
    loadComponent: () => import('./pages/slider-demo/slider-demo.component').then(m => m.SliderDemoComponent)
  },
  {
    path: 'empty',
    component: Empty,
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

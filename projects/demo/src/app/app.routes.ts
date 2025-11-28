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
    path: 'empty',
    component: Empty,
  },
];

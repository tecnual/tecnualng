import { Routes } from '@angular/router';

import { Empty } from './empty/empty';
import { HomeComponent } from './pages/home/home.component';
import { InputDemoComponent } from './pages/input-demo/input-demo.component';
import { DatepickerDemoComponent } from './pages/datepicker-demo/datepicker-demo.component';
import { ButtonDemoComponent } from './pages/button-demo/button-demo.component';

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
    path: 'empty',
    component: Empty,
  },
];

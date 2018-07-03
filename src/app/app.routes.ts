import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { RegisterComponent } from './login/register.component';

// const APP_ROUTES: Routes = [
//   { path: '', component: PagesComponent },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: DashboardComponent },
//   { path: 'progress', component: ProgressComponent },
//   { path: 'graficas1', component: Graficas1Component },
//   // { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
//   { path: '**', component: NopagefoundComponent }
// ];

const APP_ROUTES: Routes = [
  { path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'graficas1', component: Graficas1Component },
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NopagefoundComponent }
];

export const APP_ROUTING = RouterModule.forRoot( APP_ROUTES, { useHash: true } );

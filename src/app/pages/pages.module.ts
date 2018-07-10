import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

// * Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { DonaComponent } from './../components/dona/dona.component';

// * Routes
import { PAGES_ROUTING } from './pages.routes';

// * Modules
import { SharedModule } from '../shared/shared.module';

// * NgCharts2
import { ChartsModule } from 'ng2-charts';

// * Components
import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    DonaComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component
  ],
  imports: [
    SharedModule,
    PAGES_ROUTING,
    FormsModule,
    ChartsModule
  ]
})
export class PagesModule { }

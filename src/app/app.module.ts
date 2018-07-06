import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// * Temporal
import { FormsModule } from '@angular/forms';

// * Routes
import { APP_ROUTING } from './app.routes';

// * Modules
import { PagesModule } from './pages/pages.module';

// * Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    PagesModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

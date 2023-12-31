import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraNavComponent } from './plantilla/barra-nav/barra-nav.component';
import { FootherComponent } from './plantilla/foother/foother.component';
import { InicioComponent } from './plantilla/inicio/inicio.component';
import { ErrorComponent } from './plantilla/error/error.component';
import {HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AdministracionRoutingModule } from './modulos/administracion/administracion-routing.module';
import { CotizacionesRoutingModule } from './modulos/cotizaciones/cotizaciones-routing.module';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    BarraNavComponent,
    FootherComponent,
    InicioComponent,
    ErrorComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  
    NoopAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,   
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

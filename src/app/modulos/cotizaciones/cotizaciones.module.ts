import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CotizacionesRoutingModule } from './cotizaciones-routing.module';
import { AsignarCotizacionComponent } from './asignar-cotizacion/asignar-cotizacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuscarCotizacionComponent } from './buscar-cotizacion/buscar-cotizacion.component';
import { AppComponent } from 'src/app/app.component';







@NgModule({
  declarations: [
    AsignarCotizacionComponent,
    BuscarCotizacionComponent,     
    ],
  imports: [
    CommonModule,
    CotizacionesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  
  bootstrap: [AppComponent]
})
export class CotizacionesModule { }

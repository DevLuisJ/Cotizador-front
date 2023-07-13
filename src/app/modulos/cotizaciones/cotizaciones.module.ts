import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CotizacionesRoutingModule } from './cotizaciones-routing.module';
import { AsignarCotizacionComponent } from './asignar-cotizacion/asignar-cotizacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministracionRoutingModule } from '../administracion/administracion-routing.module';
import { BuscarEquipoComponent } from '../administracion/equipos/buscar-equipo/buscar-equipo.component';



@NgModule({
  declarations: [
    AsignarCotizacionComponent,
    ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    CotizacionesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class CotizacionesModule { }

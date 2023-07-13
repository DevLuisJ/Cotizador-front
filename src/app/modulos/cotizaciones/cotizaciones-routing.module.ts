import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CotizacionesModule } from './cotizaciones.module';
import { AsignarCotizacionComponent } from './asignar-cotizacion/asignar-cotizacion.component';



const routes: Routes = [
  {
    path: 'asignar-cotizacion',
    component: AsignarCotizacionComponent
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotizacionesRoutingModule { }

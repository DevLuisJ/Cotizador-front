import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CotizacionesModule } from './cotizaciones.module';
import { AsignarCotizacionComponent } from './asignar-cotizacion/asignar-cotizacion.component';
import { BuscarCotizacionComponent } from './buscar-cotizacion/buscar-cotizacion.component';
import { EditarCotizacionComponent } from './editar-cotizacion/editar-cotizacion.component';

const routes: Routes = [
  {
    path: 'asignar-cotizacion',
    component: AsignarCotizacionComponent
  } ,
  {
    path: 'buscar-cotizacion',
    component: BuscarCotizacionComponent
  },
  {
    path: 'editar-cotizacion',
    component: EditarCotizacionComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotizacionesRoutingModule { }

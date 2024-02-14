import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CotizacionesModule } from './cotizaciones.module';
import { AsignarCotizacionComponent } from './asignar-cotizacion/asignar-cotizacion.component';
import { BuscarCotizacionComponent } from './buscar-cotizacion/buscar-cotizacion.component';
import { EditarCotizacionComponent } from './editar-cotizacion/editar-cotizacion.component';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';
import { EliminarCotizacionComponent } from './eliminar-cotizacion/eliminar-cotizacion.component';

const routes: Routes = [
  {
    path: 'asignar-cotizacion',
    component: AsignarCotizacionComponent
  } ,
  {
    path: 'asignar-cotizacion/:id',
    component: AsignarCotizacionComponent
  } ,
  {
    path: 'buscar-cotizacion',
    component: BuscarCotizacionComponent
  },
  {
    path: 'editar-cotizacion',
    component: EditarCotizacionComponent
  },
  {
    path: 'editar-cotizacion/:id',
    component: EditarCotizacionComponent,
    canActivate:[ValidadorSesionGuard]
  },
  {
    path: 'eliminar-cotizacion/:id',
    component: EliminarCotizacionComponent,
    canActivate:[ValidadorSesionGuard]
  },
  {
    path: 'eliminar-cotizacion',
    component: EliminarCotizacionComponent,
    canActivate:[ValidadorSesionGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotizacionesRoutingModule { }

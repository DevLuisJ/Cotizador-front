import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './plantilla/error/error.component';
import { InicioComponent } from './plantilla/inicio/inicio.component';
import { CrearUsuarioComponent } from './modulos/administracion/usuarios/crear-usuario/crear-usuario.component';

const routes: Routes = [
  {
    path: "",
    component: InicioComponent
  },
  {
    path: "./",
    pathMatch: 'full',
    redirectTo: '/inicio'
  },
  {
    path: 'seguridad',
    loadChildren:()=> import("./modulos/seguridad/seguridad.module").then (x=> x.SeguridadModule)
  },
  {
    path: 'administracion',
    loadChildren:()=> import("./modulos/administracion/administracion.module").then (x=> x.AdministracionModule)
  },
  {
    path: 'cotizaciones',
    loadChildren:()=> import("./modulos/cotizaciones/cotizaciones.module").then (x=> x.CotizacionesModule)
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

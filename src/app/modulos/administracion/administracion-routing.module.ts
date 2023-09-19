import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarEquipoComponent } from './equipos/buscar-equipo/buscar-equipo.component';
import { CrearEquipoComponent } from './equipos/crear-equipo/crear-equipo.component';
import { EditarEquipoComponent } from './equipos/editar-equipo/editar-equipo.component';
import { EliminarEquipoComponent } from './equipos/eliminar-equipo/eliminar-equipo.component';
import { BuscarUsuarioComponent } from './usuarios/buscar-usuario/buscar-usuario.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './usuarios/eliminar-usuario/eliminar-usuario.component';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';

const routes: Routes = [
  {
    path: 'crear-usuario',
    component: CrearUsuarioComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'buscar-usuario',
    component: BuscarUsuarioComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editar-usuario',
    component: EditarUsuarioComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'eliminar-usuario',
    component: EliminarUsuarioComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'listar-equipos',
    component: BuscarEquipoComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'crear-equipo',
    component: CrearEquipoComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'buscar-equipo',
    component: BuscarEquipoComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editar-equipo/:id',
    component: EditarEquipoComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'eliminar-equipo/:id',
    component: EliminarEquipoComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editar-usuario/:id',
    component: EditarUsuarioComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'eliminar-usuario/:id',
    component: EliminarUsuarioComponent,
    canActivate: [ValidadorSesionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }

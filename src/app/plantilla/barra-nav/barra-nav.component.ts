import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModeloDatos } from 'src/app/modelos/datos.modelo';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-barra-nav',
  templateUrl: './barra-nav.component.html',
  styleUrls: ['./barra-nav.component.css']
})
export class BarraNavComponent {
  seInicioSesion: boolean = false;
  RolAdmin: Boolean = false;

  subs: Subscription = new Subscription();

  constructor(private seguridadServicio: SeguridadService){}

  ngOnInit(): void {
    this.subs = this.seguridadServicio.ObtenerDatosUsuarioEnSesion().subscribe((datos:ModeloIdentificar) =>{
     this.seInicioSesion = datos.estaIdentificado;
     this.validarAdministrador();
    })
  }
  validarAdministrador(){
    const cargoEnSesion = this.seguridadServicio.datosUsuarioEnSesion.value.datos?.cargo ;
    console.log("Cargo en sesion: " + cargoEnSesion)
    if(cargoEnSesion == 'Administrador'){
      this.RolAdmin= true
    }
  }
}

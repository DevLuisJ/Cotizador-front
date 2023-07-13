import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css']
})
export class CerrarSesionComponent {
    constructor(private serviciosSeguridad: SeguridadService, private router: Router){}

    ngOnInit(): void {
      this.serviciosSeguridad.EliminarInformacionSesion();
      this.router.navigate(['./'])

    }
}

import { Component, OnInit } from '@angular/core';
import { ModeloCotizacion } from 'src/app/modelos/cotizacion.modelo';
import { CotizacionService } from 'src/app/servicios/cotizacion.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';


@Component({
  selector: 'app-buscar-cotizacion',
  templateUrl: './buscar-cotizacion.component.html',
  styleUrls: ['./buscar-cotizacion.component.css']
})
export class BuscarCotizacionComponent implements OnInit{
  ListadoCotizacion: ModeloCotizacion[]=[];
  isLoading: boolean = false;
  filtroUsuario: string = "";
  cotizacionBuscada: string= "";
  cotizacionEncontrada: ModeloCotizacion | undefined;


  constructor(
    private cotizacionServicio: CotizacionService,
    private seguridadServicio: SeguridadService,
    
    ){
      
  }

  ngOnInit(): void {
    this.ObtenerListadoCotizacion();
    
  }
ObtenerListadoCotizacion(){
  this.isLoading=true;
  this.filtroUsuario=this.seguridadServicio.datosUsuarioEnSesion.value.datos?.nombre + ' ' +
    this.seguridadServicio.datosUsuarioEnSesion.value.datos?.apellidos;
    
  this.cotizacionServicio.ObtenerRegistros().subscribe({
    next:(datos: ModeloCotizacion[])=>{
      this.ListadoCotizacion=datos;
      
      this.isLoading=false;
    },
    error:(e)=>{
      console.log(e);
      this.isLoading=false
    }
  })
}

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router
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
  SwitchPrecio:boolean = true; //Variable para mostrar el precio en cop o usd
  

  constructor(
    private cotizacionServicio: CotizacionService,
    private seguridadServicio: SeguridadService,
    private router: Router
    
    ){
      
  }

  ngOnInit(): void {
    this.ObtenerListadoCotizacion();
    
  }
ObtenerListadoCotizacion(){
  this.isLoading=true;
  if(this.seguridadServicio.datosUsuarioEnSesion.value.datos?.cargo=="Administrador"){
    this.filtroUsuario="";
  }else{
  this.filtroUsuario=this.seguridadServicio.datosUsuarioEnSesion.value.datos?.nombre + ' ' +
    this.seguridadServicio.datosUsuarioEnSesion.value.datos?.apellidos;
  } 
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

seleccionarCotizacion(cotizacion: any) {
  this.cotizacionServicio.selectedCotizacion = { ...cotizacion};
  console.log("cotizacion selected:" + cotizacion.Cliente)
  this.router.navigate(['cotizaciones/asignar-cotizacion']);
}

cambiarMostrarPrecio(){
  this.SwitchPrecio= !this.SwitchPrecio;
}


}

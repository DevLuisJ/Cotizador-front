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
  SwitchPrecio:boolean = true; //Variable para mostrar el precio en cop o usd
  idBuscado:string="";
  idEncontrado:ModeloCotizacion | undefined;
  filtroIdSiigo:string="";
  mostrarId:Boolean=false;
  ClienteBuscado:string="";
  ClienteEncontrado:ModeloCotizacion | undefined;
  filtroCliente:string="";
  mostrarCliente:Boolean=false;


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

buscarCotizacionPorIdSiigo() {
  console.log("IdSiigo buscado:" + this.idBuscado);
  this.idEncontrado = this.ListadoCotizacion.find(objeto => objeto.IdSiigo === this.idBuscado);
  if (this.idEncontrado) {
    console.log("Objeto encontrado:");
    console.log(this.idEncontrado);
    this.mostrarId=!this.mostrarId;
    this.ListadoCotizacion=this.ListadoCotizacion;
   } else {
    console.log("Objeto no encontrado");
    
    alert("Equipo no encontrado");
  }
  
}

buscarCotizacionPorCliente() {
  console.log("Cliente buscado:" + this.ClienteBuscado);
  this.ClienteEncontrado = this.ListadoCotizacion.find(objeto => objeto.Cliente === this.ClienteBuscado);
  if (this.ClienteEncontrado) {
    console.log("Objeto encontrado:");
    console.log(this.ClienteEncontrado);
    this.mostrarCliente=!this.mostrarCliente;
    this.ListadoCotizacion=this.ListadoCotizacion;
   } else {
    console.log("Objeto no encontrado");
    
    alert("Equipo no encontrado");
  }
  
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

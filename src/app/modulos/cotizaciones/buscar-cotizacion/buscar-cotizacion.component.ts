import { Component, OnInit } from '@angular/core';
import { ModeloCotizacion } from 'src/app/modelos/cotizacion.modelo';
import { CotizacionService } from 'src/app/servicios/cotizacion.service';
//import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-buscar-cotizacion',
  templateUrl: './buscar-cotizacion.component.html',
  styleUrls: ['./buscar-cotizacion.component.css']
})
export class BuscarCotizacionComponent implements OnInit{
  ListadoCotizacion: ModeloCotizacion[]=[];
  isLoading: boolean = false;
  cotizacionBuscada: string= "";
  cotizacionEncontrada: ModeloCotizacion | undefined;

  constructor(
    private cotizacionServicio: CotizacionService,
    //private datePipe: DatePipe
    ){
      
  }

  ngOnInit(): void {
    this.ObtenerListadoCotizacion();
    
  }
ObtenerListadoCotizacion(){
  this.isLoading=true;
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

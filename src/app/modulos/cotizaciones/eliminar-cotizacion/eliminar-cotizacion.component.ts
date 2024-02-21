import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloCotizacion } from 'src/app/modelos/cotizacion.modelo';
import { CotizacionService } from 'src/app/servicios/cotizacion.service';

@Component({
  selector: 'app-eliminar-cotizacion',
  templateUrl: './eliminar-cotizacion.component.html',
  styleUrls: ['./eliminar-cotizacion.component.css']
})
export class EliminarCotizacionComponent implements OnInit {

  isLoading: boolean = false;//variable para mensaje de carga
  id:string="";
  cotizacion: ModeloCotizacion = new ModeloCotizacion();

  constructor(
    private cotizacionServicio: CotizacionService,
    private route: ActivatedRoute,
    private router: Router 

  ){  }
  ngOnInit(): void {
    this.id= this.route.snapshot.params["id"];
    this.BuscarCotizacion();
  }

  BuscarCotizacion(){
    this.isLoading = true;
    this.cotizacionServicio.ObtenerRegistrosPorId(this.id).subscribe((datos:ModeloCotizacion)=>{
      this.cotizacion=datos;
      this.isLoading = false;
    })
  }
  EliminarCotizacion(){
    this.isLoading = true;
    this.cotizacionServicio.EliminarCotizacion(this.id).subscribe((datos:ModeloCotizacion)=>{
      alert("Cotizacion Eliminada correctamente");
      this.router.navigate(["/cotizaciones/buscar-cotizacion"])
      this.isLoading = false;
    },(error: any) => {
      alert("Error Eliminando la cotizacion");
      this.isLoading = false;
    })
      
  }
}

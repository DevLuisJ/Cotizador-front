import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloEquipo } from 'src/app/modelos/equipo.modelo';
import { EquipoService } from 'src/app/servicios/equipo.service';

@Component({
  selector: 'app-eliminar-equipo',
  templateUrl: './eliminar-equipo.component.html',
  styleUrls: ['./eliminar-equipo.component.css']
})
export class EliminarEquipoComponent implements OnInit {
  isLoading: boolean = false;//variable para mensaje de carga
  id:string="";
  equipo: ModeloEquipo = new ModeloEquipo();

  constructor(
    private equipoServicio: EquipoService,
    private route: ActivatedRoute,
    private router: Router
    
  ){}
    
  ngOnInit(): void {
    this.id= this.route.snapshot.params["id"];
    this.BuscarEquipo();
  }

  BuscarEquipo(){
    this.isLoading = true;
    this.equipoServicio.ObtenerRegistrosPorId(this.id).subscribe((datos:ModeloEquipo)=>{
      this.equipo=datos;
      this.isLoading = false;
    })
  }

  Eliminar(){
    this.isLoading = true;
    this.equipoServicio.EliminarEquipo(this.id).subscribe((datos:ModeloEquipo)=>{
      alert("Equipo Eliminado correctamente");
      this.router.navigate(["/administracion/listar-equipos"])
      this.isLoading = false;
    },(error: any) => {
      alert("Error Eliminando el equipo");
      this.isLoading = false;
    })
      
  }

}

import { Component, OnInit } from '@angular/core';
import { ModeloEquipo } from 'src/app/modelos/equipo.modelo';
import { EquipoService } from 'src/app/servicios/equipo.service';

@Component({
  selector: 'app-buscar-equipo',
  templateUrl: './buscar-equipo.component.html',
  styleUrls: ['./buscar-equipo.component.css']
})
export class BuscarEquipoComponent implements OnInit{
  listadoRegistros: ModeloEquipo[] = [];
  isLoading: boolean = false;
  equipoBuscado: string = "";
  equipoEncontrado: ModeloEquipo | undefined;

  constructor(private equipoServicio: EquipoService){}
  ngOnInit(): void {
    this.ObtenerListadoEquipos();
  }   

  ObtenerListadoEquipos(){
    this.isLoading = true;
    this.equipoServicio.ObtenerRegistros().subscribe({
      next: (datos: ModeloEquipo[])=>{
        this.listadoRegistros=datos;  
        this.isLoading = false;         
      },
      error:(e)=>{
        console.log(e);
        this.isLoading = false;     
      }
    });
  }
  buscarEquipoPorReferencia() {
    console.log("Equipo buscado:" + this.equipoBuscado);
    this.equipoEncontrado = this.listadoRegistros.find(objeto => objeto.Referencia === this.equipoBuscado);
    if (this.equipoEncontrado) {
      console.log("Objeto encontrado:");
      console.log(this.equipoEncontrado);
    } else {
      console.log("Objeto no encontrado");
      
      alert("Equipo no encontrado");
    }
  }
}
  



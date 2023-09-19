import { Component, OnInit } from '@angular/core';
import { ModeloDatos } from 'src/app/modelos/datos.modelo';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-buscar-usuario',
  templateUrl: './buscar-usuario.component.html',
  styleUrls: ['./buscar-usuario.component.css']
})
export class BuscarUsuarioComponent implements OnInit {

listadoUsuarios: ModeloDatos[]=[];
isLoading: boolean = false;

constructor(private usuarioServicio: UsuarioService){}

  ngOnInit(): void {
    this.ObtenerListadoUsuarios();
  }
  ObtenerListadoUsuarios(){
    this.isLoading = true;
    this.usuarioServicio.ObtenerRegistros().subscribe({
      next: (datos: ModeloDatos[])=>{
        this.listadoUsuarios=datos;  
        this.isLoading = false;         
      },
      error:(e)=>{
        console.log(e);
        this.isLoading = false;     
      }
    });
  }
}

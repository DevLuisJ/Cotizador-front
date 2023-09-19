import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloDatos } from 'src/app/modelos/datos.modelo';
import { EquipoService } from 'src/app/servicios/equipo.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit{
  isLoading: boolean = false;//variable para mensaje de carga
  id:string="";
  usuario: ModeloDatos = new ModeloDatos();
  constructor(
    private usuarioServicio: UsuarioService,
    private route: ActivatedRoute,
    private router: Router

  ){  }

  ngOnInit(): void {
    this.id= this.route.snapshot.params["id"];
    this.BuscarUsuario();
  }
  BuscarUsuario(){
    this.isLoading = true;
    this.usuarioServicio.ObtenerRegistrosPorId(this.id).subscribe((datos:ModeloDatos)=>{
      this.usuario=datos;
      this.isLoading = false;
    })
  }

  Eliminar(){
    this.isLoading = true;
    this.usuarioServicio.EliminarUsuario(this.id).subscribe((datos:ModeloDatos)=>{
      alert("Usuario Eliminado correctamente");
      this.router.navigate(["/administracion/buscar-usuario"])
      this.isLoading = false;
    },(error: any) => {
      alert("Error Eliminando el usuario");
      this.isLoading = false;
    })
      
  }
}

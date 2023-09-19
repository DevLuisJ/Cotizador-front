import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloDatos } from 'src/app/modelos/datos.modelo';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit{
  id:string="";
isLoading:boolean=false;

fgValidador: FormGroup = this.fb.group({
  'id': ['',[Validators.required]],
  'email': ['',[Validators.required]],
  'cedula': ['',[Validators.required]],
  'nombre': ['',[Validators.required]],
  'apellidos': ['',[Validators.required]],
  'cargo': ['',[Validators.required]],
  
})

constructor(
  private route:ActivatedRoute,
  private fb: FormBuilder,
  private servicioUsuario: UsuarioService,
  private router: Router
){}

ngOnInit(): void {
  this.id= this.route.snapshot.params["id"];
  this.buscarUsuario();
  }
  
  buscarUsuario(){
    this.isLoading=true;
    this.servicioUsuario.ObtenerRegistrosPorId(this.id).subscribe((datos:ModeloDatos)=>{
     this.isLoading=false; 
      this.fgValidador.controls["id"].setValue(this.id);
      this.fgValidador.controls["cedula"].setValue(datos.cedula);
      this.fgValidador.controls["nombre"].setValue(datos.nombre);
      this.fgValidador.controls["apellidos"].setValue(datos.apellidos);
      this.fgValidador.controls["cargo"].setValue(datos.cargo);
      this.fgValidador.controls["email"].setValue(datos.email);
    })
  }

  EditarUsuario(){
    this.isLoading = true;
    let cedula = this.fgValidador.controls["cedula"].value;
    let nombre = this.fgValidador.controls["nombre"].value;
    let apellidos = this.fgValidador.controls["apellidos"].value;
    let cargo = this.fgValidador.controls["cargo"].value;
    let email = this.fgValidador.controls["email"].value;

    let u = new ModeloDatos();
    u.cedula=cedula;
    u.nombre=nombre;
    u.apellidos=apellidos;
    u.cargo=cargo;
    u.email=email;
    u.id= this.id;

    
    this.servicioUsuario.ActualizarUsuario(u).subscribe((datos:ModeloDatos) =>{
      alert("Usuario actualizado correctamente");
      this.isLoading = false;
      this.router.navigate(["/administracion/buscar-usuario"]);
  },(error: any) => {
    alert("Error actualizando el usuario");
    this.isLoading = false;
  })  

}


  }

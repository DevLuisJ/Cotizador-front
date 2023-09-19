import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloDatos } from 'src/app/modelos/datos.modelo';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {
  mostrarModal = false;
  fgValidador: FormGroup = this.fb.group({
    'cedula':['', [Validators.required]],
    'nombre':['', [Validators.required]],
    'apellidos':['', [Validators.required]],
    'cargo':['', [Validators.required]],
    'email': ['', [Validators.email, Validators.required]],
    
  })

  constructor( private fb: FormBuilder, private servicioUsuario: UsuarioService,
    private router: Router){}

    registrarUsuario(){
      let cedula = this.fgValidador.controls["cedula"].value;
      let nombre = this.fgValidador.controls["nombre"].value;
      let apellidos = this.fgValidador.controls["apellidos"].value;
      let cargo = this.fgValidador.controls["cargo"].value;
      let email = this.fgValidador.controls["email"].value;

      let u = new ModeloDatos();
      u.cedula= cedula;
      u.nombre= nombre;
      u.apellidos= apellidos;
      u.cargo= cargo;
      u.email= email;

      this.servicioUsuario.crearUsuario(u).subscribe((datos:ModeloDatos)=>{
        alert("Usuario almacenado correctamente");
        this.mostrarModal = true;
        this.router.navigate(["./"]);
      },(error: any)=>{
        alert
        ("Error guardando el usuario")
      })

    }
}

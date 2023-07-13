import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';


import { SeguridadService } from 'src/app/servicios/seguridad.service';
import * as cryptojs from 'crypto-js';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { ModeloDatos } from 'src/app/modelos/datos.modelo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'usuario': ['', [Validators.email, Validators.required]],
    'clave':['', [Validators.required]]
  })
  constructor(private fb: FormBuilder, 
    private servicioSeguridad: SeguridadService,
    private router: Router ){}

  ngOnInit(): void {
      }
  
  identificarUsuario(){
        let usuario = this.fgValidador.controls["usuario"].value;
        let clave = this.fgValidador.controls["clave"].value;
        let claveCifrada = cryptojs.MD5(clave).toString();
        this.servicioSeguridad.identificar(usuario, claveCifrada).subscribe((datos:any) => {
          // OK
          this.servicioSeguridad.AlmacenarSesion(datos);
          this.router.navigate(["./"])
          alert("Datos Correctos")
        }, (error: any) => {
          // KO
          alert("Datos Invalidos")
          
        })
        
  }

}

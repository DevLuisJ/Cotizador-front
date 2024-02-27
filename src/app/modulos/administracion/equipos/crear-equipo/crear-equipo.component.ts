import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloEquipo } from 'src/app/modelos/equipo.modelo';
import { EquipoService } from 'src/app/servicios/equipo.service';


@Component({
  selector: 'app-crear-equipo',
  templateUrl: './crear-equipo.component.html',
  styleUrls: ['./crear-equipo.component.css']
})
export class CrearEquipoComponent implements OnInit{
  isLoading: boolean = false;//variable para mensaje de carga

  fgValidador: FormGroup = this.fb.group({
    'Referencia': ['',[Validators.required]],
    'Descripcion': ['',[Validators.required]],
    'Marca': ['',[Validators.required]],
    'PaisEquipo': ['',[Validators.required]],
    'Altura':  ['',[Validators.required]],
    'Anchura': ['',[Validators.required]],
    'Profundidad': ['',[Validators.required]],
    'PesoReal': ['',[Validators.required]],
    'PosArancelaria': ['',[Validators.required]],
    'Proveedor': ['',[Validators.required]],
    'esApilable': ['',[Validators.required]],
    'Arancel': ['',[Validators.required]]
  })
  
  constructor(private fb: FormBuilder,
     private servicioEquipo: EquipoService,
      private router: Router){}

  ngOnInit(): void {    
  }     
      
  GuardarEquipo(){   

    let Referencia = this.fgValidador.controls["Referencia"].value;
    let Descripcion = this.fgValidador.controls["Descripcion"].value;
    let Marca = this.fgValidador.controls["Marca"].value;
    let PaisEquipo = this.fgValidador.controls["PaisEquipo"].value;
    let Altura = parseFloat( this.fgValidador.controls["Altura"].value);
    let Anchura = parseFloat( this.fgValidador.controls["Anchura"].value);
    let Profundidad = parseFloat(this.fgValidador.controls["Profundidad"].value);
    let PesoVolumetrico = Math.ceil((Altura*Anchura*Profundidad)/5000);
    let PesoReal = parseFloat(this.fgValidador.controls["PesoReal"].value);
    let PesoFacturado = Math.max(PesoVolumetrico,PesoReal);
    let PosArancelaria = this.fgValidador.controls["PosArancelaria"].value;
    let Proveedor = this.fgValidador.controls["Proveedor"].value;
    let esApilable= this.fgValidador.controls["esApilable"].value
    let Arancel= parseFloat( this.fgValidador.controls["Arancel"].value);
    let Estado = "Bloqueado"
    
    let e = new ModeloEquipo();
    e.Referencia= Referencia;
    e.Descripcion= Descripcion;
    e.Marca=Marca;
    e.PaisEquipo= PaisEquipo;
    e.Altura= Altura;
    e.Anchura= Anchura;
    e.Profundidad= Profundidad;
    e.PesoVolumetrico= PesoVolumetrico;
    e.PesoReal= PesoReal;
    e.PesoFacturado= PesoFacturado;
    e.PosArancelaria= PosArancelaria;
    e.Proveedor= Proveedor;
    e.esApilable= esApilable;
    e.Arancel= Arancel;
    e.Estado= Estado
    
    this.isLoading = true;

    this.servicioEquipo.CrearEquipo(e).subscribe((datos:ModeloEquipo) =>{
        
        alert("Equipo almacenado correctamente");
        this.router.navigate(["/administracion/listar-equipos"]);
        this.isLoading = false;
        
        
    },(error: any) => {
      alert("Error almacenando el equipo");
      this.isLoading = false;
    })
  }
  
  
  
}
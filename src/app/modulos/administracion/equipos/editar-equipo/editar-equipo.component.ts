import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloEquipo } from 'src/app/modelos/equipo.modelo';
import { EquipoService } from 'src/app/servicios/equipo.service';


@Component({
  selector: 'app-editar-equipo',
  templateUrl: './editar-equipo.component.html',
  styleUrls: ['./editar-equipo.component.css']
})
export class EditarEquipoComponent implements OnInit{
id:string="";
isLoading:boolean=false;
  
  fgValidador: FormGroup = this.fb.group({
    'id': ['',[Validators.required]],
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
  constructor(
    private fb: FormBuilder,
    private servicioEquipo: EquipoService,
     private router: Router,
      private route: ActivatedRoute
      ){}
      
  ngOnInit(): void {
    this.id= this.route.snapshot.params["id"];
    this.BuscarEquipo();
    
  }
BuscarEquipo(){

  this.isLoading=true;
  this.servicioEquipo.ObtenerRegistrosPorId(this.id).subscribe((datos:ModeloEquipo)=>{
    this.isLoading=false;
    this.fgValidador.controls["id"].setValue(this.id);
    this.fgValidador.controls["Referencia"].setValue(datos.Referencia);
    this.fgValidador.controls["Descripcion"].setValue(datos.Descripcion);
    this.fgValidador.controls["Marca"].setValue(datos.Marca);
    this.fgValidador.controls["PaisEquipo"].setValue(datos.PaisEquipo);
    this.fgValidador.controls["Altura"].setValue(datos.Altura);
    this.fgValidador.controls["Anchura"].setValue(datos.Anchura);
    this.fgValidador.controls["Profundidad"].setValue(datos.Profundidad);
    this.fgValidador.controls["PesoReal"].setValue(datos.PesoReal);
    this.fgValidador.controls["PosArancelaria"].setValue(datos.PosArancelaria);
    this.fgValidador.controls["Proveedor"].setValue(datos.Proveedor);    
    this.fgValidador.controls["esApilable"].setValue(datos.esApilable);
    this.fgValidador.controls["Arancel"].setValue(datos.Arancel);
  }
  )
}
  EditarEquipo(){
    this.isLoading = true;
    let Referencia = this.fgValidador.controls["Referencia"].value;
    let Descripcion = this.fgValidador.controls["Descripcion"].value;
    let Marca = this.fgValidador.controls["Marca"].value;
    let PaisEquipo = this.fgValidador.controls["PaisEquipo"].value;
    let Altura = parseFloat( this.fgValidador.controls["Altura"].value);
    let Anchura = parseFloat( this.fgValidador.controls["Anchura"].value);
    let Profundidad = parseFloat(this.fgValidador.controls["Profundidad"].value);
    let PesoReal = parseFloat(this.fgValidador.controls["PesoReal"].value);    
    let PosArancelaria = this.fgValidador.controls["PosArancelaria"].value;
    let Proveedor = this.fgValidador.controls["Proveedor"].value;
    let PesoVolumetrico = Math.ceil((Altura*Anchura*Profundidad)/5000);
    let PesoFacturado = Math.max(PesoVolumetrico,PesoReal);
    let esApilable = this.fgValidador.controls["esApilable"].value;
    let Arancel = parseFloat(this.fgValidador.controls["Arancel"].value);


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
    e.id= this.id;
    e.esApilable= esApilable;
    e.Arancel=Arancel;

    this.servicioEquipo.ActualizarEquipo(e).subscribe((datos:ModeloEquipo) =>{
        alert("Equipo actualizado correctamente");
        this.isLoading = false;
        this.router.navigate(["/administracion/listar-equipos"]);
    },(error: any) => {
      alert("Error actualizando el equipo");
      this.isLoading = false;
    })  

  }

  

}
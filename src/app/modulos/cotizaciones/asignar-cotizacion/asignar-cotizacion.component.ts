import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloCotizacion } from 'src/app/modelos/cotizacion.modelo';
import { CotizacionService } from 'src/app/servicios/cotizacion.service';
import { HttpClient } from '@angular/common/http';
import { ModeloEquipo } from 'src/app/modelos/equipo.modelo';
import { EquipoService } from 'src/app/servicios/equipo.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { ModeloDatos } from 'src/app/modelos/datos.modelo';





@Component({
  selector: 'app-asignar-cotizacion',
  templateUrl: './asignar-cotizacion.component.html',
  styleUrls: ['./asignar-cotizacion.component.css']
})
export class AsignarCotizacionComponent implements OnInit{
  
  listadoRegistros: ModeloEquipo[] = []; 
  selectedItem: any = {};
  vlrDolares: number =0;//variable para pasar a dolares el precio de compra
  isLoading: boolean = false;// varialble para el mensaje de carga
  equipoBuscado: string = "";
  equipoEncontrado: ModeloEquipo | undefined;

fgValidador: FormGroup = this.fb.group({ 
  
  'Cliente': ['',[Validators.required]],
  'Fecha': ['',[Validators.required]],
  'IdSiigo': ['',[Validators.required]],
  'Cantidad': ['',[Validators.required]],
  'Moneda': ['',[Validators.required]],
  'PrecioCompra': ['',[Validators.required]]
  
  
  
})

constructor(
  private fb: FormBuilder,
  private servicioCotizacion: CotizacionService,
  private router: Router,
  private http: HttpClient,
  private equipoServicio: EquipoService,
  private seguridadServicio: SeguridadService
  ){
    

  }


  ngOnInit(): void {
    this.ObtenerListadoEquipos();   
    this.RestriccionDatalistMoneda();
  }

  
//Funcion para seleccionar el equipo de la tabla
selectItem(equipo: any) {
  this.selectedItem = equipo;
  console.log('Elemento seleccionado:', this.selectedItem);
}


GuardarCotizacion(){
  
    
    let Cliente = this.fgValidador.controls["Cliente"].value; 
    let Fecha = this.fgValidador.controls["Fecha"].value;
    let IdSiigo = this.fgValidador.controls["IdSiigo"].value;
    let idEquipo = this.selectedItem.Referencia;
    let IdUsuario = this.seguridadServicio.datosUsuarioEnSesion.value.datos?.nombre + ' ' + this.seguridadServicio.datosUsuarioEnSesion.value.datos?.apellidos;;
    let Cantidad = parseInt( this.fgValidador.controls["Cantidad"].value);
    let Moneda = this.fgValidador.controls["Moneda"].value;
    let PrecioCompra = parseInt( this.fgValidador.controls["PrecioCompra"].value);
   
switch (Moneda) {
  case "EUR":
    this.vlrDolares = parseInt(this.fgValidador.controls["PrecioCompra"].value)*1.14;
    break;
  case "SEK":
    this.vlrDolares = parseInt( this.fgValidador.controls["PrecioCompra"].value)*0.11;
    break;
  case "USD":
    this.vlrDolares= parseInt( this.fgValidador.controls["PrecioCompra"].value);
    break;
  default:
    console.log("La variable tiene un valor distinto de 'opcion1', 'opcion2' y 'opcion3'");
    break;
}  
    
console.log("El valor de dolares es:", this.vlrDolares)
    console.log("El valor de Moneda es:", Moneda)
  let c = new ModeloCotizacion();
  
  
  c.Cliente= Cliente;
  c.Fecha= Fecha;
  c.IdSiigo= IdSiigo;
  c.idEquipo= idEquipo;
  c.IdUsuario= IdUsuario;
  c.Cantidad= Cantidad;
  c.Moneda= Moneda;
  c.PrecioCompra= PrecioCompra;

  
  
  this.isLoading = true;
  this.servicioCotizacion.CrearCotizacion(c).subscribe((datos:ModeloCotizacion) =>{
    
    this.router.navigate(["/cotizaciones/asignar-cotizacion"]);  
    this.isLoading = false;  
    alert("Cotizacion almacenada correctamente");
},(error: any) => {  
  alert("Error almacenando la cotizacion");
  this.isLoading = false;
})
    
  }

  ObtenerListadoEquipos(){
    this.isLoading = true;
    this.equipoServicio.ObtenerRegistros().subscribe({
      next: (datos: ModeloEquipo[])=>{
        this.isLoading = false;
        this.listadoRegistros=datos;         
      },
      error:(e)=>{
        console.log(e),
        this.isLoading = false;
        
      }
    });

}
RestriccionDatalistMoneda(){ //Restriccion del campo moneda
  const inputMoneda = document.getElementById('Moneda') as HTMLInputElement;
    const datalistOptions = document.getElementById('datalistOptions') as HTMLDataListElement;
    if (inputMoneda && datalistOptions) {
    inputMoneda.addEventListener('input', function() {
      const valorInput = inputMoneda.value;
      const opciones = Array.from(datalistOptions.options).map(option => option.value);
  
      if (!opciones.includes(valorInput)) {
        inputMoneda.value = '';
      }
    });
  }
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

 

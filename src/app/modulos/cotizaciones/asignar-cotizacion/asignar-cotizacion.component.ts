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
  vlrDolares: number =0.00;//variable para pasar a dolares el precio de compra
  isLoading: boolean = false;// varialble para el mensaje de carga
  equipoBuscado: string = "";
  equipoEncontrado: ModeloEquipo | undefined;
  CargoCombustible: number = 0;
  TotalFleteInt: number=0;
  PrecioCompra: number=0;
  Seguro: number=0;
  VlrTotalMcia:number=0;
  ImprevistosTRM:number=0;
  FormaPago: number=0; // Privisional para no enviar al back
  TotalCIF:number=0;
  Arancel: number=0;

fgValidador: FormGroup = this.fb.group({ 
  
  'Cliente': ['',[Validators.required]],
  'Fecha': ['',[Validators.required]],
  'IdSiigo': ['',[Validators.required]],
  'Cantidad': ['',[Validators.required]],
  'Moneda': ['',[Validators.required]],
  'PrecioCompra': ['',[Validators.required]],
  'FleteOrigenDestino' :['',[Validators.required]],
  'CargoCombustible': ['',[Validators.required]],
  'AlistamientoProveedor': ['',[Validators.required]],
  'TasaCambio': ['',[Validators.required]],
  'FleteLocal': ['',[Validators.required]],
  'AccesoriosLocales': ['',[Validators.required]],
  'FormaPago': ['',[Validators.required]]
  
})

constructor(
  private fb: FormBuilder,
  private servicioCotizacion: CotizacionService,
  private router: Router,
  private http: HttpClient,
  private equipoServicio: EquipoService,
  private seguridadServicio: SeguridadService  
  ){    }


  ngOnInit( ): void {
    this.ObtenerListadoEquipos();     
  }

  
GuardarCotizacion(){  
    
    let Cliente = this.fgValidador.controls["Cliente"].value; 
    let Fecha = this.fgValidador.controls["Fecha"].value;
    let IdSiigo = this.fgValidador.controls["IdSiigo"].value;
    let idEquipo = this.equipoEncontrado?.Referencia;
    let IdUsuario = this.seguridadServicio.datosUsuarioEnSesion.value.datos?.nombre + ' ' + this.seguridadServicio.datosUsuarioEnSesion.value.datos?.apellidos;;
    let Cantidad = parseFloat( this.fgValidador.controls["Cantidad"].value);
    let Moneda = this.fgValidador.controls["Moneda"].value;
    let PrecioCompra = parseFloat( this.fgValidador.controls["PrecioCompra"].value);

    switch (Moneda) {
      case "EUR":
        this.vlrDolares = parseFloat(this.fgValidador.controls["PrecioCompra"].value)*1.14;
        break;
      case "SEK":
        this.vlrDolares = parseFloat( this.fgValidador.controls["PrecioCompra"].value)*0.11;
        break;
      case "USD":
        this.vlrDolares= parseFloat( this.fgValidador.controls["PrecioCompra"].value);
        break;
      default:
        console.log("La variable tiene un valor distinto de 'EUR', 'SEK' y 'USD'");
        break;
    }  
    let FleteOrigenDestino = parseFloat( this.fgValidador.controls["FleteOrigenDestino"].value);
    let Imprevistos = (this.fgValidador.controls["FleteOrigenDestino"].value)/0.9; //imprevistos del flete
    let OtrosGastosFit: number = 0;    
    if (this.equipoEncontrado && (this.equipoEncontrado?.Altura! >= 120 || this.equipoEncontrado?.Anchura! >= 120 || 
      this.equipoEncontrado?.Profundidad! >= 120 || this.equipoEncontrado?.PesoReal! >= 70)) {
      OtrosGastosFit = 25;
    } else{
      OtrosGastosFit = 0;
    }  
    this.CargoCombustible= parseFloat( this.fgValidador.controls["CargoCombustible"].value);
    this.TotalFleteInt= (Imprevistos*this.CargoCombustible/100)+Imprevistos+OtrosGastosFit;
    this.Seguro= this.vlrDolares*1/100;
    let AlistamientoProveedor = parseFloat( this.fgValidador.controls["AlistamientoProveedor"].value);
    this.VlrTotalMcia= AlistamientoProveedor + this.Seguro + this.TotalFleteInt + this.vlrDolares;
    let TasaCambio = parseFloat( this.fgValidador.controls["TasaCambio"].value);
    this.ImprevistosTRM= TasaCambio+150;
    let FleteLocal = parseFloat( this.fgValidador.controls["FleteLocal"].value);
    let AccesoriosLocales = parseFloat( this.fgValidador.controls["AccesoriosLocales"].value);
    this.FormaPago = parseFloat(this.fgValidador.controls["FormaPago"].value);
    this.TotalCIF= this.VlrTotalMcia*this.ImprevistosTRM;
    //this.Arancel= this.equipoEncontrado?.PosArancelaria!

    console.log("El valor de dolares es:", this.vlrDolares);   
    console.log("El valor de TotalFleteInt es:", this.TotalFleteInt);
    console.log("El valor de VlrTotalMcia es:", this.VlrTotalMcia);
    console.log("El valor de ImprevistosTRM es:", this.ImprevistosTRM);
    console.log("El valor de FormaPago es:", this.FormaPago);
    console.log("El valor de TotalCIF es:", this.TotalCIF);
    

  let c = new ModeloCotizacion();  
  c.Cliente= Cliente;
  c.Fecha= Fecha;
  c.IdSiigo= IdSiigo;
  c.idEquipo= idEquipo;
  c.IdUsuario= IdUsuario;
  c.Cantidad= Cantidad;
  c.Moneda= Moneda;
  c.PrecioCompra= PrecioCompra;
  c.FleteOrigenDestino= FleteOrigenDestino;  
  c.Imprevistos= Imprevistos;
  c.OtrosGastosFit= OtrosGastosFit;
  c.CargoCombustible= this.CargoCombustible;
  c.Seguro= this.Seguro;
  c.AlistamientoProveedor= AlistamientoProveedor;
  c.TasaCambio= TasaCambio;
  c.FleteLocal= FleteLocal;
  c.AccesoriosLocales= AccesoriosLocales;
  //c.FormaPago=FormaPago; Privisional no se envia a bd

  
  this.isLoading = true;
  this.servicioCotizacion.CrearCotizacion(c).subscribe((datos:ModeloCotizacion) =>{
    // Suponiendo que fgValidador es tu FormGroup
    this.fgValidador.reset();
    this.router.navigate(["/cotizaciones/asignar-cotizacion"]);  
    this.isLoading = false;  
    alert("Cotizacion almacenada correctamente");
},(error: any) => {  
  alert("Error almacenando la cotizacion");
  this.isLoading = false;
})
    
  }


  validarMoneda(event: any) {
    const inputMoneda = event.target.value;
    const opciones = Array.from(document.getElementById('datalistOptions')!.getElementsByTagName('option'))
      .map((option: any) => option.value);
  
    if (!opciones.includes(inputMoneda)) {
      // Si el valor ingresado no está en las opciones del datalist, puedes limpiar el campo
      // o mostrar un mensaje de error al usuario.
      // En este ejemplo, limpiamos el campo.
      this.fgValidador.controls['Moneda'].setValue('');
    }
  }
buscarEquipoPorReferencia() {
  this.isLoading = true;
  console.log("Equipo buscado:" + this.equipoBuscado);
  this.equipoEncontrado = this.listadoRegistros.find(objeto => objeto.Referencia === this.equipoBuscado);
  if (this.equipoEncontrado) {
    this.isLoading = false;
    console.log("Objeto encontrado:");
    console.log(this.equipoEncontrado);
  } else {
    this.isLoading = false;
    console.log("Objeto no encontrado");    
    alert("Equipo no encontrado");
  }
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
actualizarPorcentaje(valor: string) {
  // Convierte el valor de porcentaje ingresado en el campo a un número
  this.CargoCombustible = parseFloat(valor) / 100;
}

}   

 

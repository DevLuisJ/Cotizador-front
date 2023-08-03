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

  puestaMarchaFormGroup: FormGroup;
  
  listadoRegistros: ModeloEquipo[] = []; 
  selectedItem: any = {};
  vlrDolares: number =0.00;//variable para pasar a dolares el precio de compra
  isLoading: boolean = false;// varialble para el mensaje de carga
  equipoBuscado: string = "";
  equipoEncontrado: ModeloEquipo | undefined;
  puestaMarchaFormulario = false; // Variable para controlar la visualización del segundo formulario
  

  //liquidacion de importacion v6.0
  CargoCombustible: number = 0;
  TotalFleteInt: number=0;
  PrecioCompra: number=0;
  Seguro: number=0;

  //Impuestos y nacionalizacion
  VlrTotalMcia:number=0;
  ImprevistosTRM:number=0;
  TotalCIF:number=0;
  ArancelEquipo:number=0;
  BaseIVA:number=0;
  iva:number=0;
  vlrImpuesto:number=0;
  cuatrox1000:number=0;
  Manejo:number=0;
  TotalImpuestos:number=0;
  mayorq2000:number=0;
  pruebaInterm:number=0;

  //Gastos de intermediacion si mercancia es > a US$2.000
  valorCirCM:number=0;
  elabDeclaracion:number=0;
  preInspeccion:number=0;
  gastosOperativos:number=0;
  TotalTramiteNacionaliz:number=0;
  ivaTramite:number=0;
  GastosSIA:number=0;

  //Gastos adicionales tramite de nacionalizacion
  Bodegajes:number=0;
  transpBodegaAlfa:number=0;
  liberacionGuia:number=0;
  OtrosGastos:number=0;
  TotalGastosAdicionales:number=0;
  TotalGastosNacionalizacion:number=0;
  ListaPuestaMarcha: { label: string, value: number }[] = [];
  ComisionBancaria:number=0;
  Financiamiento:number=0;

  //Liquidacion de precios
  Precio1:number=0;
  Precio2:number=0;
  Precio3:number=0;
  Precio4:number=0;
  Precio5:number=0;
  Precio6:number=0;
  PrecioCant1:number=0;
  PrecioCant2:number=0;
  PrecioCant3:number=0;
  PrecioCant4:number=0;
  PrecioCant5:number=0;
  PrecioCant6:number=0;

  //Variables de administracion de tarifas
  Descuento1:number=0.55;
  Descuento2:number=0.6;
  Descuento3:number=0.65;
  Descuento4:number=0.7;
  Descuento5:number=0.75;
  Descuento6:number=0.8;

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
  'FormaPago': ['',[Validators.required]],
  'PuestaMarcha': ['',[Validators.required]],
  'Observaciones':['']
})

constructor(
  private fb: FormBuilder,
  private servicioCotizacion: CotizacionService,
  private router: Router,
  private http: HttpClient,
  private equipoServicio: EquipoService,
  private seguridadServicio: SeguridadService  
  ){  
    this.puestaMarchaFormGroup = this.fb.group({
      label: [''],
      value: ['']
    });
    }


  ngOnInit( ): void {
    this.ObtenerListadoEquipos();     
  }
// Función para alternar la visualización del segundo formulario
toggleSegundoFormulario() {
  this.puestaMarchaFormulario = !this.puestaMarchaFormulario;
}
  
GuardarCotizacion(){  
    
    let Cliente = this.fgValidador.controls["Cliente"].value; 
    let Fecha = this.fgValidador.controls["Fecha"].value;
    let IdSiigo = this.fgValidador.controls["IdSiigo"].value;
    let idEquipo = this.equipoEncontrado?.Referencia;
    let IdUsuario = this.seguridadServicio.datosUsuarioEnSesion.value.datos?.nombre + ' ' +
       this.seguridadServicio.datosUsuarioEnSesion.value.datos?.apellidos;;
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
    let FormaPago = parseFloat(this.fgValidador.controls["FormaPago"].value);
    this.TotalCIF= this.VlrTotalMcia*this.ImprevistosTRM;
    this.ArancelEquipo = this.equipoEncontrado?.Arancel!*this.TotalCIF;
    this.BaseIVA=this.TotalCIF+this.ArancelEquipo;
    this.iva=this.BaseIVA*0.19;
    this.vlrImpuesto=this.ArancelEquipo+this.iva;
    this.cuatrox1000=(this.vlrImpuesto*0.4)/100;
    if (this.vlrDolares>=2000) {this.Manejo=75000;} else {this.Manejo=35000;}
    this.TotalImpuestos=this.vlrImpuesto+this.cuatrox1000+this.Manejo;
    if (this.vlrDolares>=2000) {this.mayorq2000=(this.TotalCIF*0.4)/100;} else {this.mayorq2000=0;}
    if (this.mayorq2000<400000) {this.pruebaInterm=400000;} else {this.pruebaInterm=this.mayorq2000;}
    if (this.vlrDolares>=2000|| this.equipoEncontrado?.PesoReal!>50||Cantidad>6) {
       this.elabDeclaracion=50000/Cantidad;
       this.preInspeccion=50000/Cantidad;
       this.gastosOperativos=50000/Cantidad;
       this.valorCirCM=this.pruebaInterm/Cantidad;
       this.Bodegajes=350000/Cantidad;
       this.transpBodegaAlfa=50000/Cantidad;
       this.liberacionGuia=50000/Cantidad;
       this.OtrosGastos=110000/Cantidad;
       } 
      else { 
        this.elabDeclaracion=0;
        this.preInspeccion=0;
        this.gastosOperativos=0;
        this.valorCirCM=0;
        this.Bodegajes=0;
        this.transpBodegaAlfa=0;
        this.liberacionGuia=0;
        this.OtrosGastos=0;
       }
    this.TotalTramiteNacionaliz=this.elabDeclaracion+this.preInspeccion+this.gastosOperativos+this.valorCirCM;
    this.ivaTramite=this.TotalTramiteNacionaliz*0.19;
    this.GastosSIA=this.TotalTramiteNacionaliz+this.ivaTramite;
    this.TotalGastosAdicionales=this.Bodegajes+this.transpBodegaAlfa+this.liberacionGuia+this.OtrosGastos;
    this.TotalGastosNacionalizacion=this.GastosSIA+this.TotalGastosAdicionales;
    this.ComisionBancaria=(35*TasaCambio)/Cantidad; 
    let PuestaMarcha= parseFloat( this.fgValidador.controls["PuestaMarcha"].value);   
    this.Financiamiento= ((this.TotalCIF+this.TotalImpuestos+this.TotalGastosNacionalizacion+PuestaMarcha+
      FleteLocal+AccesoriosLocales+this.ComisionBancaria)*FormaPago/100)/Cantidad;
  let Observaciones=  this.fgValidador.controls["Observaciones"].value 
  this.Precio1=  Math.ceil((this.TotalCIF/this.Descuento1)+((this.TotalImpuestos-this.iva)+this.TotalGastosNacionalizacion+
      PuestaMarcha+FleteLocal+AccesoriosLocales+this.ComisionBancaria+this.Financiamiento));
  this.Precio2=  Math.ceil((this.TotalCIF/this.Descuento2)+((this.TotalImpuestos-this.iva)+this.TotalGastosNacionalizacion+
      PuestaMarcha+FleteLocal+AccesoriosLocales+this.ComisionBancaria+this.Financiamiento)); 
  this.Precio3=  Math.ceil((this.TotalCIF/this.Descuento3)+((this.TotalImpuestos-this.iva)+this.TotalGastosNacionalizacion+
      PuestaMarcha+FleteLocal+AccesoriosLocales+this.ComisionBancaria+this.Financiamiento)); 
  this.Precio4=  Math.ceil((this.TotalCIF/this.Descuento4)+((this.TotalImpuestos-this.iva)+this.TotalGastosNacionalizacion+
      PuestaMarcha+FleteLocal+AccesoriosLocales+this.ComisionBancaria+this.Financiamiento)); 
  this.Precio5=  Math.ceil((this.TotalCIF/this.Descuento5)+((this.TotalImpuestos-this.iva)+this.TotalGastosNacionalizacion+
      PuestaMarcha+FleteLocal+AccesoriosLocales+this.ComisionBancaria+this.Financiamiento)); 
  this.Precio6=  Math.ceil((this.TotalCIF/this.Descuento6)+((this.TotalImpuestos-this.iva)+this.TotalGastosNacionalizacion+
      PuestaMarcha+FleteLocal+AccesoriosLocales+this.ComisionBancaria+this.Financiamiento)); 
  this.PrecioCant1=this.Precio1/Cantidad;
  this.PrecioCant2=this.Precio2/Cantidad;
  this.PrecioCant3=this.Precio3/Cantidad;
  this.PrecioCant4=this.Precio4/Cantidad;
  this.PrecioCant5=this.Precio5/Cantidad;
  this.PrecioCant6=this.Precio6/Cantidad; 


//Prueba de variables en consola:
    console.log("El valor de dolares es:", this.vlrDolares);   
    console.log("El valor de TotalFleteInt es:", this.TotalFleteInt);
    console.log("El valor de VlrTotalMcia es:", this.VlrTotalMcia);
    console.log("El valor de ImprevistosTRM es:", this.ImprevistosTRM);
    console.log("El valor de TotalCIF es:", this.TotalCIF);
    console.log("El valor de ArancelEquipo es:", this.ArancelEquipo);
    console.log("El valor de Base IVA es:", this.BaseIVA);
    console.log("El valor de IVA es:", this.iva);
    console.log("El valor de vlrImpuesto es:", this.vlrImpuesto);
    console.log("El valor de cuatrox1000 es:", this.cuatrox1000);
    console.log("El valor de Manejo es:", this.Manejo);
    console.log("El valor de TotalImpuestos es:", this.TotalImpuestos);
    console.log("El valor de mayorq2000 es:", this.mayorq2000);
    console.log("El valor de pruebaInterm es:", this.pruebaInterm);
    console.log("El valor de TotalTramiteNacionalizacion es:", this.TotalTramiteNacionaliz);
    console.log("El valor de ivaTramite es:", this.ivaTramite);
    console.log("El valor de GastosSIA es:", this.GastosSIA);
    console.log("El valor de TotalGastosAdicionales es:", this.TotalGastosAdicionales);
    console.log("El valor de TotalGastosNacionalizacion es:", this.TotalGastosNacionalizacion);
    console.log("El valor de ComisionBancaria es:", this.ComisionBancaria);
    console.log("El valor de Financiamiento es:", this.Financiamiento);
    

//Envio a base de datos, doc cotizacion
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
  c.FormaPago=FormaPago;
  c.GastosSIA=this.GastosSIA; 
  c.PuestaMarcha=PuestaMarcha;  
  c.Observaciones=Observaciones; 
  c.Precio1=this.Precio1;
  c.Precio2=this.Precio2;
  c.Precio3=this.Precio3;
  c.Precio4=this.Precio4;
  c.Precio5=this.Precio5;
  c.Precio6=this.Precio6; 
  c.PrecioCant1=this.PrecioCant1;
  c.PrecioCant2=this.PrecioCant2;
  c.PrecioCant3=this.PrecioCant3;
  c.PrecioCant4=this.PrecioCant4;
  c.PrecioCant5=this.PrecioCant5;
  c.PrecioCant6=this.PrecioCant6;
  
  this.isLoading = true;
  this.servicioCotizacion.CrearCotizacion(c).subscribe((datos:ModeloCotizacion) =>{
    this.fgValidador.reset();
    this.router.navigate(["/cotizaciones/asignar-cotizacion"]);  
    this.isLoading = false;  
    alert("Cotizacion almacenada correctamente");
},(error: any) => {  
  alert("Error almacenando la cotizacion");
  this.isLoading = false;
})
    
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
PuestaEnMarcha(){
  if(this.puestaMarchaFormGroup.valid){
    //const nuevoDato = this.puestaMarchaFormGroup.value;
    this.ListaPuestaMarcha=this.puestaMarchaFormGroup.value ;
    
    this.puestaMarchaFormulario = false;
    console.log("El valor de ListaPuestaMarcha es:", this.ListaPuestaMarcha);
  }
}
}   

 

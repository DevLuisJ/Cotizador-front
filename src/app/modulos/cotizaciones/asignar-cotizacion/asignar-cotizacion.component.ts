import { Component, OnInit, Injectable, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloCotizacion } from 'src/app/modelos/cotizacion.modelo';
import { CotizacionService } from 'src/app/servicios/cotizacion.service';
import { HttpClient } from '@angular/common/http';
import { ModeloEquipo } from 'src/app/modelos/equipo.modelo';
import { EquipoService } from 'src/app/servicios/equipo.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



@Component({
  selector: 'app-asignar-cotizacion',
  templateUrl: './asignar-cotizacion.component.html',
  styleUrls: ['./asignar-cotizacion.component.css']
})
export class AsignarCotizacionComponent implements OnInit{ 
  id:string="";
  listadoRegistros: ModeloEquipo[] = [];
  ListadoCotizacion: ModeloCotizacion[]=[]; 
  vlrDolares: number =0;//variable para pasar a dolares el precio de compra
  isLoading: boolean = false;// variable para el mensaje de carga
  equipoBuscado: string = "";
  equipoEncontrado: ModeloEquipo | undefined; 
  Imprevistos:number=0; 
  OtrosGastosFit:number=0;
  trmSEK: number =0;
  trmEUR:number =0;
  TasaCambio:number=0;  
  mostrarDetalle:boolean=false;
  Contabilizado:boolean=false;
  tasa:number=0; //tasa a la cual fue liquidada la cotizacion
  trmCotizada: number=0; //TRM de dolar cotizada en el momento de liquidar
 
  

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
  ListaPuestaMarcha: { concepto1: string; VlrUnd1: number; cantidad1: number; total1: number;
                      concepto2: string; VlrUnd2: number; cantidad2: number; total2: number;
                      concepto3: string; VlrUnd3: number; cantidad3: number; total3: number;
                      concepto4: string; VlrUnd4: number; cantidad4: number; total4: number;
                      concepto5: string; VlrUnd5: number; cantidad5: number; total5: number;
                      concepto6: string; VlrUnd6: number; cantidad6: number; total6: number;
                      concepto7: string; VlrUnd7: number; cantidad7: number; total7: number;
                      concepto8: string; VlrUnd8: number; cantidad8: number; total8: number;
                      concepto9: string; VlrUnd9: number; cantidad9: number; total9: number;
                      concepto10: string; VlrUnd10: number; cantidad10: number; total10: number;
  
                  }[] = [];
  ComisionBancaria:number=0;
  Financiamiento:number=0;
  TotalPuestaMarcha:number=0;

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
  Precio1Und: number =0;
  Precio2Und: number =0;
  Precio3Und: number =0;
  Precio4Und: number =0;
  Precio5Und: number =0;
  Precio6Und: number =0;

  //Variables de administracion de tarifas
  Descuento1:number=0.55;
  Descuento2:number=0.6;
  Descuento3:number=0.65;
  Descuento4:number=0.7;
  Descuento5:number=0.75;
  Descuento6:number=0.8;
  

fgValidador: FormGroup = this.fb.group({ 
  //'id': ['',[Validators]],
  'Cliente': ['',[Validators.required]],
  'Fecha': [new Date(),[Validators.required]],
  'IdSiigo': ['',[Validators.required]],
  'equipoBuscado': ['',[Validators.required]],
  'Cantidad': ['',[Validators.required]],
  'Moneda': ['',[Validators.required]],
  'PrecioCompra': ['',[Validators.required]],
  'FleteOrigenDestino' :['',[Validators.required]],
  'CargoCombustible': ['',[Validators.required]],
  'AlistamientoProveedor': ['',[Validators.required]],  
  'FleteLocal': ['',[Validators.required]],
  'AccesoriosLocales': ['',[Validators.required]],
  'FormaPago': ['',[Validators.required]],
  'PuestaMarcha': ['',[Validators.required]],
  'Observaciones':[''],
  'concepto1':['Horas Ingenieria'],  'VlrUnd1':[''],  'cantidad1':[''],'total1':[''],
  'concepto2':['Instalacion'],  'VlrUnd2':[''],  'cantidad2':[''],'total2':[''],
  'concepto3':['Soporte Sitio'],  'VlrUnd3':[''],  'cantidad3':[''],'total3':[''],
  'concepto4':['Soporte Remoto'],  'VlrUnd4':[''],  'cantidad4':[''],'total4':[''],
  'concepto5':['Mtto Prev. Primer Año'],  'VlrUnd5':[''],  'cantidad5':[''],'total5':[''],
  'concepto6':['Tiquetes'],  'VlrUnd6':[''],  'cantidad6':[''],'total6':[''],
  'concepto7':['Hotel y Alimentacion'],  'VlrUnd7':[''],  'cantidad7':[''],'total7':[''],
  'concepto8':['Transportes'],  'VlrUnd8':[''],  'cantidad8':[''],'total8':[''],
  'concepto9':['Varios'],  'VlrUnd9':[''],  'cantidad9':[''],'total9':[''],
  'concepto10':['Otros'],  'VlrUnd10':[''],  'cantidad10':[''],'total10':[''],

})

constructor(
  private fb: FormBuilder,
  private servicioCotizacion: CotizacionService,
  private http: HttpClient,
  private equipoServicio: EquipoService,
  private seguridadServicio: SeguridadService,
  private router: Router,
  private route: ActivatedRoute
  
  ){     }


  ngOnInit( ): void {
      
    this.TasadeCambio();  

    if(this.route.snapshot.params["id"]){
      this.id= this.route.snapshot.params["id"];
      console.log("id:"+this.id);
      this.SetCotizacion();
      
    }  
        
    this.ObtenerListadoEquipos(); 
    this.CalculoPuestaMarcha();
  }

  
Contabilizar(){     
  this.Contabilizado=false;  
  this.Imprevistos=0;
  this.OtrosGastosFit=0;
  this.TotalFleteInt=0;
  this.Seguro=0;
  this.vlrDolares=0;
  this.VlrTotalMcia=0;
  this.ImprevistosTRM=0;
  this.TotalCIF=0;
  this.ArancelEquipo=0;
  this.BaseIVA=0;
  this.iva=0;
  this.vlrImpuesto=0;
  this.cuatrox1000=0;
  this.Manejo=0;
  this.TotalImpuestos=0;
  this.mayorq2000=0;
  this.pruebaInterm=0;
  this.tasa=0;

  //Gastos de intermediacion si mercancia es > a US$2.000
  this.valorCirCM=0;
  this.elabDeclaracion=0;
  this.preInspeccion=0;
  this.gastosOperativos=0;
  this.TotalTramiteNacionaliz=0;
  this.ivaTramite=0;
  this.GastosSIA=0;

  //Gastos adicionales tramite de nacionalizacion
  this.Bodegajes=0;
  this.transpBodegaAlfa=0;
  this.liberacionGuia=0;
  this.OtrosGastos=0;
  this.TotalGastosAdicionales=0;
  this.TotalGastosNacionalizacion=0;

  this.ComisionBancaria=0;
  this.Financiamiento=0;

    this.buscarEquipoPorReferencia();
    let Cantidad = parseFloat( this.fgValidador.controls["Cantidad"].value);
    let Moneda = this.fgValidador.controls["Moneda"].value;
    let PrecioCompra = parseFloat(this.fgValidador.controls["PrecioCompra"].value);
    switch (Moneda) {
        case "EUR":                        
             this.vlrDolares = PrecioCompra/(this.trmEUR-0.04);                 
          break;
        case "SEK":         
          this.vlrDolares = PrecioCompra/(this.trmSEK-0.5);         
          break;
        case "USD":
          this.vlrDolares= PrecioCompra;
          break;
        default:
          console.log("La variable tiene un valor distinto de 'EUR', 'SEK' o 'USD'");
          break;
      }
      
    
    this.Imprevistos = (this.fgValidador.controls["FleteOrigenDestino"].value)/0.9; //imprevistos del flete
        
    if (this.equipoEncontrado && (this.equipoEncontrado?.Altura! >= 120 || this.equipoEncontrado?.Anchura! >= 120 || 
      this.equipoEncontrado?.Profundidad! >= 120)) {
      this.OtrosGastosFit = 55;      
    } 
    if (this.equipoEncontrado && ( this.equipoEncontrado?.PesoFacturado! >= 70)) {
      this.OtrosGastosFit = this.OtrosGastosFit + 55;      
    } 
    if (this.equipoEncontrado &&(this.equipoEncontrado?.esApilable! == "NO")){
      this.TotalFleteInt=250//Se adiciona al flete internacional 250 usd cargo x dimensiones
    }

    this.CargoCombustible= parseFloat( this.fgValidador.controls["CargoCombustible"].value);
    this.TotalFleteInt= this.TotalFleteInt+(this.Imprevistos*this.CargoCombustible/100)+this.Imprevistos+this.OtrosGastosFit;// preguntar imprevistos x 2
    
    this.Seguro= this.vlrDolares*1/100;
    let AlistamientoProveedor = parseFloat( this.fgValidador.controls["AlistamientoProveedor"].value);
    this.VlrTotalMcia= AlistamientoProveedor + this.Seguro + this.TotalFleteInt + this.vlrDolares;
    this.ImprevistosTRM= this.TasaCambio+150;
    let FleteLocal = parseFloat( this.fgValidador.controls["FleteLocal"].value);
    let AccesoriosLocales = parseFloat( this.fgValidador.controls["AccesoriosLocales"].value);
    let FormaPago = parseFloat(this.fgValidador.controls["FormaPago"].value);
    this.TotalCIF= this.VlrTotalMcia*this.ImprevistosTRM;
    this.ArancelEquipo = (this.equipoEncontrado?.Arancel!/100)*this.TotalCIF;
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
    this.ComisionBancaria=(35*this.TasaCambio)/Cantidad; 
    let PuestaMarcha= parseFloat( this.fgValidador.controls["PuestaMarcha"].value);   
    this.Financiamiento= ((this.TotalCIF+this.TotalImpuestos+this.TotalGastosNacionalizacion+PuestaMarcha+
      FleteLocal+AccesoriosLocales+this.ComisionBancaria)*FormaPago/100)/Cantidad;
    
  
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

  this.PrecioCant1=Math.ceil(this.Precio1/this.TasaCambio);
  this.PrecioCant2=Math.ceil(this.Precio2/this.TasaCambio);
  this.PrecioCant3=Math.ceil(this.Precio3/this.TasaCambio);
  this.PrecioCant4=Math.ceil(this.Precio4/this.TasaCambio);
  this.PrecioCant5=Math.ceil(this.Precio5/this.TasaCambio);
  this.PrecioCant6=Math.ceil(this.Precio6/this.TasaCambio); 

  this.Precio1Und = Math.ceil(this.Precio1/Cantidad);
  this.Precio2Und = Math.ceil(this.Precio2/Cantidad);
  this.Precio3Und = Math.ceil(this.Precio3/Cantidad);
  this.Precio4Und = Math.ceil(this.Precio4/Cantidad);
  this.Precio5Und = Math.ceil(this.Precio5/Cantidad);
  this.Precio6Und = Math.ceil(this.Precio6/Cantidad);
  
  //puesta en marcha
  const nuevoElemento = {
    concepto1: this.fgValidador.controls["concepto1"].value, VlrUnd1: this.fgValidador.controls["VlrUnd1"].value,
          cantidad1: this.fgValidador.controls["cantidad1"].value, total1: this.fgValidador.controls["total1"].value,
    concepto2: this.fgValidador.controls["concepto2"].value, VlrUnd2: this.fgValidador.controls["VlrUnd2"].value,
          cantidad2: this.fgValidador.controls["cantidad2"].value, total2: this.fgValidador.controls["total2"].value,
    concepto3: this.fgValidador.controls["concepto3"].value, VlrUnd3: this.fgValidador.controls["VlrUnd3"].value,
          cantidad3: this.fgValidador.controls["cantidad3"].value, total3: this.fgValidador.controls["total3"].value,
    concepto4: this.fgValidador.controls["concepto4"].value, VlrUnd4: this.fgValidador.controls["VlrUnd4"].value,
          cantidad4: this.fgValidador.controls["cantidad4"].value, total4: this.fgValidador.controls["total4"].value, 
    concepto5: this.fgValidador.controls["concepto5"].value, VlrUnd5: this.fgValidador.controls["VlrUnd5"].value,
          cantidad5: this.fgValidador.controls["cantidad5"].value, total5: this.fgValidador.controls["total5"].value,
    concepto6: this.fgValidador.controls["concepto6"].value, VlrUnd6: this.fgValidador.controls["VlrUnd6"].value,
          cantidad6: this.fgValidador.controls["cantidad6"].value, total6: this.fgValidador.controls["total6"].value,
    concepto7: this.fgValidador.controls["concepto7"].value, VlrUnd7: this.fgValidador.controls["VlrUnd7"].value,
          cantidad7: this.fgValidador.controls["cantidad7"].value, total7: this.fgValidador.controls["total7"].value,
    concepto8: this.fgValidador.controls["concepto8"].value, VlrUnd8: this.fgValidador.controls["VlrUnd8"].value,
          cantidad8: this.fgValidador.controls["cantidad8"].value, total8: this.fgValidador.controls["total8"].value,
    concepto9: this.fgValidador.controls["concepto9"].value, VlrUnd9: this.fgValidador.controls["VlrUnd9"].value,
          cantidad9: this.fgValidador.controls["cantidad9"].value, total9: this.fgValidador.controls["total9"].value,
    concepto10: this.fgValidador.controls["concepto10"].value, VlrUnd10: this.fgValidador.controls["VlrUnd10"].value,
          cantidad10: this.fgValidador.controls["cantidad10"].value, total10: this.fgValidador.controls["total10"].value,            
     };
  
  this.ListaPuestaMarcha.push(nuevoElemento);


    this.isLoading = true;
    this.Contabilizado=!this.Contabilizado;
    alert("Cotizacion Contabilizada")
    this.isLoading = false
    ,(error: any) => {  
      alert("Error almacenando la cotizacion");
      this.isLoading = false;
    }
  }

  liquidacion(){
    const fechaActual = new Date();
    this.fgValidador.controls['Fecha'].setValue(fechaActual);
    let IdSiigo = this.fgValidador.controls["IdSiigo"].value;
    let Cliente = this.fgValidador.controls["Cliente"].value; 
    let Fecha = this.fgValidador.controls["Fecha"].value;
    let idEquipo = this.equipoEncontrado?.Referencia;
    let IdUsuario = this.seguridadServicio.datosUsuarioEnSesion.value.datos?.nombre + ' ' +
       this.seguridadServicio.datosUsuarioEnSesion.value.datos?.apellidos;;
    let Cantidad = parseFloat( this.fgValidador.controls["Cantidad"].value);
    let Moneda = this.fgValidador.controls["Moneda"].value;
    let PrecioCompra = parseFloat(this.fgValidador.controls["PrecioCompra"].value);
    let FleteOrigenDestino = parseFloat( this.fgValidador.controls["FleteOrigenDestino"].value);
    let AlistamientoProveedor = parseFloat( this.fgValidador.controls["AlistamientoProveedor"].value);
    let FleteLocal = parseFloat( this.fgValidador.controls["FleteLocal"].value);
    let AccesoriosLocales = parseFloat( this.fgValidador.controls["AccesoriosLocales"].value);
    let FormaPago = parseFloat(this.fgValidador.controls["FormaPago"].value);
    let PuestaMarcha= parseFloat( this.fgValidador.controls["PuestaMarcha"].value);
    let Observaciones=  this.fgValidador.controls["Observaciones"].value 
    

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
  c.Imprevistos= this.Imprevistos;
  c.OtrosGastosFit= this.OtrosGastosFit;
  c.CargoCombustible= this.CargoCombustible;
  c.Seguro= this.Seguro;
  c.AlistamientoProveedor= AlistamientoProveedor;
  c.TasaCambio= this.TasaCambio;
  c.FleteLocal= FleteLocal;
  c.AccesoriosLocales= AccesoriosLocales;
  c.FormaPago=FormaPago;
  c.GastosSIA=this.GastosSIA; 
  c.PuestaMarcha=PuestaMarcha;  
  c.Observaciones=Observaciones; 
  c.Estado="Pendiente";
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
  c.ListaPuestaMarcha= this.ListaPuestaMarcha;  
  c.trmCotizada= this.TasaCambio;
  
switch (Moneda) {
        case "EUR":                        
              c.tasa= this.trmEUR;               
          break;
        case "SEK":         
               c.tasa= this.trmSEK;  
          break;
        case "USD":
            c.tasa= this.TasaCambio;
          break;
        default:
          console.log("La variable tiene un valor distinto de 'EUR', 'SEK' o 'USD'");
          break;
      }

  this.isLoading = true;
  this.servicioCotizacion.CrearCotizacion(c).subscribe((datos:ModeloCotizacion) =>{    
    this.ObtenerListadoCotizacion();      
    this.isLoading = false;     
    alert("Cotizacion almacenada correctamente");  
    this.router.navigate(["/cotizaciones/buscar-cotizacion"]);  
    //location.reload();    
},(error: any) => {  
  alert("Error almacenando la cotizacion");
  this.isLoading = false;
})

//Prueba de variables en consola:
    console.log("El valor de dolares es:", this.vlrDolares); 
    console.log("El Seguro es:" + this.Seguro);
    console.log("El FleteOrigenDestino es:" + FleteOrigenDestino);
    console.log("El Imprevistos es:" + this.Imprevistos);
    console.log("El Otros Gastosfit es:" + this.OtrosGastosFit);
    console.log("El CargoCombustible es:" + this.CargoCombustible);  
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
    console.log("El valor de PUESTA-MARCHA es:", this.ListaPuestaMarcha);
  }
  
  buscarEquipoPorReferencia() {
    this.isLoading = true
    this.equipoBuscado = this.fgValidador.controls["equipoBuscado"].value;
    console.log("Equipo buscado:" + this.equipoBuscado);
    this.equipoEncontrado = this.listadoRegistros.find(objeto => objeto.Referencia === this.equipoBuscado);
    if (this.equipoEncontrado) {      
      this.isLoading = false;
      console.log("Objeto encontrado:");
      console.log(this.equipoEncontrado);
    } else {      
      this.isLoading = false;
      console.log("Equipo no encontrado o no existe");    
      alert("Equipo no encontrado o no existe");
    }
  }

TasadeCambio(){
  this.servicioCotizacion.getExchangeRate().subscribe(data => {
    this.trmEUR = data.rates.EUR;  //Tasa de cambio del euro a dolar  
    this.TasaCambio= data.rates.COP;
    this.trmSEK = data.rates.SEK;
    console.log("TRM SEK es:" + this.trmSEK); 
    console.log("TRM USD es:" + this.TasaCambio);     
    console.log("TRM EURO es:" + this.trmEUR); 
  });
}

CalculoPuestaMarcha() {
  
  const vlrUnd1 = this.fgValidador.controls["VlrUnd1"].value;
  const cantidad1 = this.fgValidador.controls["cantidad1"].value;
  const total1 = vlrUnd1 * cantidad1;   
  this.fgValidador.controls["total1"].setValue(total1);

  const vlrUnd2 = this.fgValidador.controls["VlrUnd2"].value;
  const cantidad2 = this.fgValidador.controls["cantidad2"].value;
  const total2 = vlrUnd2 * cantidad2;   
  this.fgValidador.controls["total2"].setValue(total2);

  const vlrUnd3 = this.fgValidador.controls["VlrUnd3"].value;
  const cantidad3 = this.fgValidador.controls["cantidad3"].value;
  const total3 = vlrUnd3 * cantidad3;   
  this.fgValidador.controls["total3"].setValue(total3);

  const vlrUnd4 = this.fgValidador.controls["VlrUnd4"].value;
  const cantidad4 = this.fgValidador.controls["cantidad4"].value;
  const total4 = vlrUnd4 * cantidad4;   
  this.fgValidador.controls["total4"].setValue(total4);

  const vlrUnd5 = this.fgValidador.controls["VlrUnd5"].value;
  const cantidad5 = this.fgValidador.controls["cantidad5"].value;
  const total5 = vlrUnd5 * cantidad5;   
  this.fgValidador.controls["total5"].setValue(total5);

  const vlrUnd6 = this.fgValidador.controls["VlrUnd6"].value;
  const cantidad6 = this.fgValidador.controls["cantidad6"].value;
  const total6 = vlrUnd6 * cantidad6;   
  this.fgValidador.controls["total6"].setValue(total6);

  const vlrUnd7 = this.fgValidador.controls["VlrUnd7"].value;
  const cantidad7 = this.fgValidador.controls["cantidad7"].value;
  const total7 = vlrUnd7 * cantidad7;   
  this.fgValidador.controls["total7"].setValue(total7);

  const vlrUnd8 = this.fgValidador.controls["VlrUnd8"].value;
  const cantidad8 = this.fgValidador.controls["cantidad8"].value;
  const total8 = vlrUnd8 * cantidad8;   
  this.fgValidador.controls["total8"].setValue(total8);

  const vlrUnd9 = this.fgValidador.controls["VlrUnd9"].value;
  const cantidad9 = this.fgValidador.controls["cantidad9"].value;
  const total9 = vlrUnd9 * cantidad9;   
  this.fgValidador.controls["total9"].setValue(total9);

  const vlrUnd10 = this.fgValidador.controls["VlrUnd10"].value;
  const cantidad10 = this.fgValidador.controls["cantidad10"].value;
  const total10 = vlrUnd10 * cantidad10;   
  this.fgValidador.controls["total10"].setValue(total10);
   
  const suma= total1 + total2+ total3+ total4+total5+total6+total7+total8+total9+total10
  this.TotalPuestaMarcha=(suma*0.02)+ suma
  this.fgValidador.controls["PuestaMarcha"].setValue(Math.ceil(this.TotalPuestaMarcha));
}

SetCotizacion(){
  
  this.isLoading=true;  
  this.servicioCotizacion.ObtenerRegistrosPorId(this.id).subscribe((datos:ModeloCotizacion)=>{
    this.isLoading=false;  
    
    this.fgValidador.controls["equipoBuscado"].setValue(datos.idEquipo);
    //this.buscarEquipoPorReferencia();
    this.fgValidador.controls["Cliente"].setValue(datos.Cliente);
    this.fgValidador.controls["Cantidad"].setValue(datos.Cantidad);
    this.fgValidador.controls["Moneda"].setValue(datos.Moneda);
    this.fgValidador.controls["PrecioCompra"].setValue(datos.PrecioCompra);
    this.fgValidador.controls["FleteOrigenDestino"].setValue(datos.FleteOrigenDestino);
    this.fgValidador.controls["CargoCombustible"].setValue(datos.CargoCombustible);
    this.fgValidador.controls["AlistamientoProveedor"].setValue(datos.AlistamientoProveedor);
    this.fgValidador.controls["FleteLocal"].setValue(datos.FleteLocal);
    this.fgValidador.controls["AccesoriosLocales"].setValue(datos.AccesoriosLocales);    
    this.fgValidador.controls["FormaPago"].setValue(datos.FormaPago);
    this.fgValidador.controls["Observaciones"].setValue(datos.Observaciones);

    const vlrtrmCotizada = datos.trmCotizada;
    const campotrmCotizada = document.getElementById('trmCotizada') as HTMLInputElement; // Obtener el campo HTML por su ID    
    if (campotrmCotizada) {
      if (vlrtrmCotizada !== undefined) {
        this.trmCotizada = vlrtrmCotizada; // Establecer el valor de Tasa en el campo HTML
      } else {
        console.log('El valor de trmCotizada es undefined');
      }
    } else {
      console.log('Campo trmCotizada no encontrado');
    }
    console.log("trmcotizada: "+ this.trmCotizada);

    const vlrTasa = datos.tasa;
    const campoTasa = document.getElementById('tasa') as HTMLInputElement; // Obtener el campo HTML por su ID    
    if (campoTasa) {
      if (vlrTasa !== undefined) {
        this.tasa = vlrTasa; // Establecer el valor de Tasa en el campo HTML
      } else {
        console.log('El valor de Tasa es undefined');
      }
    } else {
      console.log('Campo Tasa no encontrado');
    }

    console.log("tasa: "+ this.tasa);

    const vlrPrecio1 = datos.Precio1;
    const campoPrecio1 = document.getElementById('Precio1') as HTMLInputElement; // Obtener el campo HTML por su ID    
    if (campoPrecio1) {
      if (vlrPrecio1 !== undefined) {
        this.Precio1 = vlrPrecio1; // Establecer el valor de Precio1 en el campo HTML
      } else {
        console.log('El valor de Precio1 es undefined');
      }
    } else {
      console.log('Campo Precio1 no encontrado');
    }

    const vlrPrecio2 = datos.Precio2;
    const campoPrecio2 = document.getElementById('Precio1') as HTMLInputElement; // Obtener el campo HTML por su ID    
    if (campoPrecio2) {
      if (vlrPrecio2 !== undefined) {
        this.Precio2 = vlrPrecio2; // Establecer el valor de Precio1 en el campo HTML
      } else {
        console.log('El valor de Precio2 es undefined');
      }
    } else {
      console.log('Campo Precio2 no encontrado');
    }

    const vlrPrecio3 = datos.Precio3;
    const campoPrecio3 = document.getElementById('Precio3') as HTMLInputElement; // Obtener el campo HTML por su ID    
    if (campoPrecio3) {
      if (vlrPrecio3 !== undefined) {
        this.Precio3 = vlrPrecio3; // Establecer el valor de Precio3 en el campo HTML
      } else {
        console.log('El valor de Precio3 es undefined');
      }
    } else {
      console.log('Campo Precio3 no encontrado');
    }

    const vlrPrecio4 = datos.Precio4;
    const campoPrecio4 = document.getElementById('Precio4') as HTMLInputElement; // Obtener el campo HTML por su ID    
    if (campoPrecio4) {
      if (vlrPrecio4 !== undefined) {
        this.Precio4 = vlrPrecio4; // Establecer el valor de Precio4 en el campo HTML
      } else {
        console.log('El valor de Precio4 es undefined');
      }
    } else {
      console.log('Campo Precio4 no encontrado');
    }

    const vlrPrecio5 = datos.Precio5;
    const campoPrecio5 = document.getElementById('Precio5') as HTMLInputElement; // Obtener el campo HTML por su ID    
    if (campoPrecio5) {
      if (vlrPrecio5 !== undefined) {
        this.Precio5 = vlrPrecio5; // Establecer el valor de Precio5 en el campo HTML
      } else {
        console.log('El valor de Precio5 es undefined');
      }
    } else {
      console.log('Campo Precio5 no encontrado');
    }
    
    const vlrPrecio6 = datos.Precio6;
    const campoPrecio6 = document.getElementById('Precio6') as HTMLInputElement; // Obtener el campo HTML por su ID    
    if (campoPrecio6) {
      if (vlrPrecio6 !== undefined) {
        this.Precio6 = vlrPrecio6; // Establecer el valor de Precio6 en el campo HTML
      } else {
        console.log('El valor de Precio6 es undefined');
      }
    } else {
      console.log('Campo Precio6 no encontrado');
    }

    const vlrPrecioCant1 = datos.PrecioCant1;
    const campoPrecioCant1 = document.getElementById('PrecioCant1') as HTMLInputElement; // Obtener el campo HTML por su ID    
    if (campoPrecioCant1) {
      if (vlrPrecioCant1 !== undefined) {
        this.PrecioCant1 = vlrPrecioCant1; // Establecer el valor de PrecioCant1 en el campo HTML
      } else {
        console.log('El valor de PrecioCant1 es undefined');
      }
    } else {
      console.log('Campo PrecioCant1 no encontrado');
    }

    const vlrPrecioCant2 = datos.PrecioCant2;
    const campoPrecioCant2 = document.getElementById('PrecioCant2') as HTMLInputElement; // Obtener el campo HTML por su ID    
    if (campoPrecioCant2) {
      if (vlrPrecioCant2 !== undefined) {
        this.PrecioCant2 = vlrPrecioCant2; // Establecer el valor de PrecioCant2 en el campo HTML
      } else {
        console.log('El valor de PrecioCant2 es undefined');
      }
    } else {
      console.log('Campo PrecioCant2 no encontrado');
    }

    const vlrPrecioCant3 = datos.PrecioCant3;
    const campoPrecioCant3 = document.getElementById('PrecioCant3') as HTMLInputElement; // Obtener el campo HTML por su ID    
    if (campoPrecioCant3) {
      if (vlrPrecioCant3 !== undefined) {
        this.PrecioCant3 = vlrPrecioCant3; // Establecer el valor de PrecioCant3 en el campo HTML
      } else {
        console.log('El valor de PrecioCant3 es undefined');
      }
    } else {
      console.log('Campo PrecioCant3 no encontrado');
    }

    const vlrPrecioCant4 = datos.PrecioCant4;
    const campoPrecioCant4 = document.getElementById('PrecioCant4') as HTMLInputElement; // Obtener el campo HTML por su ID    
    if (campoPrecioCant4) {
      if (vlrPrecioCant4 !== undefined) {
        this.PrecioCant4 = vlrPrecioCant4; // Establecer el valor de PrecioCant4 en el campo HTML
      } else {
        console.log('El valor de PrecioCant4 es undefined');
      }
    } else {
      console.log('Campo PrecioCant4 no encontrado');
    }

    const vlrPrecioCant5 = datos.PrecioCant5;
    const campoPrecioCant5 = document.getElementById('PrecioCant5') as HTMLInputElement; // Obtener el campo HTML por su ID    
    if (campoPrecioCant5) {
      if (vlrPrecioCant5 !== undefined) {
        this.PrecioCant5 = vlrPrecioCant5; // Establecer el valor de PrecioCant5 en el campo HTML
      } else {
        console.log('El valor de PrecioCant5 es undefined');
      }
    } else {
      console.log('Campo PrecioCant5 no encontrado');
    }

    const vlrPrecioCant6 = datos.PrecioCant6;
    const campoPrecioCant6 = document.getElementById('PrecioCant6') as HTMLInputElement; // Obtener el campo HTML por su ID    
    if (campoPrecioCant6) {
      if (vlrPrecioCant6 !== undefined) {
        this.PrecioCant6 = vlrPrecioCant6; // Establecer el valor de PrecioCant6 en el campo HTML
      } else {
        console.log('El valor de PrecioCant6 es undefined');
      }
    } else {
      console.log('Campo PrecioCant6 no encontrado');
    }


//Set de los datos de puesta en marcha
if (datos.ListaPuestaMarcha !== undefined) {
  const ListaPuestaMarcha = datos.ListaPuestaMarcha;

  ListaPuestaMarcha.forEach((elemento, index) => {

    this.fgValidador.controls["concepto1"].setValue(elemento.concepto1);
    this.fgValidador.controls["concepto2"].setValue(elemento.concepto2);
    this.fgValidador.controls["concepto3"].setValue(elemento.concepto3);
    this.fgValidador.controls["concepto4"].setValue(elemento.concepto4);
    this.fgValidador.controls["concepto5"].setValue(elemento.concepto5);
    this.fgValidador.controls["concepto6"].setValue(elemento.concepto6);
    this.fgValidador.controls["concepto7"].setValue(elemento.concepto7);
    this.fgValidador.controls["concepto8"].setValue(elemento.concepto8);
    this.fgValidador.controls["concepto9"].setValue(elemento.concepto9);
    this.fgValidador.controls["concepto10"].setValue(elemento.concepto10);

    this.fgValidador.controls["VlrUnd1"].setValue(elemento.VlrUnd1);
    this.fgValidador.controls["VlrUnd2"].setValue(elemento.VlrUnd2);
    this.fgValidador.controls["VlrUnd3"].setValue(elemento.VlrUnd3);
    this.fgValidador.controls["VlrUnd4"].setValue(elemento.VlrUnd4);
    this.fgValidador.controls["VlrUnd5"].setValue(elemento.VlrUnd5);
    this.fgValidador.controls["VlrUnd6"].setValue(elemento.VlrUnd6);
    this.fgValidador.controls["VlrUnd7"].setValue(elemento.VlrUnd7);
    this.fgValidador.controls["VlrUnd8"].setValue(elemento.VlrUnd8);
    this.fgValidador.controls["VlrUnd9"].setValue(elemento.VlrUnd9);
    this.fgValidador.controls["VlrUnd10"].setValue(elemento.VlrUnd10); 
    
    this.fgValidador.controls["cantidad1"].setValue(elemento.cantidad1);
    this.fgValidador.controls["cantidad2"].setValue(elemento.cantidad2);
    this.fgValidador.controls["cantidad3"].setValue(elemento.cantidad3);
    this.fgValidador.controls["cantidad4"].setValue(elemento.cantidad4);
    this.fgValidador.controls["cantidad5"].setValue(elemento.cantidad5);
    this.fgValidador.controls["cantidad6"].setValue(elemento.cantidad6);
    this.fgValidador.controls["cantidad7"].setValue(elemento.cantidad7);
    this.fgValidador.controls["cantidad8"].setValue(elemento.cantidad8);
    this.fgValidador.controls["cantidad9"].setValue(elemento.cantidad9);
    this.fgValidador.controls["cantidad10"].setValue(elemento.cantidad10);   
  });
} else {
  console.log('ListaPuestaMarcha es undefined');
}
this.CalculoPuestaMarcha();
})
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

ObtenerListadoCotizacion(){
  this.isLoading=true;
  this.servicioCotizacion.ObtenerRegistros().subscribe({
    next:(datos: ModeloCotizacion[])=>{
      this.ListadoCotizacion=datos;      
      this.isLoading=false;
    },
    error:(e)=>{
      console.log(e);
      this.isLoading=false
    }
  })
}





/*formatearNumero(event: any) {
  const input = event.target;
  const valor = parseFloat(input.value.replace(/[^\d.-]/g, '')); // Eliminar caracteres no numéricos excepto punto y guión
  input.value = valor.toLocaleString('en-US');
}*/

}   

 

export class ModeloCotizacion{
    id? : String; 
    IdSiigo? : String;
    Fecha? : Date;
    Cliente? : String;
    IdUsuario? : String;    
    idEquipo? : String;
    Cantidad? : number;
    TasaCambio? : number; 
    FleteOrigenDestino? : number;
    Imprevistos? : number;
    OtrosGastosFit? : number;
    CargoCombustible? : number;
    AlistamientoProveedor? : number;
    FleteLocal? : number;
    AccesoriosLocales? : number;
    GastosSIA?: number;
    FormaPago? : number;
    Observaciones? : number;
    Moneda? : String;
    PrecioCompra? : number;
    Seguro? : number;
    PuestaMarcha?:number;
    Precio1?:number;
    Precio2?:number;
    Precio3?:number;
    Precio4?:number;
    Precio5?:number;
    Precio6?:number;
    PrecioCant1?:number;
    PrecioCant2?:number;
    PrecioCant3?:number;
    PrecioCant4?:number;
    PrecioCant5?:number;
    PrecioCant6?:number;
    
    ListaPuestaMarcha?: { concepto1: string, VlrUnd1: number, cantidad1: number, total1: number,
      concepto2: string, VlrUnd2: number, cantidad2: number, total2: number,
      concepto3: string, VlrUnd3: number, cantidad3: number, total3: number,
      concepto4: string, VlrUnd4: number, cantidad4: number, total4: number,
      concepto5: string, VlrUnd5: number, cantidad5: number, total5: number,
      concepto6: string, VlrUnd6: number, cantidad6: number, total6: number,
      concepto7: string, VlrUnd7: number, cantidad7: number, total7: number,
      concepto8: string, VlrUnd8: number, cantidad8: number, total8: number,
      concepto9: string, VlrUnd9: number, cantidad9: number, total9: number,
      concepto10: string, VlrUnd10: number, cantidad10: number, total10: number
    
    }[];

    /*constructor() {
        // Asignación del valor por defecto en el constructor
        this.ListaPuestaMarcha = []; // Puedes asignar un array vacío o con datos iniciales si lo deseas.
      }*/
    
}
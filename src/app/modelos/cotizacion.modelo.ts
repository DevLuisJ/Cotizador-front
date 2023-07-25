export class ModeloCotizacion{
    id? : String; 
    IdSiigo? : String;
    Fecha? : String;
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
    GastosSIA?: number;//pendiente
    FormaPago? : number;//pendiente hacer cambio variable backend
    Observaciones? : number;//pendiente
    TotalPrecioVenta? : number;//pendiente
    Moneda? : String;
    PrecioCompra? : number;
    Seguro? : number;
}
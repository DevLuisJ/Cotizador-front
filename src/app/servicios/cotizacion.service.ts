import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeguridadService } from './seguridad.service';
import { ModeloCotizacion } from '../modelos/cotizacion.modelo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  url='https://cotizadorbk.onrender.com'
  token: string= '';

  private apiKey = '1c177e5e35026df68ebf9595e3de2d7f';
  private apiUrl = 'http://data.fixer.io/api/latest';

  //private apiKey = 'f0321b1e530d41f6a85ffad812b5a188';
  //private apiUrl = 'https://openexchangerates.org/api/latest.json';

  constructor(
    private http: HttpClient,
    private seguridadServicio: SeguridadService,

  ) { 
    this.token = this.seguridadServicio.ObtenerToken();
  }

  ObtenerRegistros(): Observable<ModeloCotizacion[]>{
    return this.http.get<ModeloCotizacion[]>(`${this.url}/Cotizaciones`);
    
  }

  ObtenerRegistrosPorId(id:String): Observable<ModeloCotizacion>{
    return this.http.get<ModeloCotizacion>(`${this.url}/Cotizaciones/${id}`);
    
  }
  ObtenerRegistrosPorIdSiigo(idSiigo:String): Observable<ModeloCotizacion>{
    return this.http.get<ModeloCotizacion>(`${this.url}/Cotizaciones/${idSiigo}`);
    
  }
  

  CrearCotizacion(cotizacion: ModeloCotizacion): Observable<ModeloCotizacion>{
    return this.http.post<ModeloCotizacion>(`${this.url}/Cotizaciones`, cotizacion,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  ActualizarCotizacion(cotizacion: ModeloCotizacion): Observable<ModeloCotizacion>{
    return this.http.put<ModeloCotizacion>(`${this.url}/Cotizaciones/${cotizacion.id}`, cotizacion,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  EliminarCotizacion(id: string): Observable<any>{
    return this.http.delete<ModeloCotizacion>(`${this.url}/Cotizaciones/${id}`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
  getExchangeRate(): Observable<any> {
    const urlExchange = `${this.apiUrl}?access_key=${this.apiKey}&base=USD&symbols=COP`;
    return this.http.get(urlExchange);
  }


}

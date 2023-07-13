import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModeloEquipo } from '../modelos/equipo.modelo';
import { Observable } from 'rxjs';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  url = 'https://cotizadorbk.onrender.com'
  token: string = '';

  constructor(private http: HttpClient, private seguridadServicio: SeguridadService ) {
    this.token = this.seguridadServicio.ObtenerToken();
   }

  ObtenerRegistros(): Observable<ModeloEquipo[]>{
    return this.http.get<ModeloEquipo[]>(`${this.url}/equipos`);
    
  }

  ObtenerRegistrosPorId(id:String): Observable<ModeloEquipo>{
    return this.http.get<ModeloEquipo>(`${this.url}/equipos/${id}`);
    
  }

  CrearEquipo(equipo: ModeloEquipo): Observable<ModeloEquipo>{
    return this.http.post<ModeloEquipo>(`${this.url}/equipos`, equipo,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })

    
  }

  ActualizarEquipo(equipo: ModeloEquipo): Observable<ModeloEquipo>{
    return this.http.put<ModeloEquipo>(`${this.url}/equipos/${equipo.id}`, equipo,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  EliminarEquipo(id: string): Observable<any>{
    return this.http.delete<ModeloEquipo>(`${this.url}/equipos/${id}`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  
}

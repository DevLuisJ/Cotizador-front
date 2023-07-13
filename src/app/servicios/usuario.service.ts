import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeguridadService } from './seguridad.service';
import { ModeloDatos } from '../modelos/datos.modelo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'https://cotizadorbk.onrender.com'
  token: string = '';
  constructor(private http: HttpClient, private seguridadServicio: SeguridadService
    ) { this.token = this.seguridadServicio.ObtenerToken();}

    crearUsuario(usuario: ModeloDatos): Observable<ModeloDatos>{
      return this.http.post<ModeloDatos>(`${this.url}/usuarios`, usuario,{
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.token}`
        })
      })
    }


}
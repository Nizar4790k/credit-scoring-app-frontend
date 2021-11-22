import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iusuario } from '../interfaces/iusuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
hostUrl = "http://ef9b-34-91-103-14.ngrok.io";
UsuarioUrl = "/users";
VerificarUsuarioUrl = "/users/verificar";
  
  constructor(private http: HttpClient) { }

  getExisteUsuario(usuario: Iusuario): Observable<any>{

    return this.http.post(this.hostUrl + this.VerificarUsuarioUrl, usuario)
  }

  getUsuario(id?: number): Observable<any>{
    return this.http.get(this.hostUrl + this.UsuarioUrl + id);
  }

  addUsuario(usuario: Iusuario): Observable<any>{

    return this.http.post(this.hostUrl + this.UsuarioUrl, usuario);
  }
}

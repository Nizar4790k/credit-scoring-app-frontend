import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iusuario } from '../interfaces/iusuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
hostUrl = "http://localhost:3001";
verificarEmpleadoUrl = "/empleado_login";
  
  constructor(private http: HttpClient) { }

  getExisteUsuario(usuario: Iusuario): Observable<any>{

    return this.http.post(this.hostUrl + this.verificarEmpleadoUrl, usuario, {observe: 'response'})
  }
}

import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clienteNombre = new EventEmitter<string>();
  cliente: any;
  datos: any;
  hostUrl = "http://1c23-34-91-103-14.ngrok.io";
  InfoClientesUrl = "/clientes";
  datosClienteUrl = "/datos";

  constructor(private http: HttpClient) { }

  getClientes(): Observable<any>{

    return this.http.get(this.hostUrl + this.InfoClientesUrl);
  }

  getCliente(codigo: string){

    const datos = this.http.get(this.hostUrl + this.datosClienteUrl + '/' + codigo);
    datos.subscribe(data => {
      this.datos = data;
    }, error => {
      //location.href = '/notFound'
    })
    const cliente = this.http.get(this.hostUrl + this.InfoClientesUrl + '/' + codigo);
    cliente.subscribe((data: any) => {
      let nombre = data['FirstName'] + " ";
      let segundoNombre = data['MiddleName'] == null ?  null : data['MiddleName'] + " ";
      let apellidos = data['LastName'];

      this.clienteNombre.emit(nombre + segundoNombre + apellidos);
      this.cliente = data;  
    })

    //Si no se encontró el cliente, redirigelo a notFound
  }

  getDatosCliente(): any {
    return this.cliente['FirstName'];
  }

  getDatos(): any{
    return this.datos;
  }
}

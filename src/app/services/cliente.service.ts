import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Iacceso } from '../interfaces/iacceso';
import { IcurrentCredit } from '../interfaces/icurrent-credit';
import { InextCredit } from '../interfaces/inext-credit';
import { Iperfil } from '../interfaces/iperfil';
import { Iscore } from '../interfaces/iscore';
import { Iusuario } from '../interfaces/iusuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  acceso = new EventEmitter<boolean>();
  detalle: any;

  hostUrl = environment.hostUrl;
  clienteLoginUrl = "/cliente_login";
  detalleClienteUrl = "/detalle_cliente";

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getExisteCliente(usuario: Iusuario): Observable<any>{
    return this.http.post(this.hostUrl + this.clienteLoginUrl, usuario, {observe: 'response'})
  }

  async setAccess(acceso: Iacceso){

    await this.http.post(this.hostUrl + this.detalleClienteUrl, acceso, {observe: 'response'}).subscribe(data => {
      if(data.status === 200){
        this.detalle = data.body;
        this.acceso.emit(true);
      } 
    }, error => {
      if(error.status === 404){

        this.toastr.error("No se encontró este cliente.", "Acesso", {
          progressBar: true
        });
      }
      else if(error.status === 401){
        this.toastr.warning(
          "Esta cuenta acaba de ser iniciada con otro dispositivo.<br/><br/>Vuelva a iniciar sesión para poder tener acceso.",
          "Acceso no autorizado", {
            progressBar: true,
            timeOut: 9000,
            enableHtml: true
          }
        );
      }
      else if(error.status === 500){
        this.toastr.error(
          "Hubo un error en el servidor principal.<br/><br/>Vuelva a intentar más tarde.",
          "Error en el servidor", {
            progressBar: true,
            timeOut: 9000,
            enableHtml: true
          }
        );
      }
      else{
        this.toastr.error(
          "Hubo un error desconocido.<br/><br/>Vuelva a intentar más tarde.",
          "Error", {
            progressBar: true,
            timeOut: 9000,
            enableHtml: true
          }
        );
      } 
    
      this.acceso.emit(false);
    })
  }

  setCliente(cliente: any){
    this.detalle = cliente;
  }

  getClientePerfil(): Iperfil{
    return this.detalle.profile;
  }

  getClienteScore(): Iscore{
    return this.detalle.scoring;
  }

  getClienteCurrentCredit(): IcurrentCredit{
    return this.detalle.creditInProgress;
  }

  getClienteNextCredit(): InextCredit{
    return this.detalle.nextCredit;
  }
}

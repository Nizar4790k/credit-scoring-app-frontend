import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Ireporte } from '../interfaces/ireporte';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  acceso = new EventEmitter<boolean>();
  reporte: any;

  hostUrl = environment.hostUrl
  reporteUrl = "/reporte";

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  async getReporte(){

    await this.http.get(this.hostUrl + this.reporteUrl, {observe: 'response'}).subscribe(data => {
      if(data.status === 200){
        this.reporte = data.body;
        this.acceso.emit(true);
      } 
    }, error => {
      this.toastr.error("Hubo un error al intentar completar esta solicitud.", "Error en el servidor")
    });
  }

  setReporte(): Ireporte{
    return this.reporte.reportes;
  }
}

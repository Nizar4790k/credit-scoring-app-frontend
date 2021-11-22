import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-puntaje',
  templateUrl: './puntaje.component.html',
  styleUrls: ['./puntaje.component.css']
})
export class PuntajeComponent implements OnInit {
  cliente: string = "";
  datos: any = {};
  color: string = '';

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {                          
    this.getCliente();    
  }

  async getCliente(){
    if(sessionStorage['info'] == null){
      this.cliente = await this.clienteService.getDatosCliente();
      this.datos = await this.clienteService.getDatos();
      this.setDatos(); 
    }
    else{
      let info = JSON.parse(sessionStorage.getItem('info') || '{}');
      this.cliente = info['cliente'];
      this.datos = info['datos'];
      this.color = info['color'];

      sessionStorage.removeItem('info');
    }                
  }

  setDatos(){
    if(this.datos['ProbabilidadImpago'] <= 0.33)
      this.color = 'green';
    else if(this.datos['ProbabilidadImpago'] <= 0.66 && this.datos['ProbabilidadImpago'] >= 0.33)
      this.color = 'orange';
    else
      this.color = 'red';
  }

  @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any){
      let info: any = {
        datos: this.datos,
        color: this.color,
        cliente: this.cliente
      }

    sessionStorage.setItem('info', JSON.stringify(info))
  }
}

import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-siguiente-credito',
  templateUrl: './siguiente-credito.component.html',
  styleUrls: ['./siguiente-credito.component.css']
})
export class SiguienteCreditoComponent implements OnInit {
  nextCredit: any;
  servicios: any;
  constructor(private clienteService: ClienteService) {
    this.nextCredit = 0;
   }

  ngOnInit(): void {
    this.verificarTimepoAcceso();
    this.getNextCredit();
  }

  verificarTimepoAcceso(){
    if(sessionStorage['acces_token'] != null && sessionStorage['auth_token'] != null){
      let fecha1 = moment(sessionStorage['fechaLogin']);
      let fecha2 = moment(new Date());
      
      if(fecha2.diff(fecha1, 'minutes') >= 20){
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('auth_token')
        sessionStorage.removeItem('access_token')
        sessionStorage.removeItem('fechaLogin')
      }
    }
  }

  getNextCredit(){
    this.nextCredit = this.clienteService.getClienteNextCredit();
    this.setDatos();
  }

  setDatos(){
    const servicios = () => {
      const opciones = [
        {
          valor: "Casa",
          value: "home"
        },
        {
          valor: "Carro",
          value: "car"
        },
        {
          valor: "Ajuar",
          value: "couch"
        },
        {
          valor: "Viajes",
          value: "plane-alt"
        }
      ];
      let servicios: any[] = [];

      if(this.nextCredit >= 1500000){
        for(let i=0; i < 4; i++){
          servicios.push(opciones[i]);
        }
      }
      else if(this.nextCredit < 1500000 && this.nextCredit >= 300000){
        for(let i=1; i < 4; i++){
          servicios.push(opciones[i]);
        }
      }
      else if(this.nextCredit < 300000 && this.nextCredit >= 50000){
        for(let i=3; i < 4; i++){
          servicios.push(opciones[i]);
        }
      }

      return servicios;
    }

    this.servicios = servicios();
  }
}

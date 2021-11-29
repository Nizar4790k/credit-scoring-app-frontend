import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-credito-actual',
  templateUrl: './credito-actual.component.html',
  styleUrls: ['./credito-actual.component.css']
})
export class CreditoActualComponent implements OnInit {
  currentCredit: any;

  constructor(private clienteService: ClienteService) { 
    this.currentCredit = {
      loans: {
        loansQuantity: 0,
        loanStatusCount: {
          completed: 0,
          inProgress: 0,
        }
      },
      payments: {
        goodPayments: 0,
        badPayments: 0,
      },
      currentLoans: {
        totalAmount: 0,
        totalPayments: 0,
        payments: {
          goodPayments: 0,
          badPayments: 0,
        },
        totalMount: 0,
      }
    }
  }

  ngOnInit(): void {
    this.verificarTimepoAcceso();
    this.getCurrentCredit();
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

  getCurrentCredit(){
    this.currentCredit = this.clienteService.getClienteCurrentCredit();
  }
}

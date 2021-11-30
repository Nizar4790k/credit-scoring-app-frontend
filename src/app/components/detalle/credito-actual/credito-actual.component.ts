import { Component, OnInit } from '@angular/core';
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
    this.getCurrentCredit();
  }

  getCurrentCredit(){
    this.currentCredit = this.clienteService.getClienteCurrentCredit();
  }
}

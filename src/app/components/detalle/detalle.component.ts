import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import * as moment from 'moment';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  clienteNombre: string = "";

  constructor(private clienteService: ClienteService, private rutaActiva: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if(sessionStorage['cliente'] != " "){
      this.clienteService.setCliente(JSON.parse(sessionStorage.getItem('cliente') || '{}'));
      sessionStorage.removeItem('cliente');
    }
    this.verificarTimepoAcceso();
    this.getClienteNombre();   
  }

  verificarTimepoAcceso(){
    if(sessionStorage['acces_token'] != null && sessionStorage['auth_token'] != null){
      let fecha1 = moment(sessionStorage['fechaLogin']);
      let fecha2 = moment(new Date());
      
      if(fecha2.diff(fecha1, 'minutes') >= 15){
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('auth_token')
        sessionStorage.removeItem('access_token')
        sessionStorage.removeItem('fechaLogin')

        this.router.navigateByUrl('/login');
      }
    }
  }

  getClienteNombre(){

    if(sessionStorage['clienteNombre'] == " "){
      let nombre = this.clienteService.getClientePerfil().FirstName + " ";
      let segundoNombre = this.clienteService.getClientePerfil().MiddleName == null ?  null 
      : this.clienteService.getClientePerfil().MiddleName + " ";
      let apellidos = this.clienteService.getClientePerfil().LastName;
      
      this.clienteNombre = nombre + segundoNombre + apellidos; 
    }
    else{
      this.clienteNombre = sessionStorage.getItem('clienteNombre') || " ";

      sessionStorage.removeItem('clienteNombre');
    }
  }

  @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any){

    sessionStorage.setItem("clienteNombre", this.clienteNombre);
    sessionStorage.setItem('cliente', JSON.stringify(this.clienteService.detalle));
  }
}

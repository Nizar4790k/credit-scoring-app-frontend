import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  clienteNombre: string = "";

  constructor(private clienteService: ClienteService,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if(sessionStorage['cliente'] === undefined)
      this.router.navigateByUrl("/inicio");
    else if(sessionStorage['cliente'] != "unset"){
      this.clienteService.setCliente(JSON.parse(sessionStorage.getItem('cliente') || '{}'));
      sessionStorage.removeItem('cliente');
    }
    this.verificarTimepoAcceso();
    this.getClienteNombre();   
  }

  verificarTimepoAcceso(){
    if(sessionStorage['access_token'] != null && sessionStorage['auth_token'] != null){      
      setTimeout(() => {
        this.toastr.warning(
          "Por seguridad, su tiempo en sesión acabará en 1 minuto.",
          "Cierre de sesón", {
            progressBar: true,
            timeOut: 60000,
            enableHtml: true
          }
        );
      }, 1140000);
      setTimeout(() => {
        sessionStorage.clear();
        location.href = "/login";
      }, 1200000);
    }
  }

  getClienteNombre(){

    if(sessionStorage['clienteNombre'] == "unset"){
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

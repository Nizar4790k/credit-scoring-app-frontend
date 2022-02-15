import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Iacceso } from 'src/app/interfaces/iacceso';
import { ClienteService } from 'src/app/services/cliente.service';

 @Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  clienteForm!: FormGroup;
  spinner = false;
  actor = true;
  constructor(private fb: FormBuilder, private router: Router, private clienteServices: ClienteService) {
      if(sessionStorage['auth_token'] == null && sessionStorage['access_token'] == null){
        this.clienteForm = this.fb.group({
          usercode: ["", [Validators.required, Validators.minLength(5)]]
        })
      }
      else
        this.actor = false;
    }

  ngOnInit(): void {
    if(sessionStorage['usuario'] == null)
      this.router.navigateByUrl('/login')
  }

  buscarCliente(){
    this.spinner = true;
    let acceso: Iacceso;

    if(this.actor){
      acceso = {
        profileId: this.clienteForm.get('usercode')?.value,
        auth_token: "",
        access_token: ""
      };
    }
    else{
      acceso = {
        profileId: sessionStorage.getItem('clienteCodigo') || " ",
        auth_token: sessionStorage.getItem('auth_token') || " ",
        access_token: sessionStorage.getItem('access_token') || " "
      };
    }
    this.clienteServices.setAccess(acceso);
    this.clienteServices.acceso.subscribe(data => {
      if(data){
        sessionStorage.setItem("clienteNombre", "unset");
        sessionStorage.setItem('cliente', "unset");
        //this.router.navigateByUrl('/detalle')
      }
      else{
        this.spinner = false;
      }
    });
  }
  
  entradaAlerta(): string{
    let resp = "";

    if(this.clienteForm.get('usercode')?.invalid && this.clienteForm.get('usercode')?.touched)
      resp ="red";
    else if(this.clienteForm.get('usercode')?.valid && this.clienteForm.get('usercode')?.touched) 
      resp = "green";
    else
      resp = "text-primary";
    
    return resp + "!important";
  }
}
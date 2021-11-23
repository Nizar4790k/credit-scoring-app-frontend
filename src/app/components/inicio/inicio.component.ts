import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';

 @Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  clienteForm: FormGroup;
  spinner = false;

  constructor(private fb: FormBuilder, private router: Router, private clienteServices: ClienteService, 
    private toastr: ToastrService) {
      this.clienteForm = this.fb.group({
        usercode: ["", [Validators.required, Validators.minLength(5)]]
      })
    }

  ngOnInit(): void {
    if(sessionStorage['usuario'] == null)
      this.router.navigateByUrl('/login')
  }

  buscarCliente(){
    this.spinner = true;
    const cliente = this.clienteForm.get('usercode')?.value;

    this.router.navigateByUrl('/detalle/' + cliente)
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
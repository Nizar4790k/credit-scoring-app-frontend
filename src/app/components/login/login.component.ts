import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Iusuario } from 'src/app/interfaces/iusuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarioForm: FormGroup;
  spinner = false;
  boton = false;
  
    constructor(private fb: FormBuilder, private toastr: ToastrService,
      private usuarioServices: UsuarioService, private router: Router) { 
      this.usuarioForm = this.fb.group({
        usercode: ["", [Validators.required, Validators.minLength(5)]],
        user: ["", [Validators.required, Validators.minLength(5)]],
        pass: ["", [Validators.required, Validators.minLength(5)]]
      })
    }

  ngOnInit(): void {
    if(sessionStorage['usuario'] != null)
      this.router.navigateByUrl('/inicio')
  }

  buscarExisteUsuario(){
    this.spinner = true;

    if(this.usuarioForm.invalid){
      this.toastr.warning("Debe de llenar correctamente todos los campos.", "Inicio de sesión");
      this.spinner = false;
      return;
    }

    const usuario: Iusuario = {
      codigo: this.usuarioForm.get('usercode')?.value,
      user: this.usuarioForm.get('user')?.value,
      pass: this.usuarioForm.get('pass')?.value
    };

    if(this.boton){
      this.usuarioServices.getExisteUsuario(usuario).subscribe(data => {
        if(data == 'true'){
          sessionStorage.setItem('usuario', this.usuarioForm.get('user')?.value);
          location.href = "/inicio";
        }
        else
          this.toastr.error("No se encontró este usuario.", "Inicio de sesion")
        
      }, error => {
        this.toastr.error("Hubo un error al intentar completar esta solicitud.", "Error en el servidor");      
      });
    }
    else{

    }

    this.spinner = false;
  }

  estiloInput(inputName: string): string{
    let resp = "";

    if(this.usuarioForm.get(inputName)?.invalid && this.usuarioForm.get(inputName)?.touched)
      resp ="red";
    else if(this.usuarioForm.get(inputName)?.valid && this.usuarioForm.get(inputName)?.touched) 
      resp = "green";
    else
      resp = "black";
    
    return resp;
  }

  cambiarActor(actor: string){
    if(actor == 'c'){
      this.boton = false
    }
    else{
      if(this.boton){
        this.usuarioForm = this.fb.group({
          user: ["", [Validators.required, Validators.minLength(5)]],
          pass: ["", [Validators.required, Validators.minLength(5)]]
        })
      }
      else{
        this.usuarioForm = this.fb.group({
          user: ["", [Validators.required, Validators.minLength(5)]],
          pass: ["", [Validators.required, Validators.minLength(5)]]
        })
        this.boton = true
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Iacceso } from 'src/app/interfaces/iacceso';
import { Iusuario } from 'src/app/interfaces/iusuario';
import { ClienteService } from 'src/app/services/cliente.service';
import { UsuarioService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarioForm!: FormGroup;
  spinner = false;
  boton = false;
  
    constructor(private fb: FormBuilder, private toastr: ToastrService,
      private usuarioServices: UsuarioService, private clienteService: ClienteService, private router: Router) { 
      this.cargarForm();
    }

  ngOnInit(): void {
    if(sessionStorage['usuario'] != null)
      this.router.navigateByUrl('/inicio')
  }

  async buscarExisteUsuario(){
    this.spinner = true;

    if(this.usuarioForm.invalid){
      this.toastr.warning("Debe de llenar correctamente todos los campos.", "Inicio de sesión", {
        progressBar: true
      });
      this.spinner = false;
      return;
    }

    const usuario: Iusuario = {
      username: this.usuarioForm.get('user')?.value,
      password: this.usuarioForm.get('pass')?.value
    };

    if(this.boton){
      await this.usuarioServices.getExisteUsuario(usuario).subscribe(data => {
        console.log(data.status);
        if(data.status == 200){
          sessionStorage.setItem('usuario', this.usuarioForm.get('user')?.value);
          location.href = "/inicio";
        }                  
      }, error => {
        if(error.status = 404){
          this.toastr.error("No se encontró este usuario.", "Inicio de sesion", {
            progressBar: true
          });
        }
        else
          this.toastr.error("Hubo un error al intentar completar esta solicitud.", "Error en el servidor", {
            progressBar: true
          });

        this.spinner = false;      
      });
    }
    else{
      await this.clienteService.getExisteCliente(usuario).subscribe(data => {

        if(data.status == 200){
          sessionStorage.setItem('usuario', this.usuarioForm.get('user')?.value);
          sessionStorage.setItem('auth_token', data.body.auth_token)
          sessionStorage.setItem('access_token', data.body.access_token)
          sessionStorage.setItem('fechaLogin', new Date().toString())
          sessionStorage.setItem('clienteCodigo', data.body.codigoCliente)

          const acceso: Iacceso = {
            profileId: data.body.codigoCliente,
            auth_token: data.body.auth_token,
            access_token: data.body.access_token
          };

          this.clienteService.setAccess(acceso);
          this.clienteService.acceso.subscribe(data => {
            if(data){
              location.href = "/inicio";
            }
            else{
              this.spinner = false;
              sessionStorage.clear(); 
            }
          })
        }                  
      }, error => {
        if(error.status = 404){
          this.toastr.error("No se encontró este usuario.", "Inicio de sesion", {
            progressBar: true
          });
        }
        else
          this.toastr.error("Hubo un error al intentar completar esta solicitud.", "Error en el servidor", {
            progressBar: true
          });

        this.spinner = false;      
      });
    }
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
    this.cargarForm();
    if(actor == 'c'){
      this.boton = false
    }
    else{        
      this.boton = true      
    }    
  }

  cargarForm(){
    this.usuarioForm = this.fb.group({
      user: ["", [Validators.required, Validators.minLength(5)]],
      pass: ["", [Validators.required, Validators.minLength(5)]]
    })  
  }
}

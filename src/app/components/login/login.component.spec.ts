import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { UsuarioService } from 'src/app/services/empleado.service';
import { LoginComponent } from './login.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Component: Login', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [ReactiveFormsModule, FormsModule, HttpClientModule, RouterTestingModule, ToastrModule.forRoot()],
          declarations: [LoginComponent],
          providers: [ClienteService, UsuarioService, ToastrService],
      });
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      component.ngOnInit();
  });
 
  it('deberia iniciar sesion el cliente', () => {
    let loginElement: DebugElement;
    let debugElement = fixture.debugElement;
    let authService = debugElement.injector.get(ClienteService);
    spyOn(authService, 'getExisteCliente').and.callThrough();
    loginElement = fixture.debugElement.query(By.css('form'));
    component.boton = false;
    component.usuarioForm.controls['user'].setValue('credscoring_10');
    component.usuarioForm.controls['pass'].setValue('credscoring_10');
    loginElement.triggerEventHandler('ngSubmit', null);
    expect(sessionStorage["usuario"]).toEqual("credscoring_10")
  });

//---------------------------------------------------------------------------

  it('deberia iniciar sesion el empleado', () => {
    let loginElement: DebugElement;
    let debugElement = fixture.debugElement;
    let authService = debugElement.injector.get(UsuarioService);
    spyOn(authService, 'getExisteUsuario').and.callThrough();
    loginElement = fixture.debugElement.query(By.css('form'));
    component.boton = true;
    component.usuarioForm.controls['user'].setValue('anthonyde98');
    component.usuarioForm.controls['pass'].setValue('012345');
    loginElement.triggerEventHandler('ngSubmit', null);
    expect(sessionStorage["usuario"]).toEqual("anthonyde98")
  });
});

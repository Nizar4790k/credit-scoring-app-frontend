import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { InicioComponent } from './inicio.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('Component: Inicio', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;
  sessionStorage.setItem('usuario', 'anthonyde98')

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [ReactiveFormsModule, FormsModule, HttpClientModule, RouterTestingModule, ToastrModule.forRoot()],
          declarations: [InicioComponent],
          providers: [ClienteService, ToastrService],
      });
      fixture = TestBed.createComponent(InicioComponent);
      component = fixture.componentInstance;
      component.actor = true;
      component.ngOnInit(); 
  });
 
  it('deberia obtener informacion de detalle', () => {
    let loginElement: DebugElement;
    let debugElement = fixture.debugElement;
    let authService = debugElement.injector.get(ClienteService);
    fixture.detectChanges();
    spyOn(authService, 'setAccess').and.callThrough();
    loginElement = fixture.debugElement.query(By.css('form'));
    component.clienteForm.controls['usercode'].setValue('88888');
    loginElement.triggerEventHandler('ngSubmit', null);
    expect(sessionStorage["clienteNombre"]).toEqual("unset")
  });
//---------------------------------------------------------------------------

});

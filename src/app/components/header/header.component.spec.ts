import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReporteService } from 'src/app/services/reporte.service';
import { HeaderComponent } from './header.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let service: ReporteService;
  let http: HttpClient
  let toastr: ToastrService
  let router: Router
  
  beforeEach(() => {
    service = new ReporteService(http, toastr);
    component = new HeaderComponent(service, router);
    sessionStorage.setItem('usuario', "Usuario1")
  });

  /*it('Deberia de haber un usuario', () => {
    expect(component.usuario).toBeDefined();
  });*/
  
  it('Deberia de limpiar la sesion', () => {    
      component.cerrarSesion();
    expect(component.usuario).toBeUndefined();
  });
});

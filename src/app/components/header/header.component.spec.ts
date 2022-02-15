import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from './header.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReporteService } from 'src/app/services/reporte.service';

describe('Component: Reporte', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  sessionStorage.setItem('usuario', 'anthonyde98')

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientModule, RouterTestingModule, ToastrModule.forRoot()],
          declarations: [HeaderComponent],
          providers: [ReporteService, ToastrService],
      });
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      component.ngOnInit(); 
  });
 
  it('deberia obtener reporte', () => {
    let ReportElement: DebugElement;
    let debugElement = fixture.debugElement;
    let authService = debugElement.injector.get(ReporteService);
    fixture.detectChanges();
    spyOn(authService, 'getReporte').and.callThrough();
    ReportElement = fixture.debugElement.query(By.css('.reporte'));
    ReportElement.nativeElement.click()
    expect(sessionStorage['reporte']).toEqual('unset');
  });

  it('deberia cerrar sesion', () => {
    let ReportElement: DebugElement;
    let debugElement = fixture.debugElement;
    fixture.detectChanges();
    ReportElement = fixture.debugElement.query(By.css('.btn'));
    ReportElement.nativeElement.click()
    expect(sessionStorage['usuario']).toEqual(undefined);
  });
//---------------------------------------------------------------------------

});

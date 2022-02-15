import { ToastrService } from 'ngx-toastr';
import { ReporteComponent } from './reporte.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReporteService } from 'src/app/services/reporte.service';
import { HttpClientModule } from '@angular/common/http';

describe('Component: Reporte', () => {
  let component: ReporteComponent;
  let fixture: ComponentFixture<ReporteComponent>;
  sessionStorage.setItem('usuario', 'anthonyde98')

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientModule, RouterTestingModule, ToastrModule.forRoot()],
          declarations: [ReporteComponent],
          providers: [ReporteService, ToastrService],
      });
      fixture = TestBed.createComponent(ReporteComponent);
      component = fixture.componentInstance;
      component.ngOnInit();
  });
  
  it('deberia obtener reporte', () => {

    let ReportElement: DebugElement;
    let debugElement = fixture.debugElement;
    fixture.detectChanges();
    ReportElement = fixture.debugElement.query(By.css('.descargar'));
    ReportElement.nativeElement.click();
    expect(component.spinner).toBeTruthy();
  });
//---------------------------------------------------------------------------

});

import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ReporteService } from 'src/app/services/reporte.service';
import { ReporteComponent } from './reporte.component';


describe('ReporteComponent', () => {
  let component: ReporteComponent;
  let service: ReporteService;
  let http: HttpClient
  let toastr: ToastrService

  beforeEach(() => {
    service = new ReporteService(http, toastr);
    component = new ReporteComponent(service);
    component.spinner = true;
  });
  
  it('Deberia de limpiar la sesion', () => {    
      component.downloadPDF()
      expect(component.spinner).toBeFalse()
  });
});

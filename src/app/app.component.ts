import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'credit-scoring-front-end';

  constructor(private toastr: ToastrService){
    this.verificarTimepoAcceso();
  }

  verificarTimepoAcceso(){
    if(sessionStorage['access_token'] != null && sessionStorage['auth_token'] != null){      
      let fecha1 = moment(new Date(sessionStorage['fechaLogin']));
      let fecha2 = moment(new Date());

      let tiempo = fecha2.diff(fecha1, 'minutes');

      if((1140000 - (tiempo * 60000)) > 0){
        setTimeout(() => {
          this.toastr.warning(
            "Por seguridad, su tiempo en sesión acabará en 1 minuto.",
            "Cierre de sesón", {
              progressBar: true,
              timeOut: 5000,
              enableHtml: true
            }
          );
        }, 1140000 - (tiempo * 60000));
      }
      setTimeout(() => {
        sessionStorage.clear();
        location.href = "/login";
      }, 1200000 - (tiempo * 60000));
    }
  }
}

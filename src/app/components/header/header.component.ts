import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
usuario: string;
token: boolean;
spinner = false;

  constructor(private reporteService: ReporteService, private router: Router) { 
    this.usuario = sessionStorage['usuario'];
    this.token = sessionStorage['access_token'] == null && sessionStorage['auth_token'] == null ? true : false;
  }

  ngOnInit(): void {
    
  }

  setReporte(){
    this.spinner = true;
    this.reporteService.getReporte();
    this.reporteService.acceso.subscribe(data => {
      if(data){
        this.spinner = false;
        sessionStorage.setItem('reporte', "unset");
        this.router.navigateByUrl('/reporte')
      }
    })
  }

  cerrarSesion(){
    sessionStorage.clear();
    location.href = "/login";
  }
}

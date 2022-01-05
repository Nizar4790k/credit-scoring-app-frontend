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
aniosSelect: number[] = [new Date().getFullYear()];

  constructor(private reporteService: ReporteService, private router: Router) { 
    this.usuario = sessionStorage['usuario'];
    this.token = sessionStorage['access_token'] == null && sessionStorage['auth_token'] == null ? true : false;
  }

  ngOnInit(): void {
    this.setSelect();
  }

  setReporte(anio?: number){
    this.spinner = true;
    this.reporteService.getReporte(anio = anio == null ? new Date().getFullYear() : anio);
    this.reporteService.acceso.subscribe(data => {
      if(data){
        this.spinner = false;
        sessionStorage.setItem('reporte', "unset");
        this.router.navigateByUrl('reporte');
      }
      else{
        this.spinner = false;
      }
    })
  }

  cerrarSesion(){
    sessionStorage.clear();
    location.href = "/login";
  }

  setSelect(){
    for(let i = 1; i < 5; i++)
      this.aniosSelect.push(this.aniosSelect[0] - i);
  }
}

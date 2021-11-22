import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
usuario: string;
  constructor() { 
    this.usuario = sessionStorage['usuario'];
  }

  ngOnInit(): void {
    
  }

  cerrarSesion(){
    sessionStorage.removeItem('usuario');
    sessionStorage.clear();
    location.href = "/login";
  }
}

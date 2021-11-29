import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
usuario: string;
token: boolean;

  constructor() { 
    this.usuario = sessionStorage['usuario'];
    this.token = sessionStorage['access_token'] == null && sessionStorage['auth_token'] == null ? true : false
  }

  ngOnInit(): void {
    
  }

  cerrarSesion(){
    sessionStorage.clear();
    location.href = "/login";
  }
}

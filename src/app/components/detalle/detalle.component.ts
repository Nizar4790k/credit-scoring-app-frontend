import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  clienteNombre!: string;

  constructor(private clienteService: ClienteService, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.setCliente();
    this.getClienteNombre();   
  }

  setCliente(){
    let codigo = this.rutaActiva.snapshot.params.codigo;
    this.clienteService.getCliente(codigo);    
  }

  getClienteNombre(){

    this.clienteService.clienteNombre.subscribe(data => {

      this.clienteNombre = data;
    })      
  }
}

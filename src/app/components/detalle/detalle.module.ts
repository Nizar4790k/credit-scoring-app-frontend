import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleRoutingModule } from './detalle-routing.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

import { PuntajeComponent } from './puntaje/puntaje.component';
import { SiguienteCreditoComponent } from './siguiente-credito/siguiente-credito.component';
import { CreditoActualComponent } from './credito-actual/credito-actual.component';
import { InicioComponent } from './inicio/inicio.component';


@NgModule({
  declarations: [
    PuntajeComponent,
    SiguienteCreditoComponent,
    CreditoActualComponent,
    InicioComponent,
  ],
  imports: [
    CommonModule,
    DetalleRoutingModule,
    NgCircleProgressModule.forRoot(),
    RoundProgressModule
  ]
})
export class DetalleModule { }

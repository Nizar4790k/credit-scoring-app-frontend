import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CreditoActualComponent } from './credito-actual/credito-actual.component';
import { PuntajeComponent } from './puntaje/puntaje.component';
import { SiguienteCreditoComponent } from './siguiente-credito/siguiente-credito.component';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
  {
    path: '', 
    children:[
      {path: '', component: InicioComponent},
      {path: 'inicio', component: InicioComponent},
      {path: 'puntaje', component: PuntajeComponent},
      {path: 'siguiente-credito', component: SiguienteCreditoComponent},
      {path: 'credito-actual', component: CreditoActualComponent}
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalleRoutingModule { }

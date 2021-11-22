import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DetalleComponent } from './components/detalle/detalle.component';

const pathdes: Route = sessionStorage['usuario'] == null ? 
{path: '**', pathMatch: 'full', redirectTo: 'login'} : 
{path: '**', pathMatch: 'full', redirectTo: 'inicio'}

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'inicio', component: InicioComponent},
  {
    path: 'detalle/:codigo', component: DetalleComponent,
    loadChildren: () => import('./components/detalle/detalle.module').then(m => m.DetalleModule),
  },
  pathdes,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

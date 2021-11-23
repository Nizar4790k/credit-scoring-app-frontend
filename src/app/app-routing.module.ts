import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = sessionStorage['usuario'] == null ? 
  [{path: 'login', component: LoginComponent}, {path: '**', pathMatch: 'full', redirectTo: 'login'} ] : [
  {path: 'inicio', component: InicioComponent},
  {
    path: 'detalle/:codigo', component: DetalleComponent,
    loadChildren: () => import('./components/detalle/detalle.module').then(m => m.DetalleModule),
  },
  {path: 'notFound', component: NotFoundComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'inicio'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

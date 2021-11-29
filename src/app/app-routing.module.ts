import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReporteComponent } from './components/reporte/reporte.component';

const AdminRoute: Route = sessionStorage['auth_token'] == null && sessionStorage['access_token'] == null ? 
{path: 'reporte', component: ReporteComponent} : {path: 'reporte', component: NotFoundComponent};

const routes: Routes = sessionStorage['usuario'] == null ? 
[{path: 'login', component: LoginComponent}, {path: '**', pathMatch: 'full', redirectTo: 'login'} ] : 
 [
  {path: 'inicio', component: InicioComponent},
  {
    path: 'detalle', component: DetalleComponent,
    loadChildren: () => import('./components/detalle/detalle.module').then(m => m.DetalleModule),
  },
  AdminRoute,
  {path: 'detalle/:codigo', component: NotFoundComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'inicio'}
 ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

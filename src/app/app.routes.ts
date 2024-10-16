import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';

export const routes: Routes = [
  {path: '', component: MainComponent},
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(mod => mod.LoginComponent),
  },

  {
    path: 'cadastro',
    loadComponent: () => import('./cadastro/cadastro.component').then(mod => mod.CadastroComponent),
  },
  {
    path: 'servico',
    loadComponent: () => import('./servico/servico.component').then(mod => mod.ServicoComponent),
  },
  {
    path: 'fisioterapeutas',
    loadComponent: () => import('./fisioterapeutas/fisioterapeutas.component').then(mod => mod.FisioterapeutasComponent),
  },
  {
    path: 'caso-clinico',
    loadComponent: () => import('./caso-clinico/caso-clinico.component').then(mod => mod.CasoClinicoComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

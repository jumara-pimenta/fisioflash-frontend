import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(mod => mod.LoginComponent),
  },

  {
    path: 'cadastro',
    loadComponent: () => import('./cadastro/cadastro.component').then(mod => mod.CadastroComponent),
  }
];
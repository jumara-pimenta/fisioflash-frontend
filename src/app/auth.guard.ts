import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const userType = this.authService.getUserType();

    // Se for um fisioterapeuta, permitir acesso ao dashboard
    if (userType === 'FIS') {
      return true;
    }

    // Se for um paciente, redirecionar para a tela de serviços
    if (userType === 'PAC') {
      this.router.navigate(['servicos']); 
      return false;
    }

    // Se o tipo de usuário não for reconhecido, redirecionar para login
    this.router.navigate(['login']);
    return false;
  }
}

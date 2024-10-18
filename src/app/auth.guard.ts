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
    console.log('User type:', userType);

    // Se for um fisioterapeuta, permitir acesso ao dashboard de fisioterapeuta
    if (userType === 'FIS') {
      return true;
    }

    // Se for um paciente, permitir acesso ao dashboard de paciente
    if (userType === 'PAC') {
      return true;
    }

    // Se o tipo de usuário não for reconhecido, redirecionar para login
    this.router.navigate(['login']);
    return false;
  }
}

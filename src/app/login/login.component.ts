import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService] 
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;  

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar) { }  

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.formGroup.get('email')?.patchValue('');
  }

  login() {
    if(this.formGroup.valid){
      const { email, password } = this.formGroup.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user_type', response.user_type);
          this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
            duration: 3000,
          });

          const userType = response.user_type; // Verifica o tipo de usuário
          if (userType === 'FIS') {
            this.router.navigate(['dashboard-fisioterapeuta']);
          } else {
            this.router.navigate(['servico']); 
          }
        },
        (error) => {
          this.snackBar.open('Erro no login: Email ou senha inválidos', 'Fechar', {
            duration: 3000,
          });
        }
      );
    }
    }
    
}

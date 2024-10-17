import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    CommonModule,
    MatSelectModule,
    MatIcon,
    MatSnackBarModule,
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
  providers: [AuthService] 
})
export class CadastroComponent implements OnInit {

  formGroup!: FormGroup;
  selectedFile: File | null = null;
  hidePassword = true;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      user_type: ['', Validators.required], 
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      data_nascimento: ['', [Validators.required]],
      sexo: ['', [Validators.required]], 
      cpf: ['', [Validators.required]],
      rg: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      rua: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      curriculo: [''],  
      registro_profissional: [''],
      minibio: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]], 
    });
}

  onFileChange(event: any) {
    const file = event.target.files[0];  // Captura o primeiro arquivo selecionado
    if (file) {
      this.selectedFile = file;  // Armazena o arquivo selecionado
      console.log('Arquivo selecionado:', this.selectedFile);
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  cancelar() {
    this.formGroup.reset(); 
    this.selectedFile = null;
  }

  salvar() {
    const formData = new FormData();
    
    formData.append('username', this.formGroup.get('email')?.value);
    formData.append('user_type', this.formGroup.get('user_type')?.value);
    formData.append('first_name', this.formGroup.get('first_name')?.value);
    formData.append('last_name', this.formGroup.get('last_name')?.value);
    formData.append('data_nascimento', this.formGroup.get('data_nascimento')?.value);
    formData.append('sexo', this.formGroup.get('sexo')?.value);
    formData.append('cpf', this.formGroup.get('cpf')?.value);
    formData.append('rg', this.formGroup.get('rg')?.value);
    formData.append('telefone', this.formGroup.get('telefone')?.value);
    formData.append('rua', this.formGroup.get('rua')?.value);
    formData.append('numero', this.formGroup.get('numero')?.value);
    formData.append('bairro', this.formGroup.get('bairro')?.value);
    formData.append('cep', this.formGroup.get('cep')?.value);
    if (this.formGroup.get('user_type')?.value === 'FIS') {
      formData.append('registro_profissional', this.formGroup.get('registro_profissional')?.value);
    }
    if (this.formGroup.get('user_type')?.value === 'FIS') {
      formData.append('minibio', this.formGroup.get('minibio')?.value);
    }
    formData.append('email', this.formGroup.get('email')?.value);
    formData.append('password', this.formGroup.get('password')?.value);
  
    if (this.selectedFile) {
      formData.append('curriculo', this.selectedFile);
    }
  
    // Chama o serviço para enviar os dados
    this.authService.registerUser(formData).subscribe(response => {
      this.snackBar.open('Cadastro realizado com sucesso!', 'Fechar', {
        duration: 3000, 
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: ['success-snackbar']
      });
      this.router.navigate(['login']);
    }, error => {
      this.snackBar.open('Erro ao realizar o cadastro. Tente novamente.', 'Fechar', {
        duration: 3000, 
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: ['error-snackbar']
      });
    });
  }
  

}

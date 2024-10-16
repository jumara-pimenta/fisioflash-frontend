import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatError, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-caso-clinico',
  standalone: true,
  imports: [
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatError,
    MatDialogModule,
    MatButtonModule,
    RouterModule, 
    CommonModule
  ],
  templateUrl: './caso-clinico.component.html',
  styleUrls: ['./caso-clinico.component.css'],
  providers: [AuthService]
})
export class CasoClinicoComponent implements OnInit {

  formGroup!: FormGroup;
  fisioterapeutaId!: number;
  servicoId!: number;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog 
  ) {}

  ngOnInit(): void {
    this.fisioterapeutaId = +this.route.snapshot.queryParams['fisioterapeuta'];
    this.servicoId = +this.route.snapshot.queryParams['servico'];

    const pacienteId = localStorage.getItem('user_id');
    if (!pacienteId) {
      console.error('Erro: O ID do paciente não foi encontrado no localStorage.');
    }

    this.formGroup = this.formBuilder.group({
      descricao: ['', [Validators.required]]
    });
  }

  enviarCasoClinico() {
    const casoClinico = {
      descricao: this.formGroup.get('descricao')?.value,
      paciente: localStorage.getItem('user_id'),
      fisioterapeuta: this.fisioterapeutaId,
      servico: this.servicoId
    };
  
    console.log('Enviando caso clínico:', casoClinico);
  
    this.authService.criarCasoClinico(casoClinico).subscribe(response => {
      const dialogRef = this.dialog.open(ConfirmacaoDialog, {
        width: '550px',
        disableClose: true // Impede o fechamento ao clicar fora do diálogo
      }).afterClosed().subscribe(() => {
        this.formGroup.reset();  // Limpa o formulário após fechar o diálogo
      });
    }, error => {
      console.error('Erro ao criar caso clínico:', error);
    });
  }  
   
}

@Component({
  selector: 'confirmacao-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  styleUrls: ['./confirmacao-dialog.component.css'],
  template: `
<h1 mat-dialog-title class="dialog-title">Envio concluído</h1>
<div mat-dialog-content class="dialog-content">
  <p>Obrigado por escolher nossos serviços. Em breve, o profissional selecionado entrará em contato com você para agendar sua consulta.</p>
  <p>Em caso de dúvidas, entre em contato pelo e-mail:</p>
  <p class="email"><strong>fisioflash&#64;contato.com.br</strong></p>
</div>
<div mat-dialog-actions class="dialog-actions">
  <button mat-button [mat-dialog-close]="true" class="dialog-button">Fechar</button>
</div>
  `
})
export class ConfirmacaoDialog {}

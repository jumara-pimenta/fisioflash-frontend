import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatTableModule, MatCardModule, FormsModule, MatIcon],
  templateUrl: './dashboard-fisioterapeuta.component.html',
  styleUrls: ['./dashboard-fisioterapeuta.component.css'],
  providers: [AuthService]
})
export class DashboardFisioterapeutaComponent implements OnInit {
  displayedColumns: string[] = ['paciente', 'data_solicitacao', 'caso_clinico', 'servico', 'status'];
  solicitacoes: any[] = [];
  
  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const userType = this.authService.getUserType();

    if (userType === 'FIS') {
      this.carregarSolicitacoesFisioterapeuta();
    }
  }

  carregarSolicitacoesFisioterapeuta(): void {
    this.authService.getSolicitacoes().subscribe(data => {
      this.solicitacoes = data;
    }, error => {
      console.error('Erro ao carregar solicitações:', error);
    });
  }

  atualizarStatus(solicitacao: any): void {
    const updatedStatus = { status: solicitacao.status };
    this.authService.atualizarSolicitacao(solicitacao.id, updatedStatus).subscribe(() => {
      console.log('Status atualizado com sucesso!');
      this.snackBar.open('Status atualizado com sucesso!', 'Fechar', {
        duration: 3000,
      });
    }, error => {
      console.error('Erro ao atualizar status:', error);
      this.snackBar.open('Erro ao atualizar status', 'Fechar', {
        duration: 3000,
      });
    });
  }
}

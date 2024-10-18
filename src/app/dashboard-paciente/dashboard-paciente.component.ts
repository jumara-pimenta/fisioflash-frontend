import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {CommonModule, DatePipe} from '@angular/common';
import {MatCard, MatCardModule} from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableModule
} from '@angular/material/table';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-dashboard-paciente',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatTableModule, MatCardModule],
  templateUrl: './dashboard-paciente.component.html',
  styleUrl: './dashboard-paciente.component.css',
  providers: [AuthService]
})
export class DashboardPacienteComponent implements OnInit {

  displayedColumns: string[] = ['fisioterapeuta', 'data_solicitacao', 'caso_clinico', 'servico', 'status'];
  solicitacoes: any[] = [];

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.carregarSolicitacoes();
  }

  carregarSolicitacoes(): void {
    this.authService.getSolicitacoes().subscribe(data => {
      this.solicitacoes = data;
    }, error => {
      console.error('Erro ao carregar solicitações:', error);
    });
  }

}

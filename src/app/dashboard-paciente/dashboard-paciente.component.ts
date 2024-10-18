import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-paciente',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatTableModule, MatCardModule],
  templateUrl: './dashboard-paciente.component.html',
  styleUrls: ['./dashboard-paciente.component.css'],
  providers: [AuthService]
})
export class DashboardPacienteComponent implements OnInit {

  displayedColumns: string[] = ['fisioterapeuta', 'data_solicitacao', 'caso_clinico', 'servico', 'status'];
  solicitacoes: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const userType = this.authService.getUserType();

    if (userType === 'PAC') {
      this.carregarSolicitacoesPaciente();
    }
  }

  carregarSolicitacoesPaciente(): void {
    this.authService.getSolicitacoes().subscribe(data => {
      this.solicitacoes = data;
    }, error => {
      console.error('Erro ao carregar solicitações:', error);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatTableModule, MatCardModule],
  templateUrl: './dashboard-fisioterapeuta.component.html',
  styleUrls: ['./dashboard-fisioterapeuta.component.css'],
  providers: [AuthService]
})
export class DashboardFisioterapeutaComponent implements OnInit {
  displayedColumns: string[] = ['paciente', 'data_solicitacao', 'caso_clinico', 'servico', 'status'];
  solicitacoes: any[] = [];
  
  constructor(private authService: AuthService) {}

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

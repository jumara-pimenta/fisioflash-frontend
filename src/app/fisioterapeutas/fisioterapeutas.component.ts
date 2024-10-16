import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-fisioterapeutas',
  standalone: true,
  imports: [
    HttpClientModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatCardActions,
    MatCardSubtitle,
    CommonModule,
    RouterModule
  ],
  templateUrl: './fisioterapeutas.component.html',
  styleUrl: './fisioterapeutas.component.css',
  providers: [AuthService]
})
export class FisioterapeutasComponent {

  fisioterapeutasDetalhes: any[] = [];
  servicoId: number = 0;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.servicoId = +params['servico']; // Pega o ID do serviço da URL
      this.carregarFisioterapeutas();
    });
  }

  carregarFisioterapeutas() {
    this.authService.getFisioterapeutasPorServico(this.servicoId).subscribe(
      (data: any) => {
        console.log('Resposta da API:', data);
  
        // Verifica se a resposta é um array. Caso contrário, transforma em array.
        if (Array.isArray(data)) {
          this.fisioterapeutasDetalhes = data;  // Se for array, armazena diretamente
        } else if (data) {
          this.fisioterapeutasDetalhes = [data];  // Se for objeto, transforma em array
        }
  
        console.log('Fisioterapeutas Detalhes:', this.fisioterapeutasDetalhes);
      },
      (error) => {
        console.error('Erro ao carregar fisioterapeutas:', error);
      }
    );
  }

  escolherFisioterapeuta(fisioterapeutaId: number) {
    this.router.navigate(['caso-clinico'], { queryParams: { fisioterapeuta: fisioterapeutaId, servico: this.servicoId } });
  }
}

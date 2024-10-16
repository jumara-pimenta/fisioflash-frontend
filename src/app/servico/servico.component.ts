import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-servico',
  standalone: true,
  imports: [
    HttpClientModule,
    MatButton,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './servico.component.html',
  styleUrl: './servico.component.css',
  providers: [AuthService] 
})
export class ServicoComponent implements OnInit {

  servicos: any[] = [];

  constructor(private router: Router, private authService: AuthService,) { }


  ngOnInit(): void {
    this.authService.getServicos().subscribe(data => {
      this.servicos = data;
    });
  }

  selecionarServico(servicoId: number) {
    this.router.navigate(['fisioterapeutas'], { queryParams: { servico: servicoId } });
  }

}

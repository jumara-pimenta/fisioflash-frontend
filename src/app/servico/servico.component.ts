import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-servico',
  standalone: true,
  imports: [
    MatButton,
    MatCardModule],
  templateUrl: './servico.component.html',
  styleUrl: './servico.component.css'
})
export class ServicoComponent implements OnInit {

  constructor(private router: Router) {
  }


  ngOnInit() {
  }

}

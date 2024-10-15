import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service'; 
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
    MatIcon
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [AuthService] 
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

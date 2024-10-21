import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, MatToolbarModule, MatButtonModule, RouterModule, CommonModule, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [AuthService]
})
export class AppComponent implements OnInit {
  title = 'fisioflash-frontend';

  userType: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userType = this.authService.getUserType();
  }

  isPaciente(): boolean {
    return this.userType === 'PAC';
  }

  isFisioterapeuta(): boolean {
    return this.userType === 'FIS';
  }
}

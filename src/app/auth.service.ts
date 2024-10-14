import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/token/'; 
  private cadastroUrl = 'http://127.0.0.1:8000/api/fisioflash/clinica/usuario/'

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password });
  }

  getProtectedData(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.get('http://127.0.0.1:8000/api/protected-endpoint/', { headers });
  }

  registerUser(formData: FormData): Observable<any> {
    return this.http.post(this.cadastroUrl, formData);
  }

}

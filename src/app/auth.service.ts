import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

interface AuthResponse {
  token: string;
  user_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/fisioflash/clinica';
  private apiTokenUrl = 'http://127.0.0.1:8000/api/token/'; 
  private cadastroUrl = 'http://127.0.0.1:8000/api/fisioflash/clinica/usuario/'

  constructor(private http: HttpClient) {}

    // Adiciona o token no cabeçalho de autorização
    private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      return new HttpHeaders({
        'Authorization': `Token ${token}`
      });
    }

  login(email: string, password: string): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(this.apiTokenUrl, { email, password }).pipe(
        tap(response => {
          localStorage.setItem('token', response.token);  
          localStorage.setItem('user_id', response.user_id.toString());
      })
    );
  }

  registerUser(formData: FormData): Observable<any> {
    return this.http.post(this.cadastroUrl, formData);
  }

  getServicos(): Observable<any> {
    const headers = this.getHeaders();
    console.log('Headers:', headers); 
    return this.http.get(`${this.apiUrl}/servico/`, { headers });
  }

  getFisioterapeutasPorServico(servicoId: number): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/servico_fisioterapeuta/${servicoId}/`, { headers });
  }

  criarCasoClinico(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/caso_clinico/`, data, { headers });
  }

  getDetalhesFisioterapeuta(fisioterapeutaId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/usuario/${fisioterapeutaId}/`, { headers });
  }

}

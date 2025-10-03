// Un servicio Angular (singleton) para hablar con tu backend:

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  // Usa environment.apiBase como prefijo para todas las rutas:
  private base = environment.apiBase; 
  // Lo llamas con HttpClient y devuelve Observables.
  constructor(private http: HttpClient) {}

  // login(correo, contrasena): POST /auth/login
  login(correo: string, contrasena: string): Observable<any> {
    return this.http.post(`${this.base}/auth/login`, { correo, contrasena });
  }
 
  // cuentasDeUsuario(usuarioId): GET /cuentas/usuario/:id
  cuentasDeUsuario(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/cuentas/usuario/${usuarioId}`);
  }
}

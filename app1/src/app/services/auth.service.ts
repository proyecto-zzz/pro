// Servicio de autenticación para nuestra app:

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


export interface User {
  usuario_id: number;
  rol_id: 1|2|3;
  nombre: string;
  ape_pat: string;
  ape_mat?: string;
}

@Injectable({ providedIn: 'root' })

export class AuthService {
  private KEY = 'bank_user'; // Se guarda la sesión en localStorage con la clave bank_user.
  private base = environment.apiBase; // usa environment.apiBase para llamar a POST /auth/login.

  constructor(private http: HttpClient, private router: Router) {}

  // Hace la petición, y en tap(...) guarda el user retornado en localStorage
  login(correo: string, contrasena: string): Observable<any> {
    return this.http.post(`${this.base}/auth/login`, { correo, contrasena }).pipe(
      tap((res: any) => {
        const user: User = res.user;
        localStorage.setItem(this.KEY, JSON.stringify(user)); // --> localStorage
      })
    );
  }

  // logout(): borra bank_user y navega a /login.
  logout(navigate = true): void {
    localStorage.removeItem(this.KEY);
    if (navigate) this.router.navigate(['/login']);
  }

  // getUser(): lee y parsea el usuario desde localStorage.
  getUser(): User | null {
    const raw = localStorage.getItem(this.KEY);
    return raw ? JSON.parse(raw) as User : null;
  }

  // isLoggedIn(): true si hay usuario guardado.
  isLoggedIn(): boolean { return !!this.getUser(); }

  // getUserRole(): traduce rol_id (1/2/3) a 'cliente' | 'ejecutivo' | 'gerente'.
  getUserRole(): 'cliente'|'ejecutivo'|'gerente'|null {
    const rol = this.getUser()?.rol_id;
    if (rol === 1) return 'cliente';
    if (rol === 2) return 'ejecutivo';
    if (rol === 3) return 'gerente';
    return null;
  }

  // hasRole(roles): verifica si el rol_id actual está en la lista permitida (para guards).
  hasRole(roles: number[]): boolean {
    const r = this.getUser()?.rol_id;
    return !!r && roles.includes(r);
  }

  // setUserRole(role): 
  // utilidad de compatibilidad: actualiza el rol_id en localStorage según el nombre del rol.
  setUserRole(role: 'cliente'|'ejecutivo'|'gerente'): void {
    const map: Record<'cliente'|'ejecutivo'|'gerente', 1|2|3> = {
      cliente: 1, ejecutivo: 2, gerente: 3
    };
    const u = this.getUser() ?? {
      usuario_id: 0, nombre: '', ape_pat: '', rol_id: map[role]
    } as any;
    u.rol_id = map[role];
    localStorage.setItem(this.KEY, JSON.stringify(u));
  }

  // Añade dentro de tu AuthService:
  getUserRoleId(): 1|2|3|null {
    return (this.getUser()?.rol_id ?? null) as 1|2|3|null;
  }
}

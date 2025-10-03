import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    // Debe haber sesión
    if (!this.auth.isLoggedIn()) {
      return this.router.parseUrl('/login');
    }

    // Política declarada en la ruta
    const expectedRole = route.data['expectedRole'] as ('cliente'|'ejecutivo'|'gerente'|undefined);
    const rolesArray  = route.data['roles'] as number[] | undefined;

    // Rol actual
    const roleName = this.auth.getUserRole();
    const roleId   = this.auth.getUser()?.rol_id; 

    // Si no hay rol legible por alguna razón, manda a login
    if (!roleName) return this.router.parseUrl('/login');

    // Mapa de dashboard por rol
    const dashboard: Record<'cliente'|'ejecutivo'|'gerente', string> = {
      cliente: '/cliente',
      ejecutivo: '/ejecutivo',
      gerente: '/gerente'
    };

    // Validación por nombre
    if (expectedRole && roleName !== expectedRole) {
      return this.router.parseUrl(dashboard[roleName]);
    }

    // Validación por id
    if (rolesArray && (!roleId || !rolesArray.includes(roleId))) {
      return this.router.parseUrl(dashboard[roleName]);
    }
 
    //Autorizado
    return true;
  }
}

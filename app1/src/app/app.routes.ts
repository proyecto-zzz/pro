import { Routes } from '@angular/router';
import { Gerente } from './pages/gerente/gerente';
import { Login } from './pages/login/login';
import { Forget } from './pages/forget/forget';
import { Cliente } from './pages/cliente/cliente';
import { Registro } from './pages/registro/registro'; 
import { Registro2 } from './pages/registro2/registro2';
import { Registro3 } from './pages/registro3/registro3';
import { Ejecutivo } from './pages/ejecutivo/ejecutivo';
import { AbrirCuentas } from './pages/abrir-cuentas/abrir-cuentas';
import { AutorizarSolicitudes } from './pages/autorizar-solicitudes/autorizar-solicitudes';
import { CerrarCuentas } from './pages/cerrar-cuentas/cerrar-cuentas';
import { ConsultarCuentas } from './pages/consultar-cuentas/consultar-cuentas';
import { SolicitudesC } from './pages/solicitudes-c/solicitudes-c';
import { RetirosC } from './pages/retiros-c/retiros-c';
import { PagosC } from './pages/pagos-c/pagos-c';
import { TransferenciasC } from './pages/transferencias-c/transferencias-c';
import { CuentaDetalle } from './pages/cuenta-detalle/cuenta-detalle';

import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'forget', component: Forget },
  { path: 'registro', component: Registro },
  { path: 'registro2', component: Registro2 },
  { path: 'registro3', component: Registro3 },

  // Privadas por rol (AuthGuard primero, luego RoleGuard)
  { path: 'gerente', component: Gerente, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'gerente' } },
  { path: 'cliente', component: Cliente, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'cliente' } },

  { path: 'solicitudesc', component: SolicitudesC, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'cliente' } },
  { path: 'retiros', component: RetirosC, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'cliente' } },
  { path: 'transferencias', component: TransferenciasC, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'cliente' } },
  { path: 'pagos', component: PagosC, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'cliente' } },
  { path: 'cuenta', component: CuentaDetalle, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'cliente' } },

  { path: 'ejecutivo', component: Ejecutivo, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ejecutivo' } },
  { path: 'abrir-cuentas', component: AbrirCuentas, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ejecutivo' } },
  { path: 'cerrar-cuentas', component: CerrarCuentas, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ejecutivo' } },
  { path: 'consultar-cuentas', component: ConsultarCuentas, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ejecutivo' } },

  { path: 'autorizar-solicitudes', component: AutorizarSolicitudes, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'gerente' } },

  { path: '**', redirectTo: 'login' }
];

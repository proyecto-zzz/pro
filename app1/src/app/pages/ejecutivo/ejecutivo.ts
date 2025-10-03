import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ejecutivo',
  standalone: true, // componente standalone
  imports: [CommonModule], // *ngIf, *ngFor, etc.
  templateUrl: './ejecutivo.html',
  styleUrls: ['./ejecutivo.css']
})

export class Ejecutivo {
  nombre = 'Ejecutivo'; // título/nombre mostrado en la vista

  constructor(private router: Router) {}

  salir(): void { this.router.navigate(['/login']); } // volver a login
  irAbrirCuentas(): void { this.router.navigate(['/abrir-cuentas']); } // ir a apertura
  irAutorizar(): void { this.router.navigate(['/autorizar-solicitudes']); } // ir a autorizaciones
  irCerrar(): void { this.router.navigate(['/cerrar-cuentas']); } // ir a cierres
  irConsultar(): void { this.router.navigate(['/consultar-cuentas']); } // ir a consulta
}

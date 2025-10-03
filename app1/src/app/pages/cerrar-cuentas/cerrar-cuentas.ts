import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

type Estado = 'pendiente' | 'cerrada'; // estados posibles del cierre

interface Cierre {
  cliente: string;
  motivo: string;
  fecha: string;
  estado: Estado;
}

@Component({
  selector: 'app-cerrar-cuentas',
  standalone: true, // componente standalone (sin NgModule)
  imports: [CommonModule], // *ngIf, *ngFor, etc.
  templateUrl: './cerrar-cuentas.html',
  styleUrls: ['./cerrar-cuentas.css']
})
export class CerrarCuentas {
  constructor(private router: Router) {}

  // Lista mock de solicitudes de cierre
  cierres: Cierre[] = [
    { cliente: 'Delia Zendejas Castro', motivo: 'Cierre de cuenta empresarial', fecha: '01 - Agosto - 2025', estado: 'pendiente' },
    { cliente: 'Juan Perez lopez',      motivo: 'Cierre de cuenta de ahorro',  fecha: '12 - Junio - 2025',  estado: 'pendiente' }
  ];

  showModal = false; // controla visibilidad del modal
  modalMsg = 'Cuenta cerrada exitosamente';

  regresar(): void { this.router.navigate(['/ejecutivo']); } // volver al panel del ejecutivo

  cerrar(i: number): void {
    this.cierres[i].estado = 'cerrada'; // marca la solicitud como cerrada
    this.modalMsg = 'Cuenta cerrada exitosamente';
    this.showModal = true; // muestra confirmación
  }

  aceptar(): void {
    this.showModal = false; // cierra el modal
  }
}

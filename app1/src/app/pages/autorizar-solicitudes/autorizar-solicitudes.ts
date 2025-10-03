import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

type Estado = 'pendiente' | 'autorizada' | 'rechazada';

interface Solicitud {
  cliente: string;
  tipo: string;
  fecha: string;
  monto?: string;
  estado: Estado;
}

@Component({
  selector: 'app-autorizar-solicitudes',
  standalone: true, // componente sin NgModule
  imports: [CommonModule],
  templateUrl: './autorizar-solicitudes.html',
  styleUrls: ['./autorizar-solicitudes.css']
})
export class AutorizarSolicitudes {
  constructor(private router: Router) {}

  // Datos de ejemplo en memoria
  solicitudes: Solicitud[] = [
    { cliente: 'Juan Pérez López', tipo: 'Préstamo', monto: '$30,000', fecha: '01 - Agosto - 2025', estado: 'pendiente' },
    { cliente: 'Delia Zendejas Castro', tipo: 'Tarjeta de crédito', fecha: '10 - Julio - 2025', estado: 'pendiente' }
  ];

  showModal = false; // visible/invisible del modal
  modalMsg = 'Solicitud autorizada exitosamente';

  regresar(): void { this.router.navigate(['/ejecutivo']); } // volver al panel

  autorizar(i: number): void {
    this.solicitudes[i].estado = 'autorizada'; // marca como autorizada
    this.modalMsg = 'Solicitud autorizada exitosamente';
    this.showModal = true;
  }

  rechazar(i: number): void {
    this.solicitudes[i].estado = 'rechazada'; // marca como rechazada
    this.modalMsg = 'Solicitud rechazada exitosamente';
    this.showModal = true;
  }

  aceptar(): void {
    this.showModal = false;   // cierra el modal
  }
}

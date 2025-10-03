import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Estructura para un movimiento de cuenta
interface Movimiento {
  fechaCab: string; // cabecera de fecha (ej. "4 JUNIO 2025")
  titulo: string; // concepto principal
  subtitulo: string; // detalle del concepto
  monto: string; // importe con signo
}

@Component({
  selector: 'app-cuenta-detalle',
  standalone: true, // componente standalone
  imports: [CommonModule], // *ngIf, *ngFor, etc.
  templateUrl: './cuenta-detalle.html',
  styleUrls: ['./cuenta-detalle.css']
})
export class CuentaDetalle {
  constructor(private router: Router) {}

  // Pestaña activa: 'mov' (movimientos), 'info' (datos), 'edo' (estados)
  currentTab: 'mov' | 'info' | 'edo' = 'mov';
  setTab(tab: 'mov' | 'info' | 'edo'){ this.currentTab = tab; }

  // Lista demo de movimientos
  movimientos: Movimiento[] = [
    { fechaCab: '4 JUNIO 2025',  titulo: 'RETIRO SUCURSAL BANCO',  subtitulo: 'Retiro Efectivo',               monto: '- $300.00' },
    { fechaCab: '26 MAYO 2025',  titulo: 'TRANSFERENCIA BANCARIA', subtitulo: 'Bbva México Depósito ***2603', monto: '+ $2200.00' },
    { fechaCab: '4 JUNIO 2025',  titulo: 'COMPRA CON TARJETA',     subtitulo: 'Compra Mercado Libre',         monto: '- $429.00' },
  ];

  // Información de la tarjeta/cuenta
  infoTarjeta = [
    { label: 'CLAVE interbancaria', value: '1859 2960 2069 3505 35' },
    { label: 'Número de cuenta',    value: '2086 2478 8739 4209' },
    { label: 'Número de tarjeta',   value: '4804 8602 4597 8043' },
    { label: 'Número de celular',   value: '55 9307 2405' },
  ];

  // Historial de estados de cuenta
  edoCuenta = [
    { mes: 'Agosto 2025', rango: '30 Jul - 29 Ago' },
    { mes: 'Julio 2025',  rango: '30 Jun - 29 Julio' },
    { mes: 'Junio 2025',  rango: '30 May - 29 Jun' },
  ];

  // Datos de cabecera (demo)
  saldo = '$1952.43';
  tarjetaMasked = '**** **** **** 3052';

  // Navegación
  regresar(): void { this.router.navigate(['/cliente']); }

  // Acciones de UI (placeholders)
  apagarTarjeta(): void {}
  verTarjetaDigital(): void {}
}

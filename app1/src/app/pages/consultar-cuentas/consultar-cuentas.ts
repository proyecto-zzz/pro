import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Modelo de una cuenta mostrada en la tabla:
interface Cuenta {
  cliente: string;
  numero: string;
  tipo: 'Ahorro' | 'Empresarial' | string;
  saldo: string;
  apertura: string;
}

@Component({
  selector: 'app-consultar-cuentas',
  standalone: true, // componente standalone
  imports: [CommonModule], // *ngIf, *ngFor, etc.
  templateUrl: './consultar-cuentas.html',
  styleUrls: ['./consultar-cuentas.css']
})
export class ConsultarCuentas {
  constructor(private router: Router) {}

  // Datos demo para la lista/detalle
  cuentas: Cuenta[] = [
    { cliente: 'Jessica Hernández García', numero: '1234567891', tipo: 'Ahorro',      saldo: '$15,750.00', apertura: '17 - Mayo - 2019' },
    { cliente: 'Carlos Ramírez Pérez',     numero: '987654321',  tipo: 'Empresarial', saldo: '$50,000.00', apertura: '20 - Agosto - 2020' }
  ];

  sel: number | null = null; // índice seleccionado; null = vista de lista

  // Navegación y cambio de vista
  regresarTop(): void   { this.router.navigate(['/ejecutivo']); } // volver al panel de ejecutivo
  ver(i: number): void  { this.sel = i; } // mostrar detalle de la cuenta i
  regresarLista(): void { this.sel = null; } // volver a la lista
}

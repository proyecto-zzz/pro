import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-abrir-cuentas',
  standalone: true,                 // Componente standalone (sin NgModule)
  imports: [CommonModule, FormsModule], // Usa directivas básicas y formularios template-driven
  templateUrl: './abrir-cuentas.html',
  styleUrls: ['./abrir-cuentas.css']
})
export class AbrirCuentas {
  // Modelo del formulario: enlazado con [(ngModel)] en la plantilla
  form = {
    nombre: '',
    apellidos: '',
    curp: '',
    correo: '',
    telefono: '',
    deposito: '' as string | number // puede llegar como texto; luego podrías parsearlo a número
  };

  submitted = false;   // Marca si ya se intentó enviar (para mostrar errores)
  error: string | null = null; // Mensaje de error de validación
  ok = false;          // Flag para mostrar mensaje/modal de éxito

  constructor(private router: Router) {}

  // Botón "Regresar": vuelve al dashboard del Ejecutivo
  regresar(): void { this.router.navigate(['/ejecutivo']); }

  // Envío del formulario
  registrar(f: NgForm): void {
    this.submitted = true; // activa visualización de errores

    // Si el formulario es inválido, muestra error y marca controles como tocados
    if (f.invalid) {
      this.error = 'Revisa los campos marcados.';
      Object.values(f.controls).forEach(c => c.markAsTouched());
      return; // corta el flujo
    }

    // Si es válido, limpia error y muestra confirmación (ok=true)
    // (Aquí podrías llamar a la API para crear el usuario/cuenta)
    this.error = null;
    this.ok = true;
  }

  // Cierra el aviso de éxito (y podrías limpiar el formulario si quieres)
  aceptar(): void {
    this.ok = false;
  }
}

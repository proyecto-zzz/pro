import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class Registro {
  // modelo simple
  form = {
    nombre: '',
    fecha: '',
    curp: '', 
    rfc: '' 
  };

  submitted = false;
  currentYear = new Date().getFullYear(); // Año actual (2025)

  constructor(private router: Router) {}

  regresar(): void {
    this.router.navigate(['/login']);
  }

  // Validación personalizada para la fecha
  validarFecha(fecha: string): boolean {
    if (!fecha) return false;
    
    const fechaObj = new Date(fecha);
    const año = fechaObj.getFullYear();
    
    // Validar que el año esté entre 1930 y el año actual (2025)
    return año >= 1930 && año <= this.currentYear;
  }

  siguiente(f: NgForm): void {
    this.submitted = true;
    
    // Validar campos obligatorios
    if (!this.form.nombre) {
      if (f.controls['nombre']) {
        f.controls['nombre'].markAsTouched();
      }
      return;
    }
    
    // Validar fecha con nuestra validación personalizada
    if (!this.form.fecha || !this.validarFecha(this.form.fecha)) {
      if (f.controls['fecha']) {
        f.controls['fecha'].markAsTouched();
        // Marcar como inválido manualmente
        f.controls['fecha'].setErrors({'invalidYear': true});
      }
      return;
    }
    
    this.router.navigate(['/registro2']);
  }
}
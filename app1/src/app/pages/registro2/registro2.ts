import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro2',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './registro2.html',
  styleUrls: ['./registro2.css']
})
export class Registro2 {
  // Modelo del formulario (vinculado en la plantilla)
  form = {
    celular: '',
    alterno: '',
    email: '',
    direccion: ''
  };

   // para mostrar validaciones tras intentar enviar
  submitted = false;
  error: string | null = null;

  constructor(private router: Router) {}

  // Vuelve al paso anterior del registro
  regresar(): void {
    this.router.navigate(['/registro']);
  }

  // Avanza al siguiente paso si el formulario es válido
  siguiente(f: NgForm): void {
    this.submitted = true;
    if (f.invalid) {
      Object.values(f.controls).forEach(c => c.markAsTouched()); // fuerza mostrar errores
      return;
    }
    this.router.navigate(['/registro3']);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget',
  standalone: true, // componente standalone
  imports: [CommonModule, FormsModule],
  templateUrl: './forget.html',
  styleUrls: ['./forget.css']
})
export class Forget {
  cuenta = '';
  email = '';
  documento = '';

  isSuccess = false; // muestra mensaje de éxito

  constructor(private router: Router) {}

  volverAlLogin(ev: Event): void {
    ev.preventDefault(); // evita navegación del <a>
    const link = ev.target as HTMLElement;
    link.classList.add("clicked"); // feedback visual del enlace
    
    // Anima salida de la página
    const pageElement = document.querySelector('.page') as HTMLElement;
    if (pageElement) {
      pageElement.style.animation = 'fadeOut 0.5s ease-in forwards';
    }
    
    // Tras la animación, regresar a /login
    setTimeout(() => {
      link.classList.remove("clicked");
      this.router.navigate(['/login']);
    }, 500);
  }

  recuperarContrasena(form: NgForm): void {
    // Valida formulario; si hay errores, marca controles para mostrar mensajes
    if (form.invalid) {
      Object.values(form.controls).forEach(c => {
        c.markAsTouched();
        c.markAsDirty();
      });
      return;
    }
    // Simula éxito y limpia el formulario después
    this.isSuccess = true;    
    setTimeout(() => {
      form.resetForm();
      this.cuenta = '';
      this.email = '';
      this.documento = '';
    }, 3000);
  }
}

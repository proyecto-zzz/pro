import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro3',
  standalone: true, // componente standalone
  imports: [CommonModule, FormsModule], // para [(ngModel)] y validaciones simples
  templateUrl: './registro3.html',
  styleUrls: ['./registro3.css']
})
export class Registro3 {
  form = { usuario: '', password: '' }; // modelo del formulario
  showPwd = false; // toggle ver/ocultar contraseña
  submitted = false; // ya intentó enviar

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  regresar(): void { 
    this.router.navigate(['/registro2']); // volver al paso anterior
  }

  siguiente(f: NgForm): void {
    this.submitted = true;
    if (f.invalid) {
      Object.values(f.controls).forEach(c => c.markAsTouched()); // muestra errores
      return;
    }
    // marca rol en storage para compatibilidad y avanza al dashboard cliente
    this.authService.setUserRole('cliente');
    this.router.navigate(['/cliente']);
  }
}

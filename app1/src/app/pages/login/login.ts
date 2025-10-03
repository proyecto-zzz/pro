// Componente standalone de Login que usa FormsModule (ngModel) y Router:
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  email = '';
  password = '';
  showPwd = false;

  error: string | null = null;
  submitted = false;
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  // Al cargar /login, elimina cualquier sesión previa sin navegar
  ngOnInit(): void {
    this.authService.logout(false);
  }

  // Navega a /forget.
  animateForget(ev: Event): void {
    ev.preventDefault();
    this.router.navigate(['/forget']);
  }

  // Navega a /registro con una animación breve:
  animateSignup(ev: Event): void {
    ev.preventDefault();
    const link = ev.target as HTMLElement;
    link.classList.add('clicked');
    setTimeout(() => {
      link.classList.remove('clicked');
      this.router.navigate(['/registro']);
    }, 600);
  }

  acceder(form: NgForm, ev?: Event): void {
    if (ev) ev.preventDefault();
    this.submitted = true;

    if (form.invalid) {
      this.error = 'Ingresa tu email y contraseña.';
      Object.values(form.controls).forEach(c => c.markAsTouched());
      return;
    }

    const email = this.email.trim().toLowerCase();
    const pwd = this.password;

    this.loading = true;
    this.error = null;

    this.authService.login(email, pwd).subscribe({
      next: (res: any) => {
        this.loading = false;
        const rol = res.user?.rol_id;
        if (rol === 1) this.router.navigate(['/cliente']);
        else if (rol === 2) this.router.navigate(['/ejecutivo']);
        else if (rol === 3) this.router.navigate(['/gerente']);
        else this.router.navigate(['/login']);
      },
      error: (e) => {
        this.loading = false;
        this.error = e?.error?.error || 'Correo y/o contraseña incorrectos.';
      }
    });
  }
}

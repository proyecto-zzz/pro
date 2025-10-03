import { Component, ElementRef, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  standalone: true, // componente standalone
  imports: [CommonModule], // *ngIf, *ngFor, etc.
  templateUrl: './cliente.html',
  styleUrls: ['./cliente.css']
})
export class Cliente implements OnDestroy {
  // Datos de la vista (mock)
  nombreBanco = 'BANCO ZAND';
  cuentaNombre = 'Ahorradito';
  tarjetaMasked = '**** **** **** 3052';
  saldo = 1952.43;

  // Referencia al contenedor para aplicar animaciones al salir
  @ViewChild('clientPage', { static: true }) clientPage!: ElementRef<HTMLElement>;

  private animEndHandler?: () => void; // Guarda el handler para desmontarlo luego

  constructor(private router: Router, private renderer: Renderer2) {}

  // Limpia el listener de la animación al destruir el componente
  ngOnDestroy(): void {
    if (this.clientPage?.nativeElement && this.animEndHandler) {
      this.clientPage.nativeElement.removeEventListener('animationend', this.animEndHandler);
    }
  }

  // Navegación básica
  salir(): void {
    this.router.navigate(['/login']);
  }

  irSolicitudes(): void {
    this.slideOutThenNavigate('/solicitudesc');
  }

  irRetiros(): void {
    this.router.navigate(['/retiros']);
  }

  irPagos(): void {
    this.slideOutThenNavigate('/pagos');
  }

  irTransferencias(): void {
    this.slideOutThenNavigate('/transferencias');
  }

  irCuenta(): void {
    this.router.navigate(['/cuenta']);
  }

  // Aplica clase de animación y navega cuando termina; 
  // si el usuario prefiere menos animación, navega directo
  private slideOutThenNavigate(route: string): void {
    const prefersReduced = typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const el = this.clientPage?.nativeElement;
    if (!el || prefersReduced) {
      this.router.navigate([route]);
      return;
    }

    // Evita listeners duplicados
    if (this.animEndHandler) {
      el.removeEventListener('animationend', this.animEndHandler);
    }

    // Dispara la animación CSS
    this.renderer.addClass(el, 'slide-out-left');

    // Cuando termina la animación, navega y limpia el listener
    this.animEndHandler = () => {
      el.removeEventListener('animationend', this.animEndHandler!);
      this.animEndHandler = undefined;
      this.router.navigate([route]);
    };
    el.addEventListener('animationend', this.animEndHandler);
  }
}

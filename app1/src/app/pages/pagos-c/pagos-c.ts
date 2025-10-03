import { Component, ElementRef, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagos-c',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagos-c.html',
  styleUrls: ['./pagos-c.css']
})
export class PagosC implements OnDestroy {
  // contenedor para animar salida
  @ViewChild('pagosPage', { static: true }) pagosPage!: ElementRef<HTMLElement>; 
  
  // referencia al listener
  private animEndHandler?: () => void;

  constructor(private router: Router, private renderer: Renderer2) {}

  // Limpia el listener de animación al destruir el componente
  ngOnDestroy(): void {
    if (this.animEndHandler && this.pagosPage?.nativeElement) {
      this.pagosPage.nativeElement.removeEventListener('animationend', this.animEndHandler);
    }
  }

  // Volver a la vista de cliente con animación
  regresar(): void {
    this.slideOutThenNavigate('/cliente');
  }

  // Placeholders de navegación a subflujos de pago
  pagarConCodigo(): void {
  }

  prestamoOtraPersona(): void {
  }

  tarjetaCredito(): void {
  }

  unServicio(): void {

  }

  // Aplica clase CSS de salida y, al terminar la animación, navega a la ruta dada
  private slideOutThenNavigate(route: string): void {
    const reduce = typeof window !== 'undefined' &&
                   window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    // Sin animación si no hay elemento o usuario prefiere reducir movimiento
    const el = this.pagosPage?.nativeElement;
    if (!el || reduce) { this.router.navigate([route]); return; } 

    // evita duplicar listeners
    if (this.animEndHandler) el.removeEventListener('animationend', this.animEndHandler); 

    this.renderer.addClass(el, 'slide-out-right'); // dispara animación de salida

    this.animEndHandler = () => {
      el.removeEventListener('animationend', this.animEndHandler!);
      this.animEndHandler = undefined;
      this.router.navigate([route]); // navega cuando termina la animación
    };
    el.addEventListener('animationend', this.animEndHandler);
  }
}

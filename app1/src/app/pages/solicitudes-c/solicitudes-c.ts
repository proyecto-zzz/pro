import { Component, ElementRef, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitudes-c',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitudes-c.html',
  styleUrls: ['./solicitudes-c.css']
})
export class SolicitudesC implements OnDestroy {
  // contenedor a animar
  @ViewChild('solPage', { static: true }) solPage!: ElementRef<HTMLElement>; 
  // listener de fin de animación
  private animEndHandler?: () => void;

  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnDestroy(): void {
    // limpia el listener si existe
    if (this.animEndHandler && this.solPage?.nativeElement) {
      this.solPage.nativeElement.removeEventListener('animationend', this.animEndHandler);
    }
  }

  // volver al dashboard de cliente con animación
  regresar(): void {
    this.slideOutThenNavigate('/cliente');
  }

  // placeholders de navegación
  solicitarCredito(): void {
  }
  solicitarPrestamo(): void {
  }
  historialCreditos(): void {
  }

  /** Aplica animación de salida y navega al terminar; si hay "reduce motion", navega directo. */
  private slideOutThenNavigate(route: string): void {
    const reduce = typeof window !== 'undefined' &&
                   window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const el = this.solPage?.nativeElement;

    if (!el || reduce) { this.router.navigate([route]); return; }

    // evita listeners duplicados
    if (this.animEndHandler) el.removeEventListener('animationend', this.animEndHandler);

    this.renderer.addClass(el, 'slide-out-right'); // dispara clase CSS

    this.animEndHandler = () => {
      el.removeEventListener('animationend', this.animEndHandler!);
      this.animEndHandler = undefined;
      this.router.navigate([route]); // navega al terminar animación
    };
    el.addEventListener('animationend', this.animEndHandler);
  }
}

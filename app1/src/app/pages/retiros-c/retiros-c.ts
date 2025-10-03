import { Component, ElementRef, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-retiros-c',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './retiros-c.html',
  styleUrls: ['./retiros-c.css']
})
export class RetirosC implements OnDestroy {
  // contenedor para animar salida
  @ViewChild('retirosPage', { static: true }) retirosPage!: ElementRef<HTMLElement>; 
  // referencia al listener
  private animEndHandler?: () => void;

  constructor(private router: Router, private renderer: Renderer2) {}

  // limpia el listener al destruir el componente
  ngOnDestroy(): void {
    if (this.animEndHandler && this.retirosPage?.nativeElement) {
      this.retirosPage.nativeElement.removeEventListener('animationend', this.animEndHandler);
    }
  }

  // volver a la vista de cliente con animación
  regresar(): void {
    this.slideOutThenNavigate('/cliente');
  }

  // placeholders de navegación a subflujos
  retiroEfectivo(): void {
  }

  retiroSinTarjeta(): void {
  }

  historialRetiros(): void {
  }

  /** Aplica clase de salida y navega al terminar; 
   * si el usuario prefiere menos movimiento, navega directo. */
  private slideOutThenNavigate(route: string): void {
    const reduce = typeof window !== 'undefined' &&
                   window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const el = this.retirosPage?.nativeElement;
    if (!el || reduce) { this.router.navigate([route]); return; }

    // evita listeners duplicados
    if (this.animEndHandler) el.removeEventListener('animationend', this.animEndHandler);

    this.renderer.addClass(el, 'slide-out-right'); // dispara animación CSS

    this.animEndHandler = () => {
      el.removeEventListener('animationend', this.animEndHandler!);
      this.animEndHandler = undefined;
      this.router.navigate([route]); // navega al finalizar la animación
    };
    el.addEventListener('animationend', this.animEndHandler);
  }
}

import { Component, ElementRef, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Modelo para un destinatario de transferencia
interface Destinatario {
  nombre: string;
  banco: string;
  cuentaMasked: string;
}

@Component({
  selector: 'app-transferencias-c',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transferencias-c.html',
  styleUrls: ['./transferencias-c.css']
})
export class TransferenciasC implements OnDestroy {
  // contenedor para animar salida
  @ViewChild('transfPage', { static: true }) transfPage!: ElementRef<HTMLElement>; 
  // referencia al listener
  private animEndHandler?: () => void;                                            

  constructor(private router: Router, private renderer: Renderer2) {}

  // limpia el listener de animación al destruir el componente
  ngOnDestroy(): void {
    if (this.animEndHandler && this.transfPage?.nativeElement) {
      this.transfPage.nativeElement.removeEventListener('animationend', this.animEndHandler);
    }
  }

  // volver a la vista de cliente (con animación)
  regresar(): void {
    this.slideOutThenNavigate('/cliente');
  }

  // placeholders para flujos adicionales
  nuevaCuenta(): void {
  }

  opciones(d: Destinatario): void {
  }

  // Aplica clase CSS de salida y navega al terminar; si hay "reduced motion", navega directo
  private slideOutThenNavigate(route: string): void {
    const reduce = typeof window !== 'undefined' &&
                   window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const el = this.transfPage?.nativeElement;
    if (!el || reduce) { this.router.navigate([route]); return; }

    if (this.animEndHandler) el.removeEventListener('animationend', this.animEndHandler); // evita duplicados

    this.renderer.addClass(el, 'slide-out-right'); // dispara animación

    this.animEndHandler = () => {
      el.removeEventListener('animationend', this.animEndHandler!);
      this.animEndHandler = undefined;
      this.router.navigate([route]); // navegar al finalizar la animación
    };
    el.addEventListener('animationend', this.animEndHandler);
  }

  // Lista demo de destinatarios recientes
  lista: Destinatario[] = [
    { nombre: 'Alexis Gonzalez', banco: 'Bbva Bancomer', cuentaMasked: '****3905' },
    { nombre: 'Luis Zendejas',   banco: 'Bbva Bancomer', cuentaMasked: '****3905' },
    { nombre: 'Delia Castro',    banco: 'Bbva Bancomer', cuentaMasked: '****3905' },
  ];
}

import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gerente',
  standalone: true, // componente standalone
  imports: [CommonModule, FormsModule], // directivas básicas + formularios
  templateUrl: './gerente.html',
  styleUrls: ['./gerente.css']
})
export class Gerente {
  constructor(private router: Router) {}

  // Opciones de usuarios para el dropdown
  users = [
    { id: 1, name: 'Delia Zendejas' },
    { id: 2, name: 'Kevin Zamora' },
    { id: 3, name: 'Luis Castro' },
  ];

  // Usuario seleccionado por defecto (evita undefined)
  selectedUser = this.users[0]!;

  // Estado del menú del usuario (abre/cierra)
  userMenuOpen = false;

  // Catálogos para selects
  periodos = ['1 día', '1 semana', '1 mes'];
  permisos = ['Acceso a reportes', 'Ver clientes', 'Editar cuentas'];

  // Valores seleccionados
  selectedPeriodo = this.periodos[0];
  selectedPermiso = this.permisos[0];

  // Botón salir
  salir() {
    this.router.navigate(['/login']);
  }

  // Abre/cierra el menú de usuario (evita burbuja)
  toggleUserMenu(ev: MouseEvent) {
    ev.stopPropagation();
    this.userMenuOpen = !this.userMenuOpen;
  }

  // Selecciona usuario en el dropdown
  selectUser(u: { id: number; name: string }, ev?: MouseEvent) {
    if (ev) ev.stopPropagation();
    this.selectedUser = u;
    this.userMenuOpen = false;
  }

  // Cierra menús al hacer click fuera
  @HostListener('document:click')
  closeMenus() {
    this.userMenuOpen = false;
  }

  // Acción de actualizar (placeholder)
  actualizar() {
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerrarCuentas } from './cerrar-cuentas';

describe('CerrarCuentas', () => {
  let component: CerrarCuentas;
  let fixture: ComponentFixture<CerrarCuentas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CerrarCuentas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CerrarCuentas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

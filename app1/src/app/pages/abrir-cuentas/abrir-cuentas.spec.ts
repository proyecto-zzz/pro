import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrirCuentas } from './abrir-cuentas';

describe('AbrirCuentas', () => {
  let component: AbrirCuentas;
  let fixture: ComponentFixture<AbrirCuentas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbrirCuentas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbrirCuentas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

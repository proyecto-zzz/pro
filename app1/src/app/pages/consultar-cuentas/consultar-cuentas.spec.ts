import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarCuentas } from './consultar-cuentas';

describe('ConsultarCuentas', () => {
  let component: ConsultarCuentas;
  let fixture: ComponentFixture<ConsultarCuentas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarCuentas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarCuentas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

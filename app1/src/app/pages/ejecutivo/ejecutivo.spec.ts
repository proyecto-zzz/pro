import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ejecutivo } from './ejecutivo';

describe('Ejecutivo', () => {
  let component: Ejecutivo;
  let fixture: ComponentFixture<Ejecutivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ejecutivo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ejecutivo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

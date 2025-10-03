import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registro3 } from './registro3';

describe('Registro3', () => {
  let component: Registro3;
  let fixture: ComponentFixture<Registro3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registro3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Registro3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

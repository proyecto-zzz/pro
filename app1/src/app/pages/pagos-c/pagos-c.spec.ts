import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosC } from './pagos-c';

describe('PagosC', () => {
  let component: PagosC;
  let fixture: ComponentFixture<PagosC>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagosC]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagosC);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

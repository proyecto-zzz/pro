import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciasC } from './transferencias-c';

describe('TransferenciasC', () => {
  let component: TransferenciasC;
  let fixture: ComponentFixture<TransferenciasC>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferenciasC]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferenciasC);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

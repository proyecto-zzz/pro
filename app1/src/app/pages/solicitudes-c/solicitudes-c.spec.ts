import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesC } from './solicitudes-c';

describe('SolicitudesC', () => {
  let component: SolicitudesC;
  let fixture: ComponentFixture<SolicitudesC>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudesC]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesC);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

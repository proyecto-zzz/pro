import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizarSolicitudes } from './autorizar-solicitudes';

describe('AutorizarSolicitudes', () => {
  let component: AutorizarSolicitudes;
  let fixture: ComponentFixture<AutorizarSolicitudes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutorizarSolicitudes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorizarSolicitudes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

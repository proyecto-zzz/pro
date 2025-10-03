import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirosC } from './retiros-c';

describe('RetirosC', () => {
  let component: RetirosC;
  let fixture: ComponentFixture<RetirosC>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetirosC]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetirosC);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

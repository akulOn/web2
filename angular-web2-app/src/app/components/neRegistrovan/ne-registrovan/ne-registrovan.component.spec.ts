import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeRegistrovanComponent } from './ne-registrovan.component';

describe('NeRegistrovanComponent', () => {
  let component: NeRegistrovanComponent;
  let fixture: ComponentFixture<NeRegistrovanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeRegistrovanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeRegistrovanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

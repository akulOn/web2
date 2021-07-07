import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajElementMrezeComponent } from './dodaj-element-mreze.component';

describe('DodajElementMrezeComponent', () => {
  let component: DodajElementMrezeComponent;
  let fixture: ComponentFixture<DodajElementMrezeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajElementMrezeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajElementMrezeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

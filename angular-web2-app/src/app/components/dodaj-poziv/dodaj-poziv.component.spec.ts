import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajPozivComponent } from './dodaj-poziv.component';

describe('DodajPozivComponent', () => {
  let component: DodajPozivComponent;
  let fixture: ComponentFixture<DodajPozivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajPozivComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajPozivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

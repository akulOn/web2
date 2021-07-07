import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajIncidentComponent } from './dodaj-incident.component';

describe('DodajIncidentComponent', () => {
  let component: DodajIncidentComponent;
  let fixture: ComponentFixture<DodajIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajIncidentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

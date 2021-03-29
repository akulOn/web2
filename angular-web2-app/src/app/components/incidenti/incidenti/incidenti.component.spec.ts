import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentiComponent } from './incidenti.component';

describe('IncidentiComponent', () => {
  let component: IncidentiComponent;
  let fixture: ComponentFixture<IncidentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

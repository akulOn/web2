import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledElemenataMrezeComponent } from './pregled-elemenata-mreze.component';

describe('PregledElemenataMrezeComponent', () => {
  let component: PregledElemenataMrezeComponent;
  let fixture: ComponentFixture<PregledElemenataMrezeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledElemenataMrezeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledElemenataMrezeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

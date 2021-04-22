import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UredenjeElemenataMrezeComponent } from './uredenje-elemenata-mreze.component';

describe('UredenjeElemenataMrezeComponent', () => {
  let component: UredenjeElemenataMrezeComponent;
  let fixture: ComponentFixture<UredenjeElemenataMrezeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UredenjeElemenataMrezeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UredenjeElemenataMrezeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

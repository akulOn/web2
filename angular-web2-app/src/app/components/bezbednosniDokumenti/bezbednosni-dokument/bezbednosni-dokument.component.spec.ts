import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BezbednosniDokumentComponent } from './bezbednosni-dokument.component';

describe('BezbednosniDokumentComponent', () => {
  let component: BezbednosniDokumentComponent;
  let fixture: ComponentFixture<BezbednosniDokumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BezbednosniDokumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BezbednosniDokumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

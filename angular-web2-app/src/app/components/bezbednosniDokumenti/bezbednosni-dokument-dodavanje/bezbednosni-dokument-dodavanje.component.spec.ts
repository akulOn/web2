import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BezbednosniDokumentDodavanjeComponent } from './bezbednosni-dokument-dodavanje.component';

describe('BezbednosniDokumentDodavanjeComponent', () => {
  let component: BezbednosniDokumentDodavanjeComponent;
  let fixture: ComponentFixture<BezbednosniDokumentDodavanjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BezbednosniDokumentDodavanjeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BezbednosniDokumentDodavanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BezbednosniDokumentLogComponent } from './bezbednosni-dokument-log.component';

describe('BezbednosniDokumentLogComponent', () => {
  let component: BezbednosniDokumentLogComponent;
  let fixture: ComponentFixture<BezbednosniDokumentLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BezbednosniDokumentLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BezbednosniDokumentLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

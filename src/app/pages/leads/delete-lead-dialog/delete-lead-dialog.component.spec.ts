import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLeadDialogComponent } from './delete-lead-dialog.component';

describe('DeleteLeadDialogComponent', () => {
  let component: DeleteLeadDialogComponent;
  let fixture: ComponentFixture<DeleteLeadDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteLeadDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteLeadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

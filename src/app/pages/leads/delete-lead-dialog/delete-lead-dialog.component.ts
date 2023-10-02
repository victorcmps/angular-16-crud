import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-delete-lead-dialog',
  templateUrl: './delete-lead-dialog.component.html',
  styleUrls: ['./delete-lead-dialog.component.scss'],
})
export class DeleteLeadDialogComponent {
  private subscriptions = new Subscription();

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private readonly dialogRef: MatDialogRef<DeleteLeadDialogComponent>,
    private readonly leadService: LeadService
  ) {}

  public readonly deleteLead = () => {
    this.subscriptions.add(
      this.leadService
        .deleteLead(this.data.id)
        .subscribe({ next: () => this.dialogRef.close() })
    );
  };
}

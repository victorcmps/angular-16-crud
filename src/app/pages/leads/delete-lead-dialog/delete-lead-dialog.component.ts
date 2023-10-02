import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-delete-lead-dialog',
  templateUrl: './delete-lead-dialog.component.html',
  styleUrls: ['./delete-lead-dialog.component.scss'],
})
export class DeleteLeadDialogComponent implements OnDestroy {
  public deleting: boolean = false;
  private readonly subscriptions = new Subscription();

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private readonly dialogRef: MatDialogRef<DeleteLeadDialogComponent>,
    private readonly snackBar: MatSnackBar,
    private readonly leadService: LeadService
  ) {}

  public readonly deleteLead = () => {
    this.deleting = true;
    this.subscriptions.add(
      this.leadService.deleteLead(this.data.id).subscribe({
        next: () => {
          this.deleting = false;
          this.dialogRef.close();
          this.snackBar.open('Lead excluido!', 'Dispensar', {
            duration: 3000,
          });
        },
      })
    );
  };

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

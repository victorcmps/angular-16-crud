import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LeadModel } from 'src/app/models/lead-model';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.scss'],
})
export class AddLeadComponent {
  private readonly subscriptions = new Subscription();

  constructor(
    private readonly leadService: LeadService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  public readonly createLead = (lead: LeadModel) => {
    this.subscriptions.add(
      this.leadService.createLead(lead).subscribe({
        next: () => {
          this.snackBar.open('Lead criado!', 'Dispensar', {
            duration: 3000
          });
          this.router.navigate(['/leads']);
        },
      })
    );
  };
}

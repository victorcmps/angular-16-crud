import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LeadModel } from 'src/app/models/lead-model';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-edit-lead',
  templateUrl: './edit-lead.component.html',
  styleUrls: ['./edit-lead.component.scss'],
})
export class EditLeadComponent implements OnInit, OnDestroy {
  public lead: LeadModel | null = null;
  private readonly subscriptions = new Subscription();
  private readonly leadId = this.route.snapshot.paramMap.get('id') ?? null;

  public constructor(
    public readonly leadService: LeadService,
    private readonly route: ActivatedRoute,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    if (this.leadId) {
      this.subscriptions.add(
        this.leadService
          .getLead(this.leadId)
          .subscribe((apiResponse: LeadModel) => {
            this.lead = apiResponse;
          })
      );
    }
  }

  public readonly updateLead = (lead: LeadModel) => {
    if (this.leadId) {
      this.subscriptions.add(
        this.leadService
          .updateLead(lead, this.leadId)
          .subscribe({ next: () => {
            this.snackBar.open('Lead atualizado!', 'Dispensar', {
              duration: 3000
            });
            this.router.navigate(['/leads']);
          } })
      );
    }
  };

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

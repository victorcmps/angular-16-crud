import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { OperatorFunction, Subscription, filter } from 'rxjs';
import { LeadModel } from 'src/app/models/lead-model';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-edit-lead',
  templateUrl: './edit-lead.component.html',
  styleUrls: ['./edit-lead.component.scss'],
})
export class EditLeadComponent implements OnInit, OnDestroy {
  public lead: LeadModel | null = null;
  public loading: boolean = false;
  public saving: boolean = false;
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
      this.getLead(this.leadId);
    }
  }

  public readonly updateLead = (lead: LeadModel) => {
    this.saving = true;
    if (this.leadId) {
      this.subscriptions.add(
        this.leadService.updateLead(lead, this.leadId).subscribe({
          next: (apiResponse) => {
            this.saving = false;
            if (apiResponse) {
              this.snackBar.open('Lead atualizado!', 'Dispensar', {
                duration: 3000,
              });
              this.router.navigate(['/leads']);
            }
          },
        })
      );
    }
  };

  private readonly getLead = (leadId: string) => {
    this.loading = true;
    this.subscriptions.add(
      this.leadService
        .getLead(leadId)
        .pipe(
          filter(
            (value: LeadModel | null): boolean => !!value
          ) as OperatorFunction<LeadModel | null, LeadModel>
        )
        .subscribe((apiResponse: LeadModel) => {
          this.loading = false;
          this.lead = apiResponse;
        })
    );
  };

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

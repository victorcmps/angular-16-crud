import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LeadModel } from 'src/app/models/lead-model';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-edit-lead',
  templateUrl: './edit-lead.component.html',
  styleUrls: ['./edit-lead.component.scss'],
})
export class EditLeadComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  public lead: LeadModel | null = null;

  constructor(
    public readonly leadService: LeadService,
    private readonly route: ActivatedRoute
  ) {
  
  }

  ngOnInit(): void {
    const leadId = this.route.snapshot.paramMap.get('id') ?? null;
    if (leadId) {
      this.subscriptions.add(
        this.leadService.getLead(leadId).subscribe((apiResponse: LeadModel) => {
          this.lead = apiResponse;
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

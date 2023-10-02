import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LeadModel } from 'src/app/models/lead-model';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.scss']
})
export class AddLeadComponent {

  constructor(private readonly leadService: LeadService, private readonly router: Router) {}

  public readonly createLead = (lead: LeadModel) => {
    this.leadService.createLead(lead).subscribe({next: () => {
      this.router.navigate(['/leads']);
    }})
  }
}
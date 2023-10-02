import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LeadModel } from 'src/app/models/lead-model';
import { LeadService } from 'src/app/services/lead.service';
import { DeleteLeadDialogComponent } from './delete-lead-dialog/delete-lead-dialog.component';
import { OperatorFunction, Subscription, filter } from 'rxjs';

type LeadTableModel = Pick<LeadModel, 'cnpj' | 'razaoSocial' | 'cep' | 'uf'>;

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss'],
})
export class LeadsComponent {
  public displayedColumns: string[] = [
    'cnpj',
    'razaoSocial',
    'cep',
    'uf',
    'actions',
  ];
  public dataSource: LeadTableModel[] = [];
  public leads: LeadModel[] | null = null;
  public loading: boolean = false;
  private subscriptions = new Subscription();

  public constructor(
    private readonly leadService: LeadService,
    private readonly dialog: MatDialog
  ) {
    this.getLeads();
  }

  public readonly deleteLead = (id: string) => {
    this.dialog
      .open(DeleteLeadDialogComponent, {
        width: '450px',
        data: {
          id,
        },
      })
      .afterClosed()
      .subscribe(this.getLeads);
  };

  private readonly getLeads = () => {
    this.loading = true;
    this.subscriptions.add(
      this.leadService
        .getAllLeads()
        .pipe(
          filter(
            (value: LeadModel[] | null): boolean => !!value
          ) as OperatorFunction<LeadModel[] | null, LeadModel[]>
        )
        .subscribe({
          next: (apiResponse) => {
            this.loading = false;
            this.dataSource = apiResponse;
          },
        })
    );
  };
}

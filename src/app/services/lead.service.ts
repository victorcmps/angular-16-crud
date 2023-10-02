import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LeadModel } from '../models/lead-model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  public readonly createLead = (lead: LeadModel): Observable<LeadModel | null> => {
    return this.http.post<LeadModel>(`leads`, lead).pipe(catchError(this.handleCreateLeadError));
  };

  public readonly getAllLeads = (): Observable<LeadModel[] | null> => {
    return this.http.get<LeadModel[]>(`leads`).pipe(catchError(this.handleGetAllLeadsError));
  };

  public readonly getLead = (id: string): Observable<LeadModel | null> => {
    return this.http.get<LeadModel>(`leads/${id}`).pipe(catchError(this.handleGetLeadError));
  };

  public readonly updateLead = (lead: LeadModel, id: string): Observable<LeadModel | null> => {
    return this.http.put<LeadModel>(`leads/${id}`, lead).pipe(catchError(this.handleUpdateLeadError));
  };

  public readonly deleteLead = (id: string): Observable<null> => {
    return this.http.delete<null>(`leads/${id}`).pipe(catchError(this.handleDeleteLeadError));
  };

  private readonly handleCreateLeadError = (): Observable<null> => {
    this.snackBar.open('Ocorreu um erro ao criar um novo lead, tente novamente.', 'Dispensar', {
      duration: 3000
    });
    return of(null);
  }

  private readonly handleGetAllLeadsError = (): Observable<null> => {
    this.snackBar.open('Ocorreu um erro ao carregar a lista de leads, recarregue a página e tente novamente.');
    return of(null);
  }

  private readonly handleGetLeadError = (): Observable<null> => {
    this.snackBar.open('Ocorreu um erro ao carregar o lead, recarregue a página e tente novamente.');
    return of(null);
  }

  private readonly handleUpdateLeadError = (): Observable<null> => {
    this.snackBar.open('Ocorreu um erro ao atualizar o lead, tente novamente.', 'Dispensar', {
      duration: 3000
    });
    return of(null);
  }

  private readonly handleDeleteLeadError = (): Observable<null> => {
    this.snackBar.open('Ocorreu um erro deletar o lead, tente novamente.', 'Dispensar', {
      duration: 3000
    });
    return of(null);
  }
}

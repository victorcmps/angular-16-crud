import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LeadModel } from '../models/lead-model';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  constructor(private http: HttpClient) {}

  public createLead = (lead: LeadModel): Observable<LeadModel> => {
    return this.http.post<LeadModel>(`leads`, lead);
  };

  public getAllLeads = (): Observable<LeadModel[]> => {
    return this.http.get<LeadModel[]>(`leads`);
  };

  public getLead = (id: string): Observable<LeadModel> => {
    return this.http.get<LeadModel>(`leads/${id}`);
  };

  public updateLead = (lead: LeadModel, id: string): Observable<LeadModel> => {
    return this.http.put<LeadModel>(`leads/${id}`, lead);
  };

  public deleteLead = (id: string): Observable<null> => {
    return this.http.delete<null>(`leads/${id}`);
  };
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressModel } from '../models/address-model';
import { isAddressApi } from '../interceptors/environment-http.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) {}

  public getAddressByCep = (cep: string): Observable<AddressModel> => {
    return this.http.get<AddressModel>(`ws/${cep}/json`, {
      context: isAddressApi()
    });
  };
}

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpContext,
  HttpContextToken,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const ADDRESS_API = new HttpContextToken<boolean>(() => false);

export function isAddressApi() {
  return new HttpContext().set(ADDRESS_API, true);
}

@Injectable()
export class EnvironmentHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let apiReq = req.clone({ url: `${environment.apiUrl}/${req.url}` });

    if (req.context.get(ADDRESS_API)) {
      apiReq = req.clone({ url: `${environment.apiAddressUrl}/${req.url}` });
    }

    return next.handle(apiReq);
  }
}

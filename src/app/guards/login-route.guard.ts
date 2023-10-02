import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export default class LoginRouteGuard {
  constructor(private readonly router: Router) {}

  public canActivate(): boolean {
    const isUserLogged = !!window.localStorage.getItem('authToken');

    if (!isUserLogged) {
      this.router.navigate(['/login']);
    }

    return !!window.localStorage.getItem('authToken');
  }
}

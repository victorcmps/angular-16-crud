import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cadastro-leads';
  private readonly breakpointObserver = inject(BreakpointObserver);
  public readonly isUserLogged$ = this.router.events.pipe(
    map(() => !!window.localStorage.getItem('authToken'))
  );

  public readonly isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private readonly router: Router) {}

  public readonly logout = () => {
    window.localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  };
}

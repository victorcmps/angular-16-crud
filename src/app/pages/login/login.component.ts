import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

interface loginFormGroupModel {
  readonly login: FormControl<string | null>;
  readonly password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public constructor(private readonly router: Router) {} 

  public readonly loginForm = new FormGroup<loginFormGroupModel>({
    login: new FormControl<string>(''),
    password: new FormControl<string>('')
  });

  public readonly onLogin = (): void => {
    window.localStorage.setItem('authToken', 'logged');
    this.router.navigate(['/leads']);
  }

}
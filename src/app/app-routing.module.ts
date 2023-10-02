import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadsComponent } from './pages/leads/leads.component';
import { EditLeadComponent } from './pages/leads/edit-lead/edit-lead.component';
import { AddLeadComponent } from './pages/leads/add-lead/add-lead.component';
import { LoginComponent } from './pages/login/login.component';
import LoginRouteGuard from './guards/login-route.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'leads',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'leads',
    canActivate: [LoginRouteGuard],
    component: LeadsComponent,
  },
  {
    path: 'leads/add',
    canActivate: [LoginRouteGuard],
    component: AddLeadComponent,
  },
  {
    path: 'leads/:id',
    canActivate: [LoginRouteGuard],
    component: EditLeadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


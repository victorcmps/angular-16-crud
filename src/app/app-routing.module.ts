import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadsComponent } from './pages/leads/leads.component';
import { EditLeadComponent } from './pages/leads/edit-lead/edit-lead.component';
import { AddLeadComponent } from './pages/leads/add-lead/add-lead.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'leads',
    component: LeadsComponent,
  },
  {
    path: 'leads/add',
    component: AddLeadComponent,
  },
  {
    path: 'leads/:id',
    component: EditLeadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

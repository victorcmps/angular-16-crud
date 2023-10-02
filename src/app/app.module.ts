import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeadsFormComponent } from './components/leads-form/leads-form.component';
import { LoginComponent } from './pages/login/login.component';
import { AddLeadComponent } from './pages/leads/add-lead/add-lead.component';
import { EditLeadComponent } from './pages/leads/edit-lead/edit-lead.component';
import { LeadsComponent } from './pages/leads/leads.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EnvironmentHttpInterceptor } from './interceptors/environment-http.interceptor';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { DeleteLeadDialogComponent } from './pages/leads/delete-lead-dialog/delete-lead-dialog.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    LeadsFormComponent,
    LoginComponent,
    AddLeadComponent,
    EditLeadComponent,
    LeadsComponent,
    DeleteLeadDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatRadioModule,
    MatCardModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatGridListModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [
    provideNgxMask(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EnvironmentHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

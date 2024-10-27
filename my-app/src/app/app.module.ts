import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { AuthModule } from '@auth0/auth0-angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Import additional Angular Material modules
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SurveyModule } from "survey-angular-ui";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddIpslogComponent } from './components/ips/add-ipslog/add-ipslog.component';
import { IpslogListComponent } from './components/ips/ipslog-list/ipslog-list.component';
import { HomeComponent } from './components/home/home.component';
import { AddJobDevComponent } from './components/job-dev/add-job-dev/add-job-dev.component';
import { JobDevListComponent } from './components/job-dev/job-dev-list/job-dev-list.component';
import { PersonListComponent } from './components/person/person-list/person-list.component';
import { ClosedListComponent } from './components/closed/closed-list/closed-list.component';
import { StaffingListComponent } from './components/staffing/staffing-list/staffing-list.component';
import { AddPersonComponent } from './components/person/add-person/add-person.component';
import { AddStaffingComponent } from './components/staffing/add-staffing/add-staffing.component';
import { AddClosedComponent } from './components/closed/add-closed/add-closed.component';
import { DemographicsComponent } from './components/person/person-list/demographics/demographics.component';
import { VrComponent } from './components/person/person-list/vr/vr.component';
import { ClinicalComponent } from './components/person/person-list/clinical/clinical.component';
import { EmploymentComponent } from './components/person/person-list/employment/employment.component';
import { EducationComponent } from './components/person/person-list/education/education.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { InviteUserComponent } from './components/invite-user/invite-user.component';
import { SignUpSuperadminPageComponent } from './components/sign-up-superadmin-page/sign-up-superadmin-page.component';
import { SignUpAdminPageComponent } from './components/sign-up-admin-page/sign-up-admin-page.component';
import { SignUpProviderPageComponent } from './components/sign-up-provider-page/sign-up-provider-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AddIpslogComponent,
    IpslogListComponent,
    HomeComponent,
    AddJobDevComponent,
    JobDevListComponent,
    PersonListComponent,
    ClosedListComponent,
    StaffingListComponent,
    AddPersonComponent,
    AddStaffingComponent,
    AddClosedComponent,
    DemographicsComponent,
    VrComponent,
    ClinicalComponent,
    EmploymentComponent,
    EducationComponent,
    LoginComponent,
    SignUpPageComponent,
    InviteUserComponent,
    SignUpSuperadminPageComponent,
    SignUpAdminPageComponent,
    SignUpProviderPageComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSidenavModule, // Added to imports
    MatListModule, // Added to imports
    SurveyModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

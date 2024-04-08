import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Import additional Angular Material modules
// Import additional Angular Material modules
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav'; // Imported MatSidenavModule
import { MatListModule } from '@angular/material/list'; // Import MatListModule for nav list
import { SurveyModule } from "survey-angular-ui";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddIpslogComponent } from './components/ips/add-ipslog/add-ipslog.component';
import { IpslogListComponent } from './components/ips/ipslog-list/ipslog-list.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AddJobDevComponent } from './components/jobDev/add-job-dev/add-job-dev.component';
import { JobDevListComponent } from './components/jobDev/job-dev-list/job-dev-list.component';
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
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { AboutUsComponent } from './components/about-us/about-us.component';import { InviteUserComponent } from './components/invite-user/invite-user.component';
import { InviteUserComponent } from './components/invite-user/invite-user.component';
import { SignUpSuperadminPageComponent } from './components/sign-up-superadmin-page/sign-up-superadmin-page.component';
import { SignUpAdminPageComponent } from './components/sign-up-admin-page/sign-up-admin-page.component';
import { SignUpProviderPageComponent } from './components/sign-up-provider-page/sign-up-provider-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AddIpslogComponent,
    IpslogListComponent,
    HomepageComponent,
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
    LoginPageComponent,
    SignUpPageComponent,
    InviteUserComponent,
    SignUpSuperadminPageComponent,
    SignUpAdminPageComponent,
    SignUpProviderPageComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

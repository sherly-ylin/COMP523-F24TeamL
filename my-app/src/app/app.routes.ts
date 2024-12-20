import { Routes } from '@angular/router';

import { AddIpslogComponent } from './components/ips/add-ipslog/add-ipslog.component';
import { HomeComponent } from './components/home/home.component';
import { IpslogListComponent } from './components/ips/ipslog-list/ipslog-list.component';
import { ClosedListComponent } from './components/closed/closed-list/closed-list.component';
import { AddClosedComponent } from './components/closed/add-closed/add-closed.component';
import { JobDevListComponent } from './components/job-dev/job-dev-list/job-dev-list.component';
import { AddJobDevComponent } from './components/job-dev/add-job-dev/add-job-dev.component';
import { PersonListComponent } from './components/person/person-list/person-list.component';
import { DemographicsComponent } from './components/person/person-list/demographics/demographics.component';
import { ClinicalComponent } from './components/person/person-list/clinical/clinical.component';
import { EducationComponent } from './components/person/person-list/education/education.component';
import { EmploymentComponent } from './components/person/person-list/employment/employment.component';
import { VrComponent } from './components/person/person-list/vr/vr.component';
import { AddPersonComponent } from './components/person/add-person/add-person.component';
import { StaffingListComponent } from './components/staffing/staffing-list/staffing-list.component';
import { AddStaffingComponent } from './components/staffing/add-staffing/add-staffing.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { SetUpReviewPageComponent } from './components/set-up-review-page/set-up-review-page.component';
import { InviteUserComponent } from './components/invite-user/invite-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { inject } from '@angular/core';
import { authGuard } from './auth.guard';
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';
import { RoleGuard } from './role.guard';
import { inviteResolver } from './resolvers/invite.resolver';
import { profileResolver } from './resolvers/profile.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'signup/:token',
    component: SignUpPageComponent,
    resolve: { invite: inviteResolver },
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
    resolve: {
      profile: profileResolver,
    },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', canActivate: [authGuard], component: HomeComponent },
      {
        path: 'profile',
        canActivate: [authGuard],
        component: ProfileEditorComponent,
        resolve: {
          profile: profileResolver,
        },
      },
      {
        path: 'set-up-review',
        canActivate: [authGuard],
        component: SetUpReviewPageComponent,
      },
      {
        path: 'invite-user',
        component: InviteUserComponent,
        canActivate: [authGuard],
      },
      {
        path: 'closed',
        canActivate: [authGuard],
        component: ClosedListComponent,
      },
      {
        path: 'add-closed',
        canActivate: [authGuard],
        component: AddClosedComponent,
      },
      {
        path: 'job-dev',
        canActivate: [authGuard],
        component: JobDevListComponent,
      },
      {
        path: 'add-job-dev',
        canActivate: [authGuard],
        component: AddJobDevComponent,
      },
      {
        path: 'person',
        canActivate: [authGuard],
        component: PersonListComponent,
        children: [],
      },
      { path: 'demographics', component: DemographicsComponent },
      { path: 'clinical', component: ClinicalComponent },
      { path: 'education', component: EducationComponent },
      { path: 'employment', component: EmploymentComponent },
      { path: 'vr', component: VrComponent },

      {
        path: 'add-person',
        canActivate: [authGuard],
        component: AddPersonComponent,
      },
      {
        path: 'ipslog',
        canActivate: [authGuard],
        component: IpslogListComponent,
      },
      {
        path: 'addIPS',
        canActivate: [authGuard],
        component: AddIpslogComponent,
      },
      {
        path: 'staffing',
        canActivate: [authGuard],
        component: StaffingListComponent,
      },
      {
        path: 'add-staffing',
        canActivate: [authGuard],
        component: AddStaffingComponent,
      },
    ],
  },
];

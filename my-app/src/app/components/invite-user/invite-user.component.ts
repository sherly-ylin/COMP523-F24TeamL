import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService, Profile } from 'src/app/services/auth.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Team, TeamService } from 'src/app/services/team.service';
@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    CommonModule, NgFor
  ],
})
export class InviteUserComponent implements OnInit {
  user_role: string;
  role: string;
  teams: Team[];
  teamSelected: number | null = null;
  submitted: boolean;
  
  inviteForm!: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private teamService: TeamService,
    private formBuilder: FormBuilder
  ) {
    // this.email = '';
    this.role = 'provider';
    this.submitted = false;

    this.user_role = this.authService.currentUser?.role ?? '';
    this.authService.getProfile();
    this.authService.profile$.subscribe((profile: Profile | null) => {
      if (profile) {
        console.log('invite user: ', profile);
        this.user_role = profile.role;
        console.log('user_role: ', this.user_role);
      }
    });
    this.teams = this.teamService.currentTeams ?? [];
    this.teamService.teams$.subscribe((teams: Team[]) => {
      if (teams) {
        console.log('teams:', teams);
        this.teams = teams;
        console.log('this teams:', this.teams);
      }
    });
  }

  ngOnInit(): void {
    this.authService.getProfile().subscribe((profile: Profile | null) => {
      if (profile) {
        console.log('invite user: ', profile);
        this.user_role = profile.role;
        console.log('user_role: ', this.user_role);
      }
    });

    this.loadTeams();

    this.inviteForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      role: [this.role, Validators.required],
      selectedTeam: [null],
      timespanString: ['3 day', Validators.required],
    });
  }

  loadTeams(): void {
    this.teamService.getTeams().subscribe((teams) => (this.teams = teams));
  }
  
  getTimespan(timespanString: string) {
    const [value, unit] = timespanString.split(' '); // Split string into value and unit
    let timespan = {
      value: parseInt(value, 10), // Convert the decimal value part to a number
      unit: unit || 'day', // Default to "day" if no unit found
    };
    return timespan;
  }
  onRoleChange(){
    const selectedTeamControl = this.inviteForm.get('selectedTeam');
    if(this.inviteForm.value.role === 'provider'){
      selectedTeamControl?.setValidators([Validators.required]);
    }else {
      selectedTeamControl?.clearValidators();
    }
  }
  public onSubmit() {

    let formval = {
      email: this.inviteForm.value.email,
      role: this.inviteForm.value.role,
      team_id: this.inviteForm.value.selectedTeam,
      timespan: this.getTimespan(this.inviteForm.value.timespanString),
    }

    console.log('form', formval);
    if (this.inviteForm.valid) {
      this.http
        .post('http://localhost:3000/api/auth/invite', {
          email: this.inviteForm.value.email,
          role: this.inviteForm.value.role,
          team_id: this.inviteForm.value.selectedTeam,
          timespan: this.getTimespan(this.inviteForm.value.timespanString),
        })
        .subscribe({
          next: (response) => {
            console.log(response);
            alert('Invite email sent.');
          },
          error: (error) => {
            console.log('There is an error');
            alert(error.error.message);
            console.error(error);
          },
        });
    }
  }
}

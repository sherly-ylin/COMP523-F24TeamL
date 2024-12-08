import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService, Profile } from 'src/app/auth.service';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { Team, TeamService } from 'src/app/services/team.service';
@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css'],
  imports: [
    FormsModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
  ],
})
export class InviteUserComponent {
  user_role: string;
  email: string;
  role: string;
  teams: Team[];
  timespanString: string;
  timespan: { value: number; unit: string };
  submitted: boolean;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private teamService: TeamService
  ) {
    this.email = '';
    this.role = 'Provider';
    this.timespanString = '3 day';
    this.timespan = { value: 3, unit: 'day' };
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

  onTimespanChange() {
    const [value, unit] = this.timespanString.split(' '); // Split string into value and unit
    this.timespan = {
      value: parseInt(value, 10), // Convert the decimal value part to a number
      unit: unit || 'day', // Default to "day" if no unit found
    };
  }

  public onSubmit() {
    this.submitted = true;

    if (this.email && this.role) {
      this.http
        .post('http://localhost:3000/api/auth/invite', {
          email: this.email,
          role: this.role,
          timespan: this.timespan,
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

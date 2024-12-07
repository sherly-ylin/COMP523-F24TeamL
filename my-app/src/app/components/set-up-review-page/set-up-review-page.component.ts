import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Team, TeamService } from 'src/app/services/team.service';
@Component({
  selector: 'app-set-up-review-page',
  imports: [FormsModule, MatSelectModule, MatInputModule, MatButtonModule],
  templateUrl: './set-up-review-page.component.html',
  styleUrl: './set-up-review-page.component.css',
})
export class SetUpReviewPageComponent {
  review = '';
  team = '';
  email = '';
  teams: Team[] = [];

  constructor(private teamService: TeamService){
    this.teamService.teams$.subscribe((teams)=>{
      this.teams = teams;
    })
  }
  onSubmit() {
    console.log('review: ' + this.review);
    console.log('team: ' + this.team);
    console.log('email: ' + this.email);
  }
}

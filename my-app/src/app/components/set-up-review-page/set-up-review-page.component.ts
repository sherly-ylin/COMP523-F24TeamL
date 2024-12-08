import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Team, TeamService } from 'src/app/services/team.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-set-up-review-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    NgFor,
  ],
  templateUrl: './set-up-review-page.component.html',
  styleUrl: './set-up-review-page.component.css',
})
export class SetUpReviewPageComponent implements OnInit {
  // review = '';
  // team = '';
  // email = '';
  teams: Team[] = [];
  selectedTeam: string | null = null;
  reviewForm!: FormGroup;

  constructor(private teamService: TeamService, private formBuilder: FormBuilder) {
    // this.teams = this.teamService.currentTeams ?? [];
    // console.log('teams:', this.teams);
    // // this.teamService.teams$.subscribe((teams)=>{
    // //   this.teams = teams;
    // // })
  }
  ngOnInit() {
    this.reviewForm = this.formBuilder.group({
      review: [null, Validators.required],
      selectedTeam: [null, Validators.required],
    });

    this.loadTeams();
  }

  loadTeams(): void {
    this.teamService.getTeams().subscribe((teams) => (this.teams = teams));
  }
  onSubmit() {
    if (this.reviewForm.valid) {
      console.log('Form Data:', this.reviewForm.value);

      //TODO: Submission logic
    }
  }
}

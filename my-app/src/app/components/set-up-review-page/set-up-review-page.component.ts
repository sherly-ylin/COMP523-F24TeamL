import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
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
  teams: Team[] = [];
  selectedTeam: number | null = null;
  reviewForm!: FormGroup;

  constructor(
    private teamService: TeamService,
    private formBuilder: FormBuilder
  ) {}
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

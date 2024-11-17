import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-set-up-review-page',
  standalone: true,
  imports: [FormsModule, MatSelectModule, MatInputModule, MatButtonModule],
  templateUrl: './set-up-review-page.component.html',
  styleUrl: './set-up-review-page.component.css'
})
export class SetUpReviewPageComponent {
  review = "";
  team = "";
  email = "";
  teams = [
    {name: "team1"},
    {name: "team2"}
  ];

  onSubmit() {
    console.log("review: " + this.review);
    console.log("team: " + this.team);
    console.log("email: " + this.email);
  }
}

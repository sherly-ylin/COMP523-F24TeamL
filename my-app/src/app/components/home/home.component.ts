import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile, AuthService } from 'src/app/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {
  ReviewService,
  ReviewTypes,
  PendingReviewResponse,
} from 'src/app/review.service';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatCardModule, MatListModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
})
export class HomeComponent implements OnInit {
  displayName: string | null | undefined = '';
  totalReviewCount!: number;
  completedReviewCount!: number;
  incompleteReviewCount!: number;
  role: string;
  pendingReviews = [
    { type: 'closed', title: 'Review 1' },
    { type: 'closed', title: 'Review 2' },
    { type: 'closed', title: 'Review 3' },
  ];

  constructor(
    private authService: AuthService,
    private reviewService: ReviewService
  ) {
    this.displayName = 'User'; // Replace with actual user data
    this.role = ''
    this.authService.profile$.subscribe((profile: Profile | null) => {
      if (profile) {
        console.log(profile);
        this.displayName = profile.username;
          // profile.role === 'provider' ? profile.team_name : profile.username;
        this.role = profile.role;
      } else {
        this.displayName = null;
      }
    });
    this.reviewService.getReviewCounts();
    this.reviewService.ReviewCounts$.subscribe((counts) => {
      this.totalReviewCount = counts.total;
      this.completedReviewCount = counts.complete;
      this.incompleteReviewCount = counts.incomplete;
    });
  }

  ngOnInit(): void {}

  goToReview(review_id: number) {}
}

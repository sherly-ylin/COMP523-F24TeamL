import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile, AuthService } from 'src/app/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ReviewService } from 'src/app/review.service';
@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatCardModule, MatListModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
})
export class HomeComponent implements OnInit {
  displayName: string | null | undefined = '';

  pendingReviewCount!: number;
  completedReviewCount!: number;
  totalReviewCount!: number;
  pendingReviews = [
    { id: 1, title: 'Review 1' },
    { id: 2, title: 'Review 2' },
    { id: 3, title: 'Review 3' },
  ];

  constructor(
    private authService: AuthService,
    private reviewService: ReviewService
  ) {
    this.displayName = 'User'; // Replace with actual user data

    this.authService.profile$.subscribe((profile: Profile | null) => {
      if (profile) {
        console.log(profile);
        this.displayName =
          profile.role === 'provider' ? profile.team_name : profile.username;
      } else {
        this.displayName = null;
      }
    });
    this.reviewService.getAllReviewCounts();
    this.reviewService.getPendingReviewCounts();
    this.reviewService.allReviewCount$.subscribe(
      (total) => (this.totalReviewCount = total)
    );
    this.reviewService.pendingReviewCount$.subscribe(
      (pending) => (this.pendingReviewCount = pending)
    );
    this.completedReviewCount = this.reviewService.getCompletedReviewCounts();
  }

  ngOnInit(): void {}

  goToReview(review_id: number){
    
  }
}

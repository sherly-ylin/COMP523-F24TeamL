import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile, ProfileService } from 'src/app/profile.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatCardModule, MatListModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
})
export class HomeComponent implements OnInit {
  displayName: string | null = null;

  reviewsToComplete = 3;
  reviewsCompleted = 5;
  totalReviews = 8;
  pendingReviews = [
    { id: 1, title: 'Review 1' },
    { id: 2, title: 'Review 2' },
    { id: 3, title: 'Review 3' },
  ];

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.displayName = 'Sherly'; // Replace with actual user data

    // this.profileService.profile$.subscribe((profile: Profile | null) => {
    //   if (profile) {
    //     this.displayName = profile.team_name || profile.username;
    //   } else {
    //     this.displayName = null;
    //   }
    // });
  }
}

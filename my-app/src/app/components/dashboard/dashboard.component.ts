import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Profile, AuthService } from 'src/app/auth.service';
import {
  MatSidenavContainer,
  MatSidenav,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatNavList, MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    MatSidenavContainer,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenav,
    MatNavList,
    MatListItem,
    RouterLink,
    MatIcon,
    MatDivider,
    MatSidenavContent,
    RouterOutlet,
  ],
})
export class DashboardComponent implements OnInit {
  userRole: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
     protected authService: AuthService) {
    this.userRole = this.authService.currentUser?.role ?? '';
    this.authService.profile$.subscribe((profile: Profile | null) => {
      if (profile) {
        this.userRole = profile.role;
        console.log(this.userRole);
      }
    });
  }

  ngOnInit(): void {
    const profileData = this.route.snapshot.data['profile'];
    console.log("dashboard:", profileData);

    if (profileData) {
      this.userRole = profileData.role
    }
  
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from 'src/app/guards/auth.service';
import { Profile, ProfileService } from 'src/app/profile.service';
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
    ]
})
export class DashboardComponent implements OnInit{
  private router = inject(Router);
  public authService = inject(AuthService);
  private profileService = inject(ProfileService);

  userRole: string | null = null;

  constructor(
  ) {}

  ngOnInit(): void {
    const user = this.profileService.currentUser;
    if (user){
      this.userRole = user.role;
    }
  }

}

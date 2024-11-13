import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { MatNavList, MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: true,
    imports: [MatSidenavContainer, MatToolbarModule,MatButtonModule, MatMenuModule, MatSidenav, MatNavList, MatListItem, RouterLink, MatIcon, MatDivider, MatSidenavContent, RouterOutlet]
})
export class DashboardComponent {
  authenticated = false;
  constructor(
    private router: Router,
    private authService: AuthService) {
    this.authenticated = this.isLoggedIn();
  }
  

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  signOut(): void {
    localStorage.removeItem('accessToken');
    this.router.navigate(['']); // Navigate to login after sign out
  }

}

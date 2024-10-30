import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, RouterLink, RouterLinkActive, MatSidenavModule, MatIconModule, MatDividerModule, MatListModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  signOut(): void {
    localStorage.removeItem('accessToken');
    this.router.navigate(['']); // Navigate to login after sign out
  }
}

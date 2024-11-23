import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>',
    imports: [RouterOutlet]
})
export class AppComponent {
  title = 'ips';
  authenticated = false;
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.authenticated = authService.isLoggedIn();
  }

  signOut(): void {
    localStorage.removeItem('accessToken');
    this.router.navigate(['']); // Navigate to login after sign out
  }
}

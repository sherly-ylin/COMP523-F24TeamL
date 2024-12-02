import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  imports: [RouterOutlet],
})
export class AppComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  title = 'ips';
  authenticated = false;
  constructor() {
    const authService = this.authService;

    this.authenticated = authService.isAuthenticated();
  }

  signOut(): void {
    localStorage.removeItem('accessToken');
    this.router.navigate(['']); // Navigate to login after sign out
  }
}

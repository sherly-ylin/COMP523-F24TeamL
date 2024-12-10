import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    const user = this.authService.currentUser;
    if (user) {
      if (user.role === 'admin' || user.role === 'superadmin') {
        return true;
      } else {
        if (
          confirm(
            'You do not have access to this page.',
          )
        ) {
          this.router.navigate(['/dashboard']);
        }

        return false;
      }
    } else {
      if (confirm('You are not logged in. Redirecting to the login page.')) {
        this.router.navigate(['/login']);
      }
      return false;
    }
  }
}

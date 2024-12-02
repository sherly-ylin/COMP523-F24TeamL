import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private profileService: ProfileService, private router: Router) {}

  canActivate(): boolean {
    const user = this.profileService.currentUser;
    if (user) {
      if (user.role === 'admin' || user.role === 'superadmin') {
        return true;
      } else {
        if (
          confirm(
            'You do not have access to this page. Redirecting to dashboard.'
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

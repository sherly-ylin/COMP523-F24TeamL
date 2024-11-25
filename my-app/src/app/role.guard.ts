import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private profileService: ProfileService, private router: Router) {}

  canActivate(): boolean {
    const user = this.profileService.currentUser;
    if (user) {
      if (user.role === 'admin' || user.role === 'superadmin') {
        return true; 
      } else {
        // Todo: need to add access denied page
        this.router.navigate(['/access-denied']); 
        return false;
      }
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Token exists, user is logged in
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}

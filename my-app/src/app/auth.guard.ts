import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Token exists, user is logged in
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

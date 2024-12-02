import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Token exists, user is logged in
      // console.log("user exists, token =", token);
      return true;
    } else {
      if (
        confirm('You are not logged in. Redirecting you to the login page.')
      ) {
        this.router.navigate(['/login']);
      }
      return false;
    }
  }
}

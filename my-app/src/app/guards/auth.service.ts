import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Profile, ProfileService } from '../profile.service';

interface LoginResponse {
  id: number;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  role: 'provider' | 'admin' | 'superadmin';
  team_name?: string;
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private http = inject(HttpClient);

  private authenticated = false;

  constructor() { }

  isAuthenticated(): boolean {
    // // Implement your authentication logic here
    // const token = localStorage.getItem('token'); // get token from local storage
    // if (token === null) {
    //   return false;
    // }
    // const payload = atob(token.split('.')[1]); // decode payload of token
    // const parsedPayload = JSON.parse(payload); // convert payload into an Object
    // return parsedPayload.exp > Date.now() / 1000; // check if token is expired
    return this.authenticated;
  }

  signIn(username: string, password: string): void {
    this.http
      .post<LoginResponse>('http://localhost:3000/api/auth/signin', {
        username,
        password,
      })
      .pipe(
        // Handle any errors with a fallback
        catchError((error) => {
          alert(error?.error?.message || 'An error occurred during sign-in.');
          console.error('Sign-in error:', error);
          return of(null); // Return a null observable to prevent breaking the stream
        }),
      )
      .subscribe({
        next: (response) => {
          if (response && response.accessToken) {
            // const profile: Profile = {
            //   id: response.id,
            //   username: response.username,
            //   first_name: response.first_name,
            //   last_name: response.last_name,
            //   email: response.email,
            //   role: response.role,
            //   team_name:
            //     response.role === 'provider' ? response.team_name : null,
            // };
            // this.profileService.manuallyUpdateProfile(profile);

            // Storing token and navigating to the dashboard
            localStorage.setItem('accessToken', response.accessToken);
            this.authenticated = true;
            this.router.navigate(['./dashboard']);
          } else {
            alert('Invalid response or missing access token.');
          }
        },
      });
  }

  signOut() {
    if (confirm('Are you sure to sign out?')) {
      localStorage.removeItem('accessToken');
    }
    this.authenticated = false;
    this.router.navigate(['/login']); // Navigate to login after sign out
  }
  /**
   * Adds a user to user array.
   *
   * @returns Event object.
   */

  // addUser(e: User): Observable<User> {
  //   return this.http.post<User>("/api/auth/signup", e);
  // }

  isAdmin(): Observable<any> {
    return this.http.get('localhost:3000/API/test/admin');
  }
}

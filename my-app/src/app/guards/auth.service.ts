import { Injectable, Signal, WritableSignal, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, ReplaySubject, BehaviorSubject, Subject, tap, of } from 'rxjs';

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

export interface Profile {
  id: number;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  role: 'provider' | 'admin' | 'superadmin'; //consider making it number
  team_name?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private http = inject(HttpClient);

  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  private authenticated = false;

  private profileSubject = new BehaviorSubject<Profile | null>(null);
  profile$ = this.profileSubject.asObservable();

  private baseUrl = 'http://localhost:3000/';

  constructor() { }

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
            const profile: Profile = {
              id: response.id,
              username: response.username,
              first_name: response.first_name,
              last_name: response.last_name,
              email: response.email,
              role: response.role,
              team_name:
                response.role === 'provider' ? response.team_name : null,
            };
            this.manuallyUpdateProfile(profile);

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

  getProfile(): Observable<Profile> {
    return this.http
      .get<Profile>(`${this.baseUrl}/user/profile`)
      .pipe(tap((profile) => this.profileSubject.next(profile)));
  }

  // Get the current user synchronously
  get currentUser(): Profile | null {
    return this.profileSubject.value;
  }

  // Update the user's basic info
  updateProfile(profile: Partial<Profile>): Observable<Profile> {
    return this.http
      .patch<Profile>(`${this.baseUrl}/user/profile`, profile)
      .pipe(tap((updatedProfile) => this.profileSubject.next(updatedProfile)));
  }

  manuallyUpdateProfile(profile: Profile|any) {
    this.profileSubject.next(profile);
  }

  updateEmail(email: string): Observable<any> {
    return this.http.post<Profile>(`${this.baseUrl}/user/email`, { email });
  }
  updatePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Observable<any> {
    return this.http.put<Profile>(`${this.baseUrl}/password`, data);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Profile, ProfileService } from './profile.service';
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

interface VerifyTokenResponse {
  email: string;
}

export interface User {
  username: string;
  id: number | null;
  email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  private email: string | null = null;
  setEmail(email: string): void {
    this.email = email;
  }
  getEmail(): string | null {
    return this.email;
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private profileService: ProfileService
  ) {}

  async verifyTokenAndGetEmail(
    route: ActivatedRouteSnapshot
  ): Promise<boolean> {
    console.log('Frontend token:', route.params['token']);
    await this.http
      .post<VerifyTokenResponse>(
        'http://localhost:3000/api/auth/verify-token-get-email',
        {
          token: route.params['token'],
        }
      )
      .pipe(
        // Handle any errors with a fallback
        catchError((error) => {
          alert(
            error?.error?.message ||
              'An error occurred during verifying token and get email.'
          );
          console.error('verify token error:', error);
          return of(null); // Return a null observable to prevent breaking the stream
        })
      )
      .subscribe({
        next: (response) => {
          if (response && response.email) {
            this.setEmail(response.email);
            console.log('got email:', this.getEmail());
          } else {
            console.log('Invalid invite token');
          }
        },
      });
    console.log('outside:', this.getEmail());
    return !!this.getEmail();
  }

  checkToken(route: ActivatedRouteSnapshot) {
    return !!this.verifyTokenAndGetEmail(route);
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
        })
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
            this.router.navigate(['./dashboard']);
          } else {
            alert('Invalid response or missing access token.');
          }
        },
      });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken'); //convert the result into a strict Boolean value (true or false)
  }

  signOut() {
    if (confirm('Are you sure to sign out?')) {
      localStorage.removeItem('accessToken');
    }
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

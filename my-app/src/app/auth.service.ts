import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface LoginResponse {
  accessToken: string;
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

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  isTokenValid(route: ActivatedRouteSnapshot): boolean {
    console.log('Frontend token:', route.params['token']);
    return true;
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
            // Storing token and navigating to the dashboard
            localStorage.setItem('accessToken', response.accessToken);
            console.log('Access token stored:', response.accessToken);
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

import { Injectable, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, tap, of } from 'rxjs';

interface LoginResponse {
  id: number;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  role: 'provider' | 'admin' | 'superadmin';
  team_id: number | null;
  team_name: string | null;
  accessToken: string;
}

export interface Profile {
  id: number;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  role: 'provider' | 'admin' | 'superadmin';
  team_id: number | null;
  team_name: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  private authenticated = false;

  private profileSubject = new BehaviorSubject<Profile | null>(null);
  profile$ = this.profileSubject.asObservable();

  private baseUrl = 'http://localhost:3000';


  constructor(private router: Router, private http: HttpClient) {}

  signIn(username: string, password: string): void {
    this.http
      .post<LoginResponse>(`${this.baseUrl}/api/auth/signin`, {
        username,
        password,
      })
      .pipe(
        catchError((error) => {
          alert(error?.error?.message || 'An error occurred during sign-in.');
          console.error('Sign-in error:', error);
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          if (response && response.accessToken) {
            localStorage.setItem('accessToken', response.accessToken);
            this.authenticated = true;
            this.router.navigate(['./dashboard']);
          }
        },
        error: (error)=>{
          console.log(error);
        }
      });
  }

  sendVerificationCode(username: string) {
    this.http.post<Response>('http://localhost:3000/api/auth/sendVerificationCode', {
      username: username,
    })
    .pipe(
      catchError((error) => {
        alert(error?.error?.message || 'An error occurred during sending verification code.');
        return of(null); 
      }),
    )
    .subscribe((response: any) => {
      alert("Verification code sent! Check your email inbox.");
      console.log('Response:', response);
    });
  }

  verifyEmail(username: string, verificationCode: string): Observable<boolean | null> {
    return this.http.post<boolean>('http://localhost:3000/api/auth/verifyEmail', {
      username: username,
      verificationCode: verificationCode,
    })
    .pipe(
      catchError((error) => {
        alert(error?.error?.message || 'An error occurred during verify email.');
        return of(null);
      }),
    )
  }

  resetPassword(username: string, password: string) {
    return this.http.post<boolean>('http://localhost:3000/api/auth/resetPassword', {
      username: username,
      password: password,
    })
    .pipe(
      catchError((error) => {
        alert(error?.error?.message || 'An error occurred during reset password.');
        return of(null); 
      }),
    )
  }

  signOut() {
    if (confirm('Are you sure to sign out?')) {
      localStorage.removeItem('accessToken');
      this.http.post(`${this.baseUrl}/auth/signout`, this.currentUser);
    }
    this.authenticated = false;
    this.router.navigate(['/login']); // Navigate to login after sign out
  }

  isAuthenticated(): boolean {
    let result = !!localStorage.getItem('accessToken');
    this.loggedIn.next(result);
    return result;
  }

  // Profile
  get currentUser(): Profile | null {
    return this.profileSubject.value;
  }

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}/user/profile`).pipe(
      tap((profile: Profile) => {
        this.profileSubject.next(profile);
        console.log('get profile');
        console.log(profile);
      })
    );
  }

  // Update the user's basic info
  updateProfile(profile: Partial<Profile>): Observable<Profile> {
    console.log("authservice.updateprofile:");
    console.log(profile);
    let res = this.http
      .patch<Profile>(`${this.baseUrl}/user/profile`, profile)
      .pipe(tap((updatedProfile) => this.profileSubject.next(updatedProfile)));
    this.getProfile();
    return res;
  }

  manuallyUpdateProfile(profile: Profile | any) {
    this.profileSubject.next(profile);
  }

  requestEmailChange(email: string): Observable<any> | any {
    this.sendVerificationCode(email)
    return of(true);
  }

  verifyAndUpdateEmail(email: string, code: string): Observable<any> | any {
    return this.verifyEmail(email, code)
  }

  updatePassword(data: {
    oldPassword: string;
    newPassword: string;
  }): Observable<any> {
    return this.http.post<Profile>(`${this.baseUrl}/user/change-password`, data);
  }
}

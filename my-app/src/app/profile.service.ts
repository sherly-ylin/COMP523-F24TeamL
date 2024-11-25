import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Observable, ReplaySubject, BehaviorSubject, Subject, tap } from 'rxjs';
import { AuthService } from './auth.service';

export interface Profile {
  id: number;
  username: string |null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  role: 'provider' | 'admin' | 'superadmin'; //consider making it number
  password?: string;
  // permissions: ;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileSubject = new BehaviorSubject<Profile | null>(null);
  profile$ = this.profileSubject.asObservable();

  constructor(protected http: HttpClient, protected auth: AuthService) {
    // this.auth.isAuthenticated$.subscribe((isAuthenticated) =>
    //   this.refreshProfile(isAuthenticated)
    // );
  }
  getProfile(): Observable<Profile> {
    return this.http
      .get<Profile>('http://localhost:3000/api/profile/')
      .pipe(tap((profile) => this.profileSubject.next(profile)));
  }

  // Get the current user synchronously
  get currentUser(): Profile | null {
    return this.profileSubject.value;
  }
  // private refreshProfile(isAuthenticated: boolean) {
  //   if (isAuthenticated) {
  //     this.http.get<Profile>('/api/profile').subscribe({
  //       next: (profile) => {
  //         this.profileSubject.next(profile);
  //         this.profileSignal.set(profile);
  //       },
  //       error: () => {
  //         this.profileSubject.next(undefined);
  //         this.profileSignal.set(undefined);
  //       }
  //     });
  //   } else {
  //     this.profileSubject.next(undefined);
  //     this.profileSignal.set(undefined);
  //   }
  // }
  // Update the user's profile
  updateProfile(profile: Partial<Profile>): Observable<Profile> {
    return this.http
      .put<Profile>('http://localhost:3000/api/profile/', profile)
      .pipe(tap((updatedProfile) => this.profileSubject.next(updatedProfile)));
  }
  // updateProfile(firstname: string, lastname: string, email: string) {
  //   this.http
  //     .put('http://localhost:3000/api/profile', {
  //       first_name: firstname,
  //       last_name: lastname,
  //       email: email,
  //     })
  //     .subscribe({
  //       next: (response) => {
  //         console.log(response);
  //         alert('Verification email sent. Please check your inbox.');
  //       },
  //       error: (error) => {
  //         alert(error.error.message);
  //         console.error(error);
  //       },
  //     });
  // }

  updatePassword(passward: string) {}
}

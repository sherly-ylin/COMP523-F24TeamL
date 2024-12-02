import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Observable, ReplaySubject, BehaviorSubject, Subject, tap } from 'rxjs';
import { AuthService } from './auth.service';

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
  providedIn: 'root',
})
export class ProfileService {
  private profileSubject = new BehaviorSubject<Profile | null>(null);
  profile$ = this.profileSubject.asObservable();

  private baseUrl = 'http://localhost:3000/api/user';

  constructor(protected http: HttpClient, protected auth: AuthService) {
    // this.auth.isAuthenticated$.subscribe((isAuthenticated) =>
    //   this.refreshProfile(isAuthenticated)
    // );
  }
  getProfile(): Observable<Profile> {
    return this.http
      .get<Profile>(this.baseUrl)
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
      .patch<Profile>(this.baseUrl, profile)
      .pipe(tap((updatedProfile) => this.profileSubject.next(updatedProfile)));
  }
  manuallyUpdateProfile(profile: Profile|any) {
    this.profileSubject.next(profile);
  }

  updateEmail(email: string): Observable<any> {
    return this.http.post<Profile>(`${this.baseUrl}/email`, { email });
  }
  updatePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Observable<any> {
    return this.http.put<Profile>(`${this.baseUrl}/password`, data);
  }
}

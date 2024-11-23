import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { AuthService } from './auth.service';

export interface Profile {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  role: number;
  // password:
  // permissions: ;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileSubject: Subject<Profile | undefined> = new ReplaySubject(1);
  public profile$: Observable<Profile | undefined> =
    this.profileSubject.asObservable();

  constructor(protected http: HttpClient, protected auth: AuthService) {
    // this.auth.isAuthenticated$.subscribe((isAuthenticated) =>
    //   this.refreshProfile(isAuthenticated)
    // );
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

  updateProfile(firstname: string, lastname: string, email: string) {
    this.http
      .put('http://localhost:3000/api/profile/update', {
        first_name: firstname,
        last_name: lastname,
        email: email,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          alert('Verification email sent. Please check your inbox.');
        },
        error: (error) => {
          alert(error.error.message);
          console.error(error);
        },
      });
  }

  updatePassword(passward: string){

  }
}

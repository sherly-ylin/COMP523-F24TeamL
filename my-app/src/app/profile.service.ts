import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, WritableSignal, signal, inject } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { AuthService } from './auth.service';

export interface Profile {
  id: number | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  role: number;
  // permissions: ;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  protected http = inject(HttpClient);
  protected auth = inject(AuthService);

  private profileSubject: Subject<Profile | undefined> = new ReplaySubject(1);
  public profile$: Observable<Profile | undefined> =
    this.profileSubject.asObservable();

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
}

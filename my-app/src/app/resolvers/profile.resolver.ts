import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { Profile, AuthService } from '../services/auth.service';
import { tap, catchError, of } from 'rxjs';

export const profileResolver: ResolveFn<Profile | null> = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.getProfile().pipe(
    catchError((error) => {
      console.error('Error fetching profile:', error);
      router.navigate(['/login']); // Redirect to login on failure
      return of(null); // Return null on error
    })
  );
};

import { RedirectCommand, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { IInvite } from '../../../../api/src/models/inviteSchema';
import { Router } from '@angular/router';

export const inviteResolver: ResolveFn<IInvite> = (route, state) => {
  const router = inject(Router);

  return inject(HttpClient)
    .get<IInvite>(
      `http://localhost:3000/api/auth/invite/${route.paramMap.get('token')}`,
    )
    .pipe(
      catchError((error) => {
        console.log('error:', error);
        return of(
          new RedirectCommand(router.createUrlTree(['/login']), {
            skipLocationChange: true,
          }),
        );
      }),
    );
};

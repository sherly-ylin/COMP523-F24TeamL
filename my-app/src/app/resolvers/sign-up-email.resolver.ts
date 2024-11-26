import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { IInvite } from 

export const InviteResolver: ResolveFn<Invite> = (route, state) => {
  const http = inject(HttpClient);
  return http.get<Invite>(`/api/auth/invite/${route.paramMap.get('token')}`).pipe(
    catchError(error => {
      return of('No data');
    })
  );
};

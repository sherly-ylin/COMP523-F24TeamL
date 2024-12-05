import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('accessToken'); // Retrieve token from local storage
  console.log("jwt token:", token);
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};

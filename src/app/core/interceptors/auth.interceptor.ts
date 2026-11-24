import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { readonly } from '@angular/forms/signals';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken = authService.getAccessToken();

  if (accessToken) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return next(clonedRequest);
  } else {
    return next(req);
  }
};

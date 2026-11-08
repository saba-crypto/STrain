import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  if (authService.isAuthenticated()) {
    const accessToken = localStorage.getItem('accessToken');
    const clonedRequest = req.clone({
      setHeaders: {
        Authentication: `Bearer ${accessToken}`,
      },
    });
    return next(clonedRequest);
  } else {
    return next(req);
  }
};

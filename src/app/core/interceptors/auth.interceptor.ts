import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
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

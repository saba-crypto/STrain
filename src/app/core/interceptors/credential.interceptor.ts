import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environments';

export const credentialInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    setHeaders: {
      'X-STEP-KEY': environment.apiKey,
    },
  });
  return next(clonedRequest);
};

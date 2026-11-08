import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { inject } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { credentialInterceptor } from './core/interceptors/credential.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideAppInitializer(() => {
      inject(AuthService).init();
    }),
    provideHttpClient(withInterceptors([credentialInterceptor])),
  ],
};

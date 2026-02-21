import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],

  // providers: [
  //   provideBrowserGlobalErrorListeners(),
  //   provideRouter(routes, {
  //     initialNavigation: 'enabledBlocking',   // 👈 this is the option
  //     onSameUrlNavigation: 'reload'           // optional, reloads on same route
  //   }),
  //   //provideHttpClient(),
  //   // 1. Tell HttpClient to look for class-based interceptors
  //   provideHttpClient(withInterceptorsFromDi()),

  //   // 2. Register the class manually
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: TokenInterceptor,
  //     multi: true,
  //   },
  //   // provideHttpClient(
  //   //   withInterceptors([TokenInterceptor]),
  //   //   // You can add more here: [authInterceptor, loggingInterceptor]
  //   // ),
  // ],
};

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login/socialauth.service';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient()]
};

import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';

import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { AppTheme } from './theme/app-theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      license: environment.primeuiLicenseKey,
      theme: {
        preset: AppTheme,
        options: {
          darkModeSelector: false,
        },
      },
    }),
  ],
};

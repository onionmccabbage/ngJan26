import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
// see https://angular.dev/guide/routing/data-resolvers
// use routing data as component input signals - added withComponentInputBinding
import { provideRouter,withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // added withComponentInputBinding()

    provideRouter(routes, withComponentInputBinding())
  ]
};

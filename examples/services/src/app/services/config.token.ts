// see https://angular.dev/guide/di/defining-dependency-providers
import {InjectionToken} from '@angular/core';
export interface AppConfig {
  apiUrl: string;
  version: string;
  features: Record<string, boolean>;
}
// Globally available configuration using providedIn
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config', {
  providedIn: 'root',
  factory: () => ({
    apiUrl: 'https://helloacm.com/api/fortune/',
    version: '1.0.0',
    features: {
      darkMode: true,
      analytics: false,
    },
  }),
});

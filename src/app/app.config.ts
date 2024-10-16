import {ApplicationConfig, LOCALE_ID} from '@angular/core';
import {provideRouter} from '@angular/router';
import {registerLocaleData} from "@angular/common";
import localeEs from '@angular/common/locales/es';
import {routes} from './app.routes';
import {provideHttpClient, withFetch} from "@angular/common/http";

registerLocaleData(localeEs, 'es');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    {provide: LOCALE_ID, useValue: 'es'}
  ]
};

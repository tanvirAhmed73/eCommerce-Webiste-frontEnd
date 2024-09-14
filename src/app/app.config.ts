import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNgxStripe } from 'ngx-stripe';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideNgxStripe(
      'pk_test_51PKjyrP7xdk8VFinDPsp1iRzYX73AFrCzoDcPXeoA89vE5P24Q0l1hzIcJOnXFZpKFBuWiNFDwQuyy3PlQRbkS9200m6IPpOMn'
    ),
  ],
};

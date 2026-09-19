import { Injectable, PLATFORM_ID, effect, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ConsentService } from '../../shared/cookie-consent/consent.service';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Bridges the cookie-consent state and SPA route changes to the gtag.js
 * snippet loaded in index.html. GA is always loaded (required for Google's
 * consent-mode pinging), but `gtag('consent', 'default', ...)` in index.html
 * keeps it cookie-less until the visitor opts in via the cookie banner.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    if (!this.isBrowser) return;

    const consent = inject(ConsentService);
    const router = inject(Router);

    effect(() => {
      const analyticsGranted = consent.isAllowed('analytics');
      const marketingGranted = consent.isAllowed('marketing');

      window.gtag?.('consent', 'update', {
        analytics_storage: analyticsGranted ? 'granted' : 'denied',
        ad_storage: marketingGranted ? 'granted' : 'denied',
        ad_user_data: marketingGranted ? 'granted' : 'denied',
        ad_personalization: marketingGranted ? 'granted' : 'denied',
      });
    });

    router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        window.gtag?.('event', 'page_view', {
          page_path: event.urlAfterRedirects,
          page_location: window.location.href,
          page_title: document.title,
        });
      });
  }
}

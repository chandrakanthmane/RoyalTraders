import { ChangeDetectionStrategy, Component, afterNextRender, signal } from '@angular/core';

const STORAGE_KEY = 'royal-traders-cookie-consent';

type ConsentStatus = 'accepted' | 'rejected' | 'partial';

interface StoredCookieConsent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  status: ConsentStatus;
  updatedAt: string;
}

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.html',
  styleUrl: './cookie-consent.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieConsent {
  protected readonly visible = signal(false);
  protected readonly showDetails = signal(false);
  protected readonly analyticsEnabled = signal(true);
  protected readonly marketingEnabled = signal(true);

  constructor() {
    afterNextRender(() => {
      if (!this.readStoredConsent()) {
        this.visible.set(true);
      }
    });
  }

  protected toggleDetails(): void {
    this.showDetails.update((open) => !open);
  }

  protected toggleAnalytics(): void {
    this.analyticsEnabled.update((enabled) => !enabled);
  }

  protected toggleMarketing(): void {
    this.marketingEnabled.update((enabled) => !enabled);
  }

  protected acceptAll(): void {
    this.saveConsent('accepted', true, true);
  }

  protected rejectAll(): void {
    this.saveConsent('rejected', false, false);
  }

  protected savePreferences(): void {
    this.saveConsent('partial', this.analyticsEnabled(), this.marketingEnabled());
  }

  private readStoredConsent(): StoredCookieConsent | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as StoredCookieConsent) : null;
    } catch {
      return null;
    }
  }

  private saveConsent(status: ConsentStatus, analytics: boolean, marketing: boolean): void {
    const consent: StoredCookieConsent = {
      necessary: true,
      analytics,
      marketing,
      status,
      updatedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      /* private-browsing storage limits — consent still applies for this session */
    }
    this.visible.set(false);
  }
}

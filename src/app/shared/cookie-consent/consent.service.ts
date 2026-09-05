import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import {
  CookieConfig,
  CookieConfigResponse,
  ConsentStatus,
  FALLBACK_CONFIG,
  StoredConsent,
} from './consent.model';

const STORAGE_KEY = 'royal-traders-cookie-consent';
const VISITOR_KEY = 'royal-traders-visitor-id';
const API_URL = '/api/consent';

@Injectable({ providedIn: 'root' })
export class ConsentService {
  private readonly http = inject(HttpClient);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly config = signal<CookieConfig>(FALLBACK_CONFIG);
  readonly stored = signal<StoredConsent | null>(null);
  readonly bannerOpen = signal(false);

  private initialised = false;

  /** True once the visitor has a decision that matches the current policy version. */
  readonly hasCurrentConsent = computed(() => {
    const decision = this.stored();
    return !!decision && decision.policyVersion === this.config().policyVersion;
  });

  /** Call once, from the banner component, on first browser render. */
  init(): void {
    if (!this.isBrowser || this.initialised) return;
    this.initialised = true;

    this.stored.set(this.readLocal());
    // No decision at all -> show straight away with fallback content.
    if (!this.stored()) this.bannerOpen.set(true);

    this.http
      .get<CookieConfigResponse>(API_URL)
      .pipe(catchError(() => of<CookieConfigResponse>({ ok: false, config: null })))
      .subscribe((res) => {
        if (res.config) {
          this.config.set({
            policyVersion: res.config.policy_version,
            banner: res.config.banner,
            categories: res.config.categories,
          });
        }
        // Re-prompt if there is no decision or the policy changed since it was made.
        this.bannerOpen.set(!this.hasCurrentConsent());
      });
  }

  /** Re-open the banner from a "Manage cookies" link anywhere in the app. */
  reopen(): void {
    this.bannerOpen.set(true);
  }

  /** Whether a given cookie category is currently allowed by the visitor. */
  isAllowed(categoryKey: string): boolean {
    return this.stored()?.categories[categoryKey] === true;
  }

  save(status: ConsentStatus, categories: Record<string, boolean>): void {
    const record: StoredConsent = {
      status,
      categories: { ...categories, necessary: true },
      policyVersion: this.config().policyVersion,
      updatedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      /* private browsing storage limits — consent still applies this session */
    }
    this.stored.set(record);
    this.bannerOpen.set(false);

    // Fire-and-forget remote log; the local copy is already the source of truth.
    this.http
      .post(API_URL, {
        visitorId: this.getOrCreateVisitorId(),
        status: record.status,
        categories: record.categories,
        policyVersion: record.policyVersion,
        userAgent: navigator.userAgent,
        pageUrl: location.pathname,
      })
      .pipe(catchError(() => of(null)))
      .subscribe();
  }

  private readLocal(): StoredConsent | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as StoredConsent) : null;
    } catch {
      return null;
    }
  }

  private getOrCreateVisitorId(): string {
    try {
      const existing = localStorage.getItem(VISITOR_KEY);
      if (existing) return existing;
      const id = crypto.randomUUID();
      localStorage.setItem(VISITOR_KEY, id);
      return id;
    } catch {
      return crypto.randomUUID();
    }
  }
}

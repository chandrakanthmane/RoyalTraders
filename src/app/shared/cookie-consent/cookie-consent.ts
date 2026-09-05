import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ConsentService } from './consent.service';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.html',
  styleUrl: './cookie-consent.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieConsent {
  private readonly consent = inject(ConsentService);

  protected readonly visible = this.consent.bannerOpen;
  protected readonly config = this.consent.config;
  protected readonly showDetails = signal(false);

  /** Per-category on/off state while the preferences panel is open. */
  protected readonly selections = signal<Record<string, boolean>>({});

  protected readonly categories = computed(() => this.config().categories);

  constructor() {
    afterNextRender(() => this.consent.init());
  }

  protected toggleDetails(): void {
    if (!this.showDetails()) {
      this.resetSelections();
    }
    this.showDetails.update((open) => !open);
  }

  protected toggleCategory(key: string): void {
    this.selections.update((current) => ({ ...current, [key]: !current[key] }));
  }

  protected isSelected(key: string): boolean {
    return this.selections()[key] ?? false;
  }

  protected acceptAll(): void {
    this.consent.save('accepted', this.everyCategory(true));
  }

  protected rejectAll(): void {
    this.consent.save('rejected', this.everyCategory(false));
  }

  protected savePreferences(): void {
    this.consent.save('partial', { ...this.selections() });
  }

  private everyCategory(value: boolean): Record<string, boolean> {
    return Object.fromEntries(
      this.config().categories.map((category) => [
        category.key,
        category.required ? true : value,
      ])
    );
  }

  private resetSelections(): void {
    this.selections.set(
      Object.fromEntries(
        this.config().categories.map((category) => [
          category.key,
          category.required ? true : category.defaultEnabled,
        ])
      )
    );
  }
}

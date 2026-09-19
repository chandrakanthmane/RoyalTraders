import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { CookieConsent } from './shared/cookie-consent/cookie-consent';
import { AnalyticsService } from './core/analytics/analytics.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CookieConsent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'min-h-screen flex flex-col',
  },
})
export class App {
  private readonly analytics = inject(AnalyticsService);
}

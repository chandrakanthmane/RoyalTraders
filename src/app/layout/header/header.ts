import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BrandMark } from '../../shared/brand-mark/brand-mark';

interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, BrandMark],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
    '[class.header--scrolled]': 'scrolled()',
  },
})
export class Header {
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);

  protected readonly navLinks: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Print', path: '/print' },
    { label: 'Packaging', path: '/packaging' },
    { label: 'Security', path: '/security' },
    { label: 'Blogs', path: '/blogs' },
  ];

  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 50);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}

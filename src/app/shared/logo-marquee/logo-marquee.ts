import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

export interface LogoMarqueeItem {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-logo-marquee',
  imports: [NgOptimizedImage],
  templateUrl: './logo-marquee.html',
  styleUrl: './logo-marquee.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoMarquee {
  readonly items = input.required<LogoMarqueeItem[]>();
}

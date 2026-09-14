import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';
import { CountUpDirective } from '../../shared/count-up.directive';

interface ValueProp {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-security-solutions',
  imports: [NgOptimizedImage, RevealOnScrollDirective, CountUpDirective],
  templateUrl: './security-solutions.html',
  styleUrl: './security-solutions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecuritySolutions {
  protected readonly heroImage = 'images/optimized/security-hero.webp';

  protected readonly certificateImage = 'images/optimized/security-certificate.webp';
  protected readonly hologramImage = 'images/optimized/security-hologram.webp';
  protected readonly idCardImage = 'images/optimized/security-id-card.webp';
  protected readonly chequesImage = 'images/optimized/security-cheques.webp';
  protected readonly letterheadImage = 'images/optimized/security-letterhead.webp';
  protected readonly stickerImage = 'images/optimized/security-sticker.webp';

  protected readonly valueProps: ValueProp[] = [
    {
      icon: 'verified_user',
      title: 'Authenticated',
      description: 'Multi-layered verification methods ensuring zero compromise on authenticity.',
    },
    {
      icon: 'lock',
      title: 'Confidential',
      description: 'Secure production facilities with 24/7 surveillance and strict access controls.',
    },
    {
      icon: 'precision_manufacturing',
      title: 'Industrial',
      description: 'Advanced German machinery delivering mechanical precision at scale.',
    },
  ];

  private readonly title = inject(Title);

  constructor() {
    this.title.setTitle('Security Solutions | Royal Traders');
  }
}

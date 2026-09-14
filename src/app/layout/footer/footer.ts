import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BrandMark } from '../../shared/brand-mark/brand-mark';
import { ConsentService } from '../../shared/cookie-consent/consent.service';

interface Certificate {
  alt: string;
  src: string;
}

interface QuickLink {
  label: string;
}

@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage, RouterLink, BrandMark],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly consent = inject(ConsentService);
  protected readonly currentYear = new Date().getFullYear();

  protected readonly quickLinks: QuickLink[] = [
    { label: 'Privacy Policy' },
    { label: 'Terms of Service' },
    { label: 'Security Standards' },
    { label: 'Global Presence' },
  ];

  protected readonly certificates: Certificate[] = [
    { alt: 'RCS Certification', src: 'images/optimized/footer-cert-rcs.webp' },
    { alt: 'QRO Certification', src: 'images/optimized/footer-cert-qro.webp' },
    { alt: 'Royal Assessment Certification', src: 'images/optimized/footer-cert-royal-assessment.webp' },
    { alt: 'Make in India', src: 'images/optimized/footer-cert-make-in-india.webp' },
    { alt: 'Startup India', src: 'images/optimized/footer-cert-startup-india.webp' },
    { alt: 'MSME Registration', src: 'images/optimized/footer-cert-msme.webp' },
  ];
}

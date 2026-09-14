import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';

interface ServiceOffering {
  icon: string;
  title: string;
  items?: string[];
  description?: string;
}

interface Machine {
  image: string;
  title: string;
  usedFor: string[];
  capabilities: string[];
}

@Component({
  selector: 'app-print-services',
  imports: [NgOptimizedImage, RevealOnScrollDirective],
  templateUrl: './print-services.html',
  styleUrl: './print-services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrintServices {
  protected readonly heroImage = 'images/optimized/print-hero.webp';

  protected readonly services: ServiceOffering[] = [
    {
      icon: 'storefront',
      title: 'Commercial Printing',
      items: ['Brochures & Catalogues', 'Leaflets & Flyers', 'Posters', 'Newsletters'],
    },
    {
      icon: 'business_center',
      title: 'Corporate Stationery',
      items: ['Letterheads & Envelopes', 'Business Cards', 'Notepads', 'Presentation Folders'],
    },
    {
      icon: 'calendar_month',
      title: 'Calendars',
      items: ['Wall Calendars', 'Desktop Calendars', 'Custom Formats'],
    },
    {
      icon: 'account_balance',
      title: 'Institutional Printing',
      items: ['Annual Reports', 'Prospectuses', 'Souvenirs & Commemorative Books', 'Training Manuals'],
    },
    {
      icon: 'draw',
      title: 'Customized Printing',
      description:
        'Bespoke design and printing solutions uniquely tailored to meet specialized client requirements and creative visions.',
    },
    {
      icon: 'school',
      title: 'Academic Printing',
      items: ['Degrees, certificates, marksheets and transcripts','Rexine and satin folders with premium finishing','Gowns, caps, stoles and sashes for convocations','T-shirts, medals, lapel pins and trophies'],
    },
  ];

  protected readonly machines: Machine[] = [
    {
      image: 'images/optimized/print-offset-machine.webp',
      title: 'Offset Printing Machine',
      usedFor: [
        'Calendars and diaries',
        'Corporate stationery',
        'Notebooks and books',
        'Brochures and catalogues',
        'Commercial and promotional printing',
        'Institutional printing',
      ],
      capabilities: [
        'High-quality multi-colour offset printing',
        'Precise colour reproduction',
        'High-speed sheetfed production',
        'Consistent registration and print quality',
        'Efficient production for medium to large print runs',
      ],
    },
  ];

  private readonly title = inject(Title);

  constructor() {
    this.title.setTitle('Comprehensive Printing Solutions | Royal Traders');
  }
}

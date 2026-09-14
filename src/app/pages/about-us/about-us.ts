import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';
import { CountUpDirective } from '../../shared/count-up.directive';

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface InfrastructureCard {
  icon: string;
  title: string;
  description: string;
}

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about-us',
  imports: [NgOptimizedImage, RouterLink, RevealOnScrollDirective, CountUpDirective],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUs {
  protected readonly logisticsImage = 'images/optimized/about-logistics.webp';

  protected readonly facilityImage = 'images/optimized/about-facility.webp';

  protected readonly machineryImage = 'images/optimized/about-machinery.webp';

  protected readonly stats: Stat[] = [
    { value: 30, suffix: '+', label: 'Years Experience' },
    { value: 500, suffix: '+', label: 'Enterprise Clients' },
    { value: 100, suffix: '%', label: 'Secure Chain' },
  ];

  protected readonly infrastructure: InfrastructureCard[] = [
    {
      icon: 'factory',
      title: '4 Specialized Manufacturing Units',
      description:
        'Our specialized manufacturing units support different stages and requirements across our printing and packaging operations, enabling focused production and efficient utilization of resources.',
    },
    {
      icon: 'warehouse',
      title: '6 Warehousing Facilities',
      description:
        'Our network of 6 warehousing facilities provides dedicated capacity for material and finished-goods storage, supporting organized inventory management and efficient order fulfilment.',
    },
    {
      icon: 'precision_manufacturing',
      title: 'Advanced Global Machinery',
      description:
        'Our operations are supported by advanced machinery sourced from leading global technology providers. Modern equipment across printing, coating, lamination, and pouching enables us to maintain consistent production standards.',
    },
  ];

  protected readonly whyChooseUs: FeatureCard[] = [
    {
      icon: 'shield',
      title: 'Advanced Security',
      description:
        'Proprietary anti-counterfeit technologies that protect your brand equity against sophisticated imitation.',
    },
    {
      icon: 'precision_manufacturing',
      title: 'Institutional Quality',
      description: 'ISO-certified processes and Heidelberg machinery ensure zero-defect output for every production run.',
    },
    {
      icon: 'inventory_2',
      title: 'Comprehensive Packaging',
      description:
        'Custom engineered industrial packaging solutions that balance brand aesthetic with structural durability.',
    },
    {
      icon: 'public',
      title: 'Global Supply',
      description: 'Seamless logistics and international compliance for clients across 4 continents and 20+ countries.',
    },
  ];

  private readonly title = inject(Title);

  constructor() {
    this.title.setTitle('About Us | Royal Traders - 30 Years of Security Printing & Logistics');
  }
}

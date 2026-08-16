import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';
import { LogoMarquee, LogoMarqueeItem } from '../../shared/logo-marquee/logo-marquee';
import { TestimonialCarousel, Testimonial } from '../../shared/testimonial-carousel/testimonial-carousel';

interface ServiceCard {
  icon: string;
  title: string;
  description: string;
  bullets: string[];
  path: string;
}

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, RouterLink, RevealOnScrollDirective, LogoMarquee, TestimonialCarousel],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly heroImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCL6p3ttRNpFyQmvlciiEsOAg_2Eg6UYlgTyj-akwMm-0wQMuwMcQX4NKr8iB88dW-usc5heCJ-qhG6howrHyLp2HxaI5VyV_Zv-ByI9e0qOrRUI1BwzUpIVQhWyeixPUIp3J1V0h_-V9wD7yd0jLoBW4qFSol8FsOT-vpeEkqm_A-QWe4hGySlIxZqj3ZmvHkfos89UQcZputPptG2FNo4ng4wAg3WwMXcSEPMudaDGllezQWyvpGhm5bZw-FB5hhOyg';

  protected readonly clients: LogoMarqueeItem[] = [
    { src: 'images/Bank%20of%20seirra.PNG', alt: 'Bank of Sierra Leone' },
    { src: 'images/C2.PNG', alt: 'C2' },
    { src: 'images/CEDEAO.PNG', alt: 'CEDEAO' },
    { src: 'images/Choitram%20school.PNG', alt: 'Choitram School' },
    { src: 'images/choitrams.PNG', alt: 'Choitrams' },
    { src: 'images/ecobank.PNG', alt: 'Ecobank' },
    { src: 'images/EPI.PNG', alt: 'EPI' },
    { src: 'images/firstcry.PNG', alt: 'FirstCry' },
    { src: 'images/freetown%20city%20councel.PNG', alt: 'Freetown City Council' },
    { src: 'images/Govt%20of%20India.PNG', alt: 'Government of India' },
    { src: 'images/Jolkas.PNG', alt: 'Jolkas' },
    { src: 'images/kissy.PNG', alt: 'Kissy' },
    { src: 'images/minata.PNG', alt: 'Minata' },
    { src: 'images/Ministry%20of%20tourism.PNG', alt: 'Ministry of Tourism' },
    { src: 'images/natco.PNG', alt: 'Natco' },
    { src: 'images/National%20Tourist%20Board.PNG', alt: 'National Tourist Board' },
    { src: 'images/padi.PNG', alt: 'PADI' },
    { src: 'images/PI.PNG', alt: 'PI' },
    { src: 'images/spirit.PNG', alt: 'Spirit' },
    { src: 'images/UBA.PNG', alt: 'UBA' },
    { src: 'images/UFJ.PNG', alt: 'UFJ' },
    { src: 'images/UNICEF.PNG', alt: 'UNICEF' },
    { src: 'images/WHO.PNG', alt: 'WHO' },
  ];

  protected readonly services: ServiceCard[] = [
    {
      icon: 'print',
      title: 'PRINT',
      description:
        'High-precision offset and digital printing for high-volume industrial requirements with micron-level accuracy.',
      bullets: ['OFFSET PRINTING', 'UV COATING', 'SPECIALTY INKS'],
      path: '/print',
    },
    {
      icon: 'inventory_2',
      title: 'PACKAGING',
      description:
        'Custom engineered industrial packaging solutions that balance brand aesthetic with structural durability.',
      bullets: ['CORRUGATED BOXES', 'LUXURY RIGID BOXES', 'LABELS'],
      path: '/packaging',
    },
    {
      icon: 'verified_user',
      title: 'SECURITY SOLUTIONS',
      description:
        'Anti-counterfeit measures and secure tracking systems for certificates, currency-grade documents, and pharma labels.',
      bullets: ['HOLOGRAM INTEGRATION', 'RFID TAGGING', 'EVIDENT PRINTING'],
      path: '/security',
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
      icon: 'public',
      title: 'Global Supply',
      description: 'Seamless logistics and international compliance for clients across 4 continents and 20+ countries.',
    },
    {
      icon: 'history',
      title: '30 Year Heritage',
      description: 'Decades of technical mastery in security printing translated into modern-day industrial efficiency.',
    },
  ];

  protected readonly testimonials: Testimonial[] = [
    {
      quote: 'Excellent print quality and very professional service. We were particularly impressed with the packaging finish and consistency across the entire order.',
      name: 'Rajiv Malhotra',
      title: 'Director, FMCG Manufacturing Company',
    },
    {
      quote:
        'The team understood exactly what we needed for our product packaging. The colours, finishing and overall quality turned out really well.',
      name: 'Neha Arora',
      title: 'Founder, Skincare Brand',
    },
    {
      quote: 'We required reliable printing and security features for our business documents. The execution was smooth, timely and professionally handled.',
      name: 'Amit Bansal',
      title: 'Operations Manager, Pharmaceutical Company',
    },
    {
      quote: 'From artwork preparation to final delivery, everything was handled efficiently. The packaging prints looked premium and matched our brand perfectly.',
      name: 'Karan Mehta',
      title: 'Owner, Food Products Business',
    },
  ];

  private readonly title = inject(Title);

  constructor() {
    this.title.setTitle('Royal Traders | Security Printing & Packaging Excellence');
  }
}

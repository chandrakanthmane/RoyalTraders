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
  protected readonly heroImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCL6p3ttRNpFyQmvlciiEsOAg_2Eg6UYlgTyj-akwMm-0wQMuwMcQX4NKr8iB88dW-usc5heCJ-qhG6howrHyLp2HxaI5VyV_Zv-ByI9e0qOrRUI1BwzUpIVQhWyeixPUIp3J1V0h_-V9wD7yd0jLoBW4qFSol8FsOT-vpeEkqm_A-QWe4hGySlIxZqj3ZmvHkfos89UQcZputPptG2FNo4ng4wAg3WwMXcSEPMudaDGllezQWyvpGhm5bZw-FB5hhOyg';

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
  ];

  protected readonly machines: Machine[] = [
    {
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBOM8Muuk7pgKKTgar3amUDxVr5BuwpOTm5n6QzCRR8xF3JsYtXpGvfBAQHahkoehWfPKshNJILbhSs8pqEw1DAJSldW89T3BPFaoZwsYJ4Ogmrx18za8XfRYoywLvEb_bFu_D-nFkgsZLPZU-CPGoMI3J9XB22pnxziZTtj0ZBQNxcpx6X60Ia49NLpDVT_LrB6EtdiTuz2HVJQE2SjoJRi9lkcjbNMMrr5Fez9XslKgm-YZGQIdLRMCESQkgzvESSmQ',
      title: '10-Colour Flexographic Printing Machine',
      usedFor: [
        'Self-adhesive and pressure-sensitive labels',
        'Flexible packaging materials',
        'Packaging films and wrappers',
        'Product labels for FMCG and consumer goods',
        'Printed rolls and other web-based applications',
      ],
      capabilities: [
        'High-speed roll-to-roll printing',
        'Multi-colour printing',
        'Precise colour registration',
        'Consistent print quality across large production runs',
        'Suitable for a wide range of flexible substrates',
      ],
    },
    {
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBz6Iz5moenDoWggt0DFA_LVo0hFEod1sF6H5aPbHd9Cn_RSIrG3Uye1DyOsolzyg7Zx0PUbRPJFqx8yCBhN3WeVIWTtID2OsIS3XV11an-wON9xCldoSmxdbQwyra46CL4ybIkx554p-QbBREHI7xLf4NIH45HSqaC3mh5yoK2EjLBa9Z1ytdbFXqgHYkh6ACzm9X4wXSmMNQqzZ9N1RHze7fLl69t441nCeIy6Gmt1XQwPUg1SQDu2OK4yXuMHyTnDg',
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

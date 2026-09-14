import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';

interface Offering {
  title: string;
  description: string;
  applications: string;
  image: string;
}

interface Machine {
  image: string;
  title: string;
  usedFor: string[];
  capabilities: string[];
}

@Component({
  selector: 'app-packaging',
  imports: [NgOptimizedImage, RevealOnScrollDirective],
  templateUrl: './packaging.html',
  styleUrl: './packaging.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Packaging {
  protected readonly heroImage = '/packaging_Heroimage.jpeg';

  protected readonly offerings: Offering[] = [
    {
      title: 'Labels',
      description:
        'Printed labels provide an important touchpoint for product identification, branding, and essential information communication. We manufacture high-quality labels suitable for various applications and environmental conditions.',
      applications: 'Product Labels, Brand Labels, Packaging Labels, Information Labels, Customized Labels.',
      image: 'images/optimized/packaging-labels.webp',
    },
    {
      title: 'Corrugated Boxes',
      description:
        'We provide corrugated box solutions for product packaging, transportation, and retail display. Our boxes are engineered to offer an optimal balance of strength, protection, and ease of handling.',
      applications:
        'Product Boxes, Shipping Boxes, Transport Packaging, Retail Packaging, Customized Corrugated Boxes.',
      image: 'images/optimized/packaging-corrugated-boxes.webp',
    },
    {
      title: 'Laminates',
      description:
        'Our laminated packaging materials combine multiple layers of substrates to achieve specific performance requirements, including barrier properties, strength, protection, printability, and functionality.',
      applications: 'Flexible Packaging, Food Packaging, Pouch Manufacturing, Wrapping Applications, Product Protection.',
      image: 'images/optimized/packaging-laminates.webp',
    },
    {
      title: 'Pouches',
      description:
        'We offer flexible pouch packaging solutions in a variety of formats designed for functionality and strong shelf impact. Formats include stand-up, center seal, shaped, and customized.',
      applications:
        'Stand-Up Pouches, Centre Seal Pouches, Three Side Seal Pouches, Gusset Pouches, Spout Pouches, Shaped Pouches, Customized Pouches.',
      image: 'images/optimized/packaging-pouches.webp',
    },
    {
      title: 'Paper Bags',
      description:
        'Paper bags provide a practical packaging solution for retail, food service, and promotional purposes. We offer a range of paper bag formats that can be adapted for customized size, design, and printing.',
      applications: 'Retail Bags, Shopping Bags, Food & Takeaway Bags, Promotional Bags, Customized Paper Bags.',
      image: 'images/optimized/packaging-paper-bags.webp',
    },
  ];

  protected readonly machines: Machine[] = [
    {
      image: 'images/optimized/packaging-rotogravure-machine.webp',
      title: '9-Colour Fully Computerized Rotogravure Machine',
      usedFor: [
        'High-volume flexible packaging',
        'Complex multi-color labels and wrappers',
        'Premium decorative laminates',
      ],
      capabilities: [
        'Fully computerized registration control',
        'High-speed continuous printing',
        'Exceptional color consistency across large runs',
      ],
    },
    {
      image: 'images/optimized/packaging-extrusion-machine.webp',
      title: 'Extrusion Coating & Lamination Machine',
      usedFor: [
        'Multi-layer barrier films',
        'Industrial protective packaging materials',
        'Composite structures for food and pharma',
      ],
      capabilities: [
        'Precise coating thickness control',
        'High-strength bond formation',
        'Versatility across various substrates',
      ],
    },
    {
      image: 'images/optimized/packaging-flexographic-machine.webp',
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
  ];

  private readonly title = inject(Title);

  constructor() {
    this.title.setTitle('Packaging Solutions | Royal Traders');
  }
}

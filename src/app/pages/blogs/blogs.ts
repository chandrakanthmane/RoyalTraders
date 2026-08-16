import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';

interface Article {
  category: string;
  filterCategory: string;
  title: string;
  excerpt: string;
  image: string;
}

const CATEGORIES = ['All Insights', 'Print Engineering', 'Security Protocols', 'Case Studies'] as const;

@Component({
  selector: 'app-blogs',
  imports: [NgOptimizedImage, RevealOnScrollDirective],
  templateUrl: './blogs.html',
  styleUrl: './blogs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blogs {
  protected readonly categories = CATEGORIES;

  protected readonly featuredArticle = {
    category: 'Security Solutions',
    readTime: '12 Min Read',
    title: 'The Future of Security Printing: Protecting Assets in a Digital Age',
    excerpt:
      'Discover the next generation of anti-counterfeit measures, from nanoscopic watermarks to blockchain-integrated tactile substrates that ensure total brand protection.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB_aeuWx-zQUFZOGqgtp_Df44M9oYnmQ5SYMFpXC5cT-GhO16ax_5EIem_4YNp5OhjzWeU5j2yZUv7t52AdCxFBgbKJpHmVZfQrHVA3uJ5QYRJxOnX8KQlUxVVvL0z4eKDjZ7_c0cufcb63EMP8EwSNjN_79JqOKe11Lwr8zjtVniLhgGWSbNCBBxmbw4iT8na0DRSrElbyO6Iw9DMOBFHZ4bbb67E4Zr9SvRhVkMZWKd3HFW91Ihf5',
  };

  protected readonly secondaryFeatured = {
    category: 'Sustainable Packaging',
    title: 'Eco-Industrial: Balancing Strength and Sustainability',
    excerpt:
      "How we've reduced our carbon footprint by 30% through biodegradable technical polymers without compromising industrial durability.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCdHVlU67tkVoVGg-bRqIvSL2yx69nEu_IjjgFmVAp2olf4C7-ozJeX7rCcM_V_VpGdsY2XKRyRrjWOUab47B0w9_fj5RI5d8YfDf8zzkf_lk2rpL-5VuFyhooSbPMnwfgDv5p2YbsCnYthbTK8tPP8jfS7GRIYLFaIilU0ef6ZLVXxDi5rosqlY-OVo3yMbJS-HsvrGcF6ZYF6jieXb8lmLafIuklZhEbZlVdL_R86m63ridvXmYJQy-4LgN0Zb7g2eQ',
  };

  protected readonly articles: Article[] = [
    {
      category: 'Technical Mastery',
      filterCategory: 'Print Engineering',
      title: 'Precision Engineering in Offset Lithography',
      excerpt: 'Exploring the 0.01mm tolerance standards that define our premium commercial output.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD2s3uce8Gd40QnQM_szfS4kqZZqS6yr8LWLUt6tEvDng5-GjtQ_9Lhpb_djUAb_JgA-UsvDD84OJ9sK65CpKAaO4EDVZ3bIeQPpQHgWnxd6692UYIyyxZvCmNHAnzukeBYitljbMjRCY7ze_hW9u8hpqShFODXbtIrfiUKw2v1pT421zoAcHs9mc29kTVuS09p_p0LD8VHJaGocjgBYXwvAIxIFF6u7-4UhkyC22Yvk7COl_L12MfkzWvdchiTzc4-3w',
    },
    {
      category: 'Packaging Trends',
      filterCategory: 'Case Studies',
      title: 'The Psychology of Haptic Feedback in Luxury',
      excerpt: 'Why texture and weight are the most powerful non-verbal communicators of brand quality.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuACV4q76ZP4kFQ9JldkcR6R3FTulLLcgRZP8Z04ea8fTkmliYFNUtmS1PoOrVY34SPoinKPXVbFGJrAYxoOhgOLjZfy-Jic2S45d3FAqYBPNjL4K5g0cKGid84fRkyTtPprs-RX_uMNarmJXkmEQ7mUdjTfOlMUBBew83eDBTSEIJwv-Lg_ICQxevHUY9k0bgo9SChx8MzeP4Rn8ZpKxDFMeKYufMMxOi4pjeyOAoe3G3cvXA75ql9sfKUiQ75rYveOBQ',
    },
    {
      category: 'Industry Standards',
      filterCategory: 'Security Protocols',
      title: 'ISO 14298: Beyond Compliance in Security',
      excerpt: 'How we maintain world-class standards in governmental and financial document production.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDKUaCi0YSLcUmZx--mztvZW1fE5u5QErmHZRI7GAXzSENFqTDnmfML0dx-FCFpAhotTJTiYwYmRjKJIlaNagDreQZ2fm8Rr01J0HwQNAdvurfCIG5uGGhTnCX28N9GEZgMpjAaIVrL2DIHtVSo4AIKY6IFjoaFmDSMamnzaXuXdGptu2TaJmKSHLaN04sUtvKDDzy-b5iGXcYXjRbJnKI0HSOzPohx-q8UShy8R41TzxIAB58rlvtDJHRUW0RIbzZkcQ',
    },
  ];

  protected readonly activeCategory = signal<(typeof CATEGORIES)[number]>('All Insights');
  protected readonly searchTerm = signal('');

  protected readonly filteredArticles = computed(() => {
    const category = this.activeCategory();
    const term = this.searchTerm().trim().toLowerCase();

    return this.articles.filter((article) => {
      const matchesCategory = category === 'All Insights' || article.filterCategory === category;
      const matchesSearch = term === '' || article.title.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  });

  private readonly title = inject(Title);

  constructor() {
    this.title.setTitle('Blogs | Royal Traders - Security Printing & Packaging Excellence');
  }

  protected setCategory(category: (typeof CATEGORIES)[number]): void {
    this.activeCategory.set(category);
  }

  protected onSearchInput(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }
}

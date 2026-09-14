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
    image: 'images/optimized/security-hologram.webp',
  };

  protected readonly secondaryFeatured = {
    category: 'Sustainable Packaging',
    title: 'Eco-Industrial: Balancing Strength and Sustainability',
    excerpt:
      "How we've reduced our carbon footprint by 30% through biodegradable technical polymers without compromising industrial durability.",
    image: 'images/optimized/blog-sustainable-packaging.webp',
  };

  protected readonly articles: Article[] = [
    {
      category: 'Technical Mastery',
      filterCategory: 'Print Engineering',
      title: 'Precision Engineering in Offset Lithography',
      excerpt: 'Exploring the 0.01mm tolerance standards that define our premium commercial output.',
      image: 'images/optimized/blog-offset-lithography.webp',
    },
    {
      category: 'Packaging Trends',
      filterCategory: 'Case Studies',
      title: 'The Psychology of Haptic Feedback in Luxury',
      excerpt: 'Why texture and weight are the most powerful non-verbal communicators of brand quality.',
      image: 'images/optimized/blog-haptic-feedback.webp',
    },
    {
      category: 'Industry Standards',
      filterCategory: 'Security Protocols',
      title: 'ISO 14298: Beyond Compliance in Security',
      excerpt: 'How we maintain world-class standards in governmental and financial document production.',
      image: 'images/optimized/security-id-card.webp',
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

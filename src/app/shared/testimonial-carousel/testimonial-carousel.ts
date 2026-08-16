import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
}

const AUTOPLAY_INTERVAL_MS = 5000;
const SWIPE_THRESHOLD_PX = 40;

@Component({
  selector: 'app-testimonial-carousel',
  templateUrl: './testimonial-carousel.html',
  styleUrl: './testimonial-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialCarousel {
  readonly testimonials = input.required<Testimonial[]>();

  protected readonly currentIndex = signal(0);

  private readonly destroyRef = inject(DestroyRef);
  private touchStartX = 0;
  private autoplayTimer?: ReturnType<typeof setInterval>;

  constructor() {
    afterNextRender(() => {
      this.startAutoplay();
      this.destroyRef.onDestroy(() => this.stopAutoplay());
    });
  }

  protected goTo(index: number): void {
    this.currentIndex.set(index);
    this.restartAutoplay();
  }

  protected onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  protected onTouchEnd(event: TouchEvent): void {
    const deltaX = event.changedTouches[0].clientX - this.touchStartX;
    const count = this.testimonials().length;

    if (deltaX < -SWIPE_THRESHOLD_PX) {
      this.goTo((this.currentIndex() + 1) % count);
    } else if (deltaX > SWIPE_THRESHOLD_PX) {
      this.goTo((this.currentIndex() - 1 + count) % count);
    }
  }

  private startAutoplay(): void {
    this.autoplayTimer = setInterval(() => {
      const count = this.testimonials().length;
      this.currentIndex.update((index) => (index + 1) % count);
    }, AUTOPLAY_INTERVAL_MS);
  }

  private stopAutoplay(): void {
    clearInterval(this.autoplayTimer);
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }
}

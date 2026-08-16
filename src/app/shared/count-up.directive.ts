import { afterNextRender, Directive, ElementRef, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCountUp]',
})
export class CountUpDirective {
  readonly appCountUp = input.required<number>();
  readonly duration = input(1500);

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  constructor() {
    afterNextRender(() => {
      const element = this.elementRef.nativeElement;
      const target = this.appCountUp();
      const prefersReducedMotion =
        typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
        this.renderer.setProperty(element, 'textContent', String(target));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.animate(element, target);
              observer.unobserve(element);
            }
          }
        },
        { threshold: 0.5 },
      );

      observer.observe(element);
    });
  }

  private animate(element: HTMLElement, target: number): void {
    const start = performance.now();
    const duration = this.duration();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      this.renderer.setProperty(element, 'textContent', String(Math.floor(progress * target)));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        this.renderer.setProperty(element, 'textContent', String(target));
      }
    };

    requestAnimationFrame(step);
  }
}

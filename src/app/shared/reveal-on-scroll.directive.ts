import { afterNextRender, Directive, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRevealOnScroll]',
})
export class RevealOnScrollDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  constructor() {
    afterNextRender(() => {
      const element = this.elementRef.nativeElement;

      if (typeof IntersectionObserver === 'undefined') {
        this.renderer.addClass(element, 'visible');
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.renderer.addClass(element, 'visible');
              observer.unobserve(element);
            }
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
      );

      observer.observe(element);
    });
  }
}

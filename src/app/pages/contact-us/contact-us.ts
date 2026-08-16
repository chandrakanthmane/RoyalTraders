import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

@Component({
  selector: 'app-contact-us',
  imports: [NgOptimizedImage, ReactiveFormsModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUs {
  private readonly formBuilder = inject(FormBuilder);
  private readonly title = inject(Title);

  protected readonly mapImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA1VmdFZP8Uz4BPnklez9U82ZxfpwAiQKj4474bdyctka6-K3Ejc2-hlb1PbV6dfLVfIgWRHDOdH4H1LwEiuQS39XHLiUdfAQQeQNxg9uQJDEVJCNVOc6Ld0ICHXWP2lod7o9spxgv7MsXB8uGdsiLNcLhog3kWjxRpKPBu_AKFG2mJSr3CSqFXo7Yy3Gu2bJ-xYwQ-kt87mYj9WW_w4bA-6RMAJbivGB7ZqDSOc06iaOqdsdbazlBM';

  protected readonly socialLinks: SocialLink[] = [
    { icon: 'camera_alt', label: 'Instagram', href: '#' },
    { icon: 'thumb_up', label: 'Facebook', href: '#' },
    { icon: 'work', label: 'LinkedIn', href: '#' },
    { icon: 'chat', label: 'Twitter', href: '#' },
  ];

  protected readonly submitState = signal<SubmitState>('idle');

  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+()\-\s]{7,15}$/)]],
    email: ['', [Validators.required, Validators.email]],
    message: [''],
  });

  constructor() {
    this.title.setTitle('Contact Us | Royal Traders');
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitState.set('submitting');

    setTimeout(() => {
      this.submitState.set('success');
      this.form.reset();
    }, 800);
  }
}

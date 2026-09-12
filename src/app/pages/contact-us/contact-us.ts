import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function phoneNumberValidator(control: AbstractControl<string>): ValidationErrors | null {
  const value = control.value?.trim();
  if (!value) {
    return null;
  }

  const digitsOnly = value.replace(/[\s()+-]/g, '');
  return /^\d{10,15}$/.test(digitsOnly) ? null : { phoneFormat: true };
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

type SocialPlatform = 'instagram' | 'pinterest' | 'linkedin' | 'facebook';

interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

@Component({
  selector: 'app-contact-us',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUs {
  private readonly formBuilder = inject(FormBuilder);
  private readonly title = inject(Title);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly http = inject(HttpClient);

  private readonly address = 'S-7, Rampuri, Ghaziabad, Uttar Pradesh-201011, INDIA';
  private readonly mapQuery = 'Ghaziabad, Uttar Pradesh, India';

  protected readonly mapEmbedUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    `https://www.google.com/maps?q=${encodeURIComponent(this.mapQuery)}&output=embed`,
  );

  protected readonly mapDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.address)}`;

  protected readonly socialLinks: SocialLink[] = [
    { platform: 'instagram', label: 'Instagram', href: '#' },
    { platform: 'pinterest', label: 'Pinterest', href: '#' },
    { platform: 'linkedin', label: 'LinkedIn', href: '#' },
    { platform: 'facebook', label: 'Facebook', href: '#' },
  ];

  protected readonly submitState = signal<SubmitState>('idle');
  protected readonly showSuccessModal = signal(false);
  protected readonly errorMessage = signal('');

  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, phoneNumberValidator]],
    email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    message: [''],
  });

  constructor() {
    this.title.setTitle('Contact Us | Royal Traders');
  }

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitState.set('submitting');
    this.errorMessage.set('');

    try {
      await firstValueFrom(this.http.post<{ ok: boolean }>('/api/contact', this.form.getRawValue()));
      this.submitState.set('success');
      this.showSuccessModal.set(true);
      this.form.reset();
    } catch (error) {
      this.submitState.set('error');
      const fallback = 'Something went wrong. Please try again or reach us by phone or email.';
      this.errorMessage.set(error instanceof HttpErrorResponse ? error.error?.error ?? fallback : fallback);
    }
  }

  protected closeSuccessModal(): void {
    this.showSuccessModal.set(false);
    this.submitState.set('idle');
  }
}

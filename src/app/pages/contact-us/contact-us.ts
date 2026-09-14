import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CountryCodeSelect } from '../../shared/country-code-select/country-code-select';

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export interface CountryCode {
  iso: string;
  name: string;
  dialCode: string;
  minLength: number;
  maxLength: number;
}

const COUNTRY_CODES: CountryCode[] = [
  { iso: 'IN', name: 'India', dialCode: '+91', minLength: 10, maxLength: 10 },
  { iso: 'US', name: 'United States', dialCode: '+1', minLength: 10, maxLength: 10 },
  { iso: 'CA', name: 'Canada', dialCode: '+1', minLength: 10, maxLength: 10 },
  { iso: 'GB', name: 'United Kingdom', dialCode: '+44', minLength: 10, maxLength: 10 },
  { iso: 'AU', name: 'Australia', dialCode: '+61', minLength: 9, maxLength: 9 },
  { iso: 'NZ', name: 'New Zealand', dialCode: '+64', minLength: 8, maxLength: 9 },
  { iso: 'AE', name: 'United Arab Emirates', dialCode: '+971', minLength: 9, maxLength: 9 },
  { iso: 'SA', name: 'Saudi Arabia', dialCode: '+966', minLength: 9, maxLength: 9 },
  { iso: 'QA', name: 'Qatar', dialCode: '+974', minLength: 8, maxLength: 8 },
  { iso: 'OM', name: 'Oman', dialCode: '+968', minLength: 8, maxLength: 8 },
  { iso: 'KW', name: 'Kuwait', dialCode: '+965', minLength: 8, maxLength: 8 },
  { iso: 'BH', name: 'Bahrain', dialCode: '+973', minLength: 8, maxLength: 8 },
  { iso: 'SL', name: 'Sierra Leone', dialCode: '+232', minLength: 8, maxLength: 8 },
  { iso: 'GH', name: 'Ghana', dialCode: '+233', minLength: 9, maxLength: 9 },
  { iso: 'NG', name: 'Nigeria', dialCode: '+234', minLength: 10, maxLength: 10 },
  { iso: 'KE', name: 'Kenya', dialCode: '+254', minLength: 9, maxLength: 9 },
  { iso: 'TZ', name: 'Tanzania', dialCode: '+255', minLength: 9, maxLength: 9 },
  { iso: 'UG', name: 'Uganda', dialCode: '+256', minLength: 9, maxLength: 9 },
  { iso: 'ZA', name: 'South Africa', dialCode: '+27', minLength: 9, maxLength: 9 },
  { iso: 'ZW', name: 'Zimbabwe', dialCode: '+263', minLength: 9, maxLength: 9 },
  { iso: 'EG', name: 'Egypt', dialCode: '+20', minLength: 10, maxLength: 10 },
  { iso: 'DE', name: 'Germany', dialCode: '+49', minLength: 10, maxLength: 11 },
  { iso: 'FR', name: 'France', dialCode: '+33', minLength: 9, maxLength: 9 },
  { iso: 'ES', name: 'Spain', dialCode: '+34', minLength: 9, maxLength: 9 },
  { iso: 'IT', name: 'Italy', dialCode: '+39', minLength: 9, maxLength: 10 },
  { iso: 'NL', name: 'Netherlands', dialCode: '+31', minLength: 9, maxLength: 9 },
  { iso: 'CN', name: 'China', dialCode: '+86', minLength: 11, maxLength: 11 },
  { iso: 'JP', name: 'Japan', dialCode: '+81', minLength: 10, maxLength: 10 },
  { iso: 'SG', name: 'Singapore', dialCode: '+65', minLength: 8, maxLength: 8 },
  { iso: 'MY', name: 'Malaysia', dialCode: '+60', minLength: 9, maxLength: 10 },
  { iso: 'ID', name: 'Indonesia', dialCode: '+62', minLength: 9, maxLength: 12 },
  { iso: 'PH', name: 'Philippines', dialCode: '+63', minLength: 10, maxLength: 10 },
  { iso: 'TH', name: 'Thailand', dialCode: '+66', minLength: 9, maxLength: 9 },
  { iso: 'VN', name: 'Vietnam', dialCode: '+84', minLength: 9, maxLength: 10 },
  { iso: 'PK', name: 'Pakistan', dialCode: '+92', minLength: 10, maxLength: 10 },
  { iso: 'BD', name: 'Bangladesh', dialCode: '+880', minLength: 10, maxLength: 10 },
  { iso: 'LK', name: 'Sri Lanka', dialCode: '+94', minLength: 9, maxLength: 9 },
  { iso: 'NP', name: 'Nepal', dialCode: '+977', minLength: 10, maxLength: 10 },
  { iso: 'BR', name: 'Brazil', dialCode: '+55', minLength: 10, maxLength: 11 },
  { iso: 'MX', name: 'Mexico', dialCode: '+52', minLength: 10, maxLength: 10 },
];

const DEFAULT_COUNTRY_ISO = 'IN';

function findCountry(iso: string | null | undefined): CountryCode {
  return COUNTRY_CODES.find((country) => country.iso === iso) ?? COUNTRY_CODES[0];
}

function phoneNumberValidator(control: AbstractControl<string>): ValidationErrors | null {
  const value = control.value?.trim();
  if (!value) {
    return null;
  }

  const country = findCountry(control.parent?.get('countryCode')?.value as string | undefined);
  const digitsOnly = value.replace(/\D/g, '');

  if (digitsOnly.length < country.minLength || digitsOnly.length > country.maxLength) {
    return { phoneLength: { country: country.name, minLength: country.minLength, maxLength: country.maxLength } };
  }

  return null;
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
  imports: [ReactiveFormsModule, CountryCodeSelect],
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

  protected readonly countryCodes = COUNTRY_CODES;

  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    countryCode: [DEFAULT_COUNTRY_ISO, Validators.required],
    phone: ['', [Validators.required, phoneNumberValidator]],
    email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    message: [''],
  });

  protected readonly selectedCountry = computed(() => findCountry(this.countryCodeValue()));

  protected readonly phoneErrorMessage = computed(() => {
    const country = this.selectedCountry();
    return country.minLength === country.maxLength
      ? `Please enter a valid ${country.minLength}-digit phone number for ${country.name}.`
      : `Please enter a valid phone number for ${country.name} (${country.minLength}-${country.maxLength} digits).`;
  });

  private readonly countryCodeValue = signal(DEFAULT_COUNTRY_ISO);

  constructor() {
    this.title.setTitle('Contact Us | Royal Traders');

    this.form.controls.countryCode.valueChanges.pipe(takeUntilDestroyed()).subscribe((iso) => {
      this.countryCodeValue.set(iso);
      this.form.controls.phone.updateValueAndValidity();
    });
  }

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitState.set('submitting');
    this.errorMessage.set('');

    try {
      const { name, countryCode, phone, email, message } = this.form.getRawValue();
      const dialCode = findCountry(countryCode).dialCode;
      const payload = { name, phone: `${dialCode}${phone.replace(/\D/g, '')}`, email, message };
      await firstValueFrom(this.http.post<{ ok: boolean }>('/api/contact', payload));
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

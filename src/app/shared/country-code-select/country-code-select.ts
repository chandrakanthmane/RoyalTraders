import { ChangeDetectionStrategy, Component, ElementRef, computed, forwardRef, inject, input, signal, viewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface CountryCodeOption {
  iso: string;
  name: string;
  dialCode: string;
}

@Component({
  selector: 'app-country-code-select',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'relative inline-block',
    '(document:click)': 'onDocumentClick($event)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountryCodeSelect),
      multi: true,
    },
  ],
  template: `
    <button
      #triggerButton
      type="button"
      class="h-full w-full min-w-[4.5rem] border border-on-surface bg-surface-container-lowest p-sm focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent font-body-md flex items-center justify-between gap-1 disabled:opacity-60 disabled:cursor-not-allowed"
      [attr.aria-haspopup]="'listbox'"
      [attr.aria-expanded]="open()"
      [attr.aria-label]="'Country code, ' + selected().dialCode + ' ' + selected().name + ' selected'"
      [disabled]="disabled()"
      (click)="toggle()"
      (keydown)="onButtonKeydown($event)"
    >
      <span>{{ selected().dialCode }}</span>
      <span class="material-symbols-outlined text-[18px]" aria-hidden="true">expand_more</span>
    </button>

    @if (open()) {
      <ul
        #listboxEl
        class="absolute z-20 mt-1 max-h-60 w-56 overflow-auto border border-on-surface bg-surface-container-lowest shadow-lg focus:outline-none"
        role="listbox"
        aria-label="Country code"
        [attr.aria-activedescendant]="'country-option-' + activeIndex()"
        tabindex="-1"
        (keydown)="onListKeydown($event)"
      >
        @for (country of countries(); track country.iso; let i = $index) {
          <li
            [id]="'country-option-' + i"
            role="option"
            [attr.aria-selected]="country.iso === value()"
            class="px-sm py-xs cursor-pointer font-body-md"
            [class.bg-primary-container]="i === activeIndex()"
            [class.text-on-primary]="i === activeIndex()"
            (click)="selectIndex(i)"
            (mouseenter)="activeIndex.set(i)"
          >
            {{ country.dialCode }} {{ country.name }}
          </li>
        }
      </ul>
    }
  `,
})
export class CountryCodeSelect implements ControlValueAccessor {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly countries = input.required<CountryCodeOption[]>();

  protected readonly open = signal(false);
  protected readonly value = signal('');
  protected readonly activeIndex = signal(0);
  protected readonly disabled = signal(false);

  protected readonly triggerButton = viewChild<ElementRef<HTMLButtonElement>>('triggerButton');
  protected readonly listboxEl = viewChild<ElementRef<HTMLUListElement>>('listboxEl');

  protected readonly selected = computed(
    () => this.countries().find((country) => country.iso === this.value()) ?? this.countries()[0],
  );

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  private typeaheadBuffer = '';
  private typeaheadTimeout?: ReturnType<typeof setTimeout>;

  writeValue(value: string): void {
    this.value.set(value ?? '');
    const index = this.countries().findIndex((country) => country.iso === value);
    this.activeIndex.set(index >= 0 ? index : 0);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected toggle(): void {
    if (this.disabled()) {
      return;
    }
    this.open.update((isOpen) => !isOpen);
    if (this.open()) {
      setTimeout(() => this.listboxEl()?.nativeElement.focus());
    }
  }

  protected close(focusButton = true): void {
    this.open.set(false);
    this.onTouched();
    if (focusButton) {
      this.triggerButton()?.nativeElement.focus();
    }
  }

  protected selectIndex(index: number): void {
    const country = this.countries()[index];
    if (!country) {
      return;
    }
    this.value.set(country.iso);
    this.activeIndex.set(index);
    this.onChange(country.iso);
    this.close();
  }

  protected onButtonKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!this.open()) {
        this.toggle();
      }
    }
  }

  protected onListKeydown(event: KeyboardEvent): void {
    const count = this.countries().length;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeIndex.update((i) => (i + 1) % count);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex.update((i) => (i - 1 + count) % count);
        break;
      case 'Home':
        event.preventDefault();
        this.activeIndex.set(0);
        break;
      case 'End':
        event.preventDefault();
        this.activeIndex.set(count - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectIndex(this.activeIndex());
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'Tab':
        this.close(false);
        break;
      default:
        if (event.key.length === 1) {
          this.typeahead(event.key);
        }
    }
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (this.open() && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.close(false);
    }
  }

  private typeahead(char: string): void {
    this.typeaheadBuffer += char.toLowerCase();
    clearTimeout(this.typeaheadTimeout);
    this.typeaheadTimeout = setTimeout(() => (this.typeaheadBuffer = ''), 500);

    const countries = this.countries();
    const startIndex = (this.activeIndex() + 1) % countries.length;
    const ordered = [...countries.slice(startIndex), ...countries.slice(0, startIndex)];
    const matchOffset = ordered.findIndex((country) => country.name.toLowerCase().startsWith(this.typeaheadBuffer));

    if (matchOffset >= 0) {
      this.activeIndex.set((startIndex + matchOffset) % countries.length);
    }
  }
}

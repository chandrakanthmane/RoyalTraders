import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-brand-mark',
  templateUrl: './brand-mark.html',
  styleUrl: './brand-mark.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'img',
    '[attr.aria-label]': '"Royal Traders"',
    '[class.brand-mark--inverse]': 'inverse()',
  },
})
export class BrandMark {
  readonly inverse = input(false);
}

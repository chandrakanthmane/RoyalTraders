import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';
import { CountUpDirective } from '../../shared/count-up.directive';

interface ValueProp {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-security-solutions',
  imports: [NgOptimizedImage, RevealOnScrollDirective, CountUpDirective],
  templateUrl: './security-solutions.html',
  styleUrl: './security-solutions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecuritySolutions {
  protected readonly heroImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAR3NBiInAIkL-dV_EptyxS0msHFuz0Ux7fLF6sIb6_7V364myDNvykCodMk3H-9mnQ_uQ9jl3bIdPjX3mF3CfHT74fy_3xdqgBGF1Ro6LyjcE6hnddTZVw6LyHHybeJL1q5XX0h3F6vXRZHQ6L8-CqyRZUqUp_lyekfnYA4pOUO7GGvqz2OSgpxW5FlaoeqoDfANV5UyXlY5rynADp390lSmAfJuK_fOlOtQsn37u_lF4zy3oxhVJCfRKnA5_DdmXh0Q';

  protected readonly certificateImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAYni2rf9zKOMfZ2FC-OrOxdobkzKGqleryHJf7G8iteKLgy-soby-QW_CRqk_rCc09fuI1IVn7Jj0l5bpbU-3gaB9vSAQ_GvEXiDJ3Kjl1B2d9dg61bsY75LC2w8WdITp2rhFCvsPlKnrjBhGPLHKEVM28ur0MkzgulM2LNupiJZI2eCpPCbvnUkEpe3ck2o3RACcauMbaFKleFaiU79sLYKFFAIDOdVsVMiIeXLdZsm-8DS0GO_jflmZgUbXp9UxvSQ';
  protected readonly hologramImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB_aeuWx-zQUFZOGqgtp_Df44M9oYnmQ5SYMFpXC5cT-GhO16ax_5EIem_4YNp5OhjzWeU5j2yZUv7t52AdCxFBgbKJpHmVZfQrHVA3uJ5QYRJxOnX8KQlUxVVvL0z4eKDjZ7_c0cufcb63EMP8EwSNjN_79JqOKe11Lwr8zjtVniLhgGWSbNCBBxmbw4iT8na0DRSrElbyO6Iw9DMOBFHZ4bbb67E4Zr9SvRhVkMZWKd3HFW91Ihf5';
  protected readonly idCardImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDKUaCi0YSLcUmZx--mztvZW1fE5u5QErmHZRI7GAXzSENFqTDnmfML0dx-FCFpAhotTJTiYwYmRjKJIlaNagDreQZ2fm8Rr01J0HwQNAdvurfCIG5uGGhTnCX28N9GEZgMpjAaIVrL2DIHtVSo4AIKY6IFjoaFmDSMamnzaXuXdGptu2TaJmKSHLaN04sUtvKDDzy-b5iGXcYXjRbJnKI0HSOzPohx-q8UShy8R41TzxIAB58rlvtDJHRUW0RIbzZkcQ';
  protected readonly chequesImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCNFGcoXUFPl1yPKO_AjDYFHqXHcsXOS3me87ThHGX225C1aKtLgAAMsdK11Nih9DjFGFSgzP1rP2vYPhVJHPGndVgbb17meAPxBeVIRpBUE-cWtGscQXaYU6ooSeMM5A7_z-gu_yNTyrppxkdZJiz4AyjhGMChEiRWe8p1Cg-rkDPP7Xj7bggoKSHwlOM3L9FAAQUC5-q-0F1FbL_XV8fZgD1N2WWFxWmhHOb6KBhkp86gZdCogp1tHAlVR1OpiEHj8Q';
  protected readonly letterheadImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC0XIO_JEpnN0BW3ancfrT-6-99CAPL7WPMNXllCs0ZI6fL4pZn9b63ZZoAXXixxwBpDdQ67crmQ2pK-xbblAK-yoFlaQWFM1C-ms4OOaS9SiQ3sPf97oTXBB42rnAznuWH5mqKzUn20NKR8B3Cr6tee6NgmdRJBJd2-giRmnZD32Dsfu0TzCqK7vmyJ4DUMY1R83p7qAZ0OQbG-Juo3s1EPLKqikhtYJugCEMhrpPtU6K_tYFkdC8LW66BrsYGHKG-3A';
  protected readonly stickerImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBZOjKkOxEf5LDqG2XT2Y54Tiraet1ognj7GcBLa3sHHDxttIN8RdT0dNONimi2fKz8rBi8Rgvqo6wGLhdcJ4Dt1w-VpcPyLG4H9-gryOyfMm2wVjk_LM0Dq8WJnPtx68EWVH-WORKqGH6MqcS3EFYRLoEAu1Rh1hsGGcqv70sxqhTs6F3WCZmpvLF1YagG5Qdv_EaUXF07LYBFLvGmy_DGA-3lWhd8bapIfGE-aL9GYOukIgsvlsDn1G0p3YIFjc6MlA';

  protected readonly valueProps: ValueProp[] = [
    {
      icon: 'verified_user',
      title: 'Authenticated',
      description: 'Multi-layered verification methods ensuring zero compromise on authenticity.',
    },
    {
      icon: 'lock',
      title: 'Confidential',
      description: 'Secure production facilities with 24/7 surveillance and strict access controls.',
    },
    {
      icon: 'precision_manufacturing',
      title: 'Industrial',
      description: 'Advanced German machinery delivering mechanical precision at scale.',
    },
  ];

  private readonly title = inject(Title);

  constructor() {
    this.title.setTitle('Security Solutions | Royal Traders');
  }
}

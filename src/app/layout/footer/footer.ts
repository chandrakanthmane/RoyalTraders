import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BrandMark } from '../../shared/brand-mark/brand-mark';

interface Certificate {
  alt: string;
  src: string;
}

interface QuickLink {
  label: string;
}

@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage, RouterLink, BrandMark],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly currentYear = new Date().getFullYear();

  protected readonly quickLinks: QuickLink[] = [
    { label: 'Privacy Policy' },
    { label: 'Terms of Service' },
    { label: 'Security Standards' },
    { label: 'Global Presence' },
  ];

  protected readonly certificates: Certificate[] = [
    {
      alt: 'RCS Certification',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcTf9XZiSFwwUcaX8NzFza2IwDLHkDThIX0Z6Gwu6kywu-l41yAHha_UBkyg5wO6tEIN_OF8OGoX_xZRfa4DIiYwfA2aXad0O5HNG-H1ov140RLOvuX4Qmgz0hFU9Iff1Ok3-oB0iGd0IIZjYweHfro4Z4uA3Rx8DIdSO5bydncKOWtxRerz3nlyEUvW9BtGFfAohgJeR_uL-QM9AVt9B6LtAwtvNeTUZ0Q67roOTmINCkfRHVsb7vnlifdB2Yvl16-A',
    },
    {
      alt: 'QRO Certification',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2T9vRa3DB6DtQkRcvJS9PL5N53QDwuNKFy4uzg-gaefrMdHuOKaKlhY4jpA3CH1VcCUVwv4XNk25BP9YeLEiIZBdWzdXDFdJtcW4WM81ImluijKtEQo6VSwtc_jLXZR0xV9pI7VTPPGpSqjaDtCZGHc2tmrCVwNrHWnpfyYTsUuJ70SzWFvsskkkfPwHp09Ib4iDnUeZWMl4Pb09RdK1v8r6ZSHeUQ_CisejMiikaQxpoGECEYR2faUZ5b4_c68icjw',
    },
    {
      alt: 'Royal Assessment Certification',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxF9xy2lLib7zJ2iF2-1UJG0Xmq2dPNXOlDarvRrLK1ZDAQS8DUkbb6cpBsYK5SijlQCHe3Uh3-ymwcoGXO9zqa7q6Vm5HlaRWzCz9S1DGeh3xT1GYsX7d55TTpCQvKkQASSSAYL_Z9O5skCWB7nZ3mgzZGvuo7TsHG_ReaZWjKXRnzMhOHwpXbgl4neuUMoelgCbwYA0Dag3XY0ygJzKk3KatI2gvt_YlGYTTjepGdvb3ylL6RyuaI6xgR2nHBzvcfA',
    },
    {
      alt: 'Make in India',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyqJ_iAAqHgAWxJxxY4oUm5zJF83K4QQiRx4FCz23miv57Q4r4TI7A6qLww-78hKaS8WboU50ln3_ryFZjyphySRtdxZoGBga_--ZB3vkT24O8Je3DnYShtiHjcZfKpk3kkPqrSOwYhdYV2YrB0TaVEkqzvXChvBoZL1JmD5AHS5EHVwgqbpZb45TE9mimDdwZoduBzO0xxcmk686Yt6tfjTgusEk1HsCPBUwTwp_DwnavV4y56N7b_mn0Rgbh238nWQ',
    },
    {
      alt: 'Startup India',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMms0V1kFDMc-oiIUzQdY50kcWsowGMClQzj7X1jkvCez4hewT3wivG-8H_29fdO5cmyIgG-2LE2QWtpTX_S2Lw4Q4CDFnthvK8TASEV9BjQH98qRCWe0OpUYO9fVzO_RnFmsfxDnoBXVgLM3ILODzQgVB3dX0hpvUNfjMxw0ZD763qLOWT-0gHsBHApx3HOtTIgsirMHC8OSuuL6KPLACg3PC1eSWKYih9gJkxM1KgM5aWwLufTRRu8rkehgqjh9HNw',
    },
    {
      alt: 'MSME Registration',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4gqWuobjgudupL6gx8-lGJl_XfjFyvL8TV3j4s6HBBdm1QkXurfD_41JnPCyY7rVXojhMqWr3xPja6r3bmr2j5sx1k59lJRIn1tfqhY4Cqr4yqYn3velK9M-yfYw6PRdfhTlZievXl0fBUWe85oh67tG2C1WirAAqRvTj5vk6RUpMldeb9bP7qAj3E5PKngIsj_sOS4sxJofbKNtIL9ueWZ02va9CXf8SMDt0yFy-Dul65skEJlxdsrun-pX368rq8w',
    },
  ];
}

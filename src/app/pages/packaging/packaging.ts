import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';

interface Offering {
  title: string;
  description: string;
  applications: string;
  image: string;
}

interface Machine {
  image: string;
  title: string;
  usedFor: string[];
  capabilities: string[];
}

@Component({
  selector: 'app-packaging',
  imports: [NgOptimizedImage, RevealOnScrollDirective],
  templateUrl: './packaging.html',
  styleUrl: './packaging.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Packaging {
  protected readonly heroImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAt1O2nEBUyR6fxWtCmKbGeC1RmZBCCp4PPS7jKthaFR3sC9ElFJ809mlLFraAHoh9puP_1gUAPMpI6jWWMJe8ux0e40z2N-DnINAjIYvjDmRgSd2PwjyZwuejcUNEk456V0XzwrwyolVCCGky8tS582SF20N5JLdma5hB0lQHLgkhPU_boMMX24cvMkT2c2gM2ILNovDzxouopMhfkuw2psmmPFNbIbaUpJGCKThfj_SRuMhwgOE3oFmXk5RiCAPH_Fw';

  protected readonly offerings: Offering[] = [
    {
      title: 'Labels',
      description:
        'Printed labels provide an important touchpoint for product identification, branding, and essential information communication. We manufacture high-quality labels suitable for various applications and environmental conditions.',
      applications: 'Product Labels, Brand Labels, Packaging Labels, Information Labels, Customized Labels.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDbQjMnvOk6PWWlm2AnXDoaX-lZSOA3dXI4uReiCM0nFzxzUS6MSowv8RUU1CorBpHbwW6nZibK63f3hdfrCLh7CmNvJMMQJ6YZ9KlCcGSW1ZtOPcOenrBAPLUp6x-gvCzPA0qr4ObsFw88GYmHRDYaeCZ00nslLcj_dvejhQy2GozHZ3jRFJM6aiLqXWNKoUaxCFYZc1nKx8qyLq5f4SGCCwuj2RdVXE94XoK2GwITm-dGldOWv3cxp91I06eymNVJIQ',
    },
    {
      title: 'Corrugated Boxes',
      description:
        'We provide corrugated box solutions for product packaging, transportation, and retail display. Our boxes are engineered to offer an optimal balance of strength, protection, and ease of handling.',
      applications:
        'Product Boxes, Shipping Boxes, Transport Packaging, Retail Packaging, Customized Corrugated Boxes.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAt1O2nEBUyR6fxWtCmKbGeC1RmZBCCp4PPS7jKthaFR3sC9ElFJ809mlLFraAHoh9puP_1gUAPMpI6jWWMJe8ux0e40z2N-DnINAjIYvjDmRgSd2PwjyZwuejcUNEk456V0XzwrwyolVCCGky8tS582SF20N5JLdma5hB0lQHLgkhPU_boMMX24cvMkT2c2gM2ILNovDzxouopMhfkuw2psmmPFNbIbaUpJGCKThfj_SRuMhwgOE3oFmXk5RiCAPH_Fw',
    },
    {
      title: 'Laminates',
      description:
        'Our laminated packaging materials combine multiple layers of substrates to achieve specific performance requirements, including barrier properties, strength, protection, printability, and functionality.',
      applications: 'Flexible Packaging, Food Packaging, Pouch Manufacturing, Wrapping Applications, Product Protection.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBcN0gxyfO9ULi1QT9sJEGIA0boO9rFwBsMavD4t2pAEh1qHBL5FHFcF8pvr9iplHOhH2caYzbbjZg-63o61kEOvULR_2Rse3yJf7RYIOwrpa7ZVadTeCNVIKhUY06Glmwz0XtX7yyGUPKe83_kSp85vsWtSKJ2u1_aV2OGUueJsw494MLC66Fr9bNYwES_Y47ogcP3YTNJ39KbIbhVCH1iKhUJCxHx72frtKJP-WerQwJ1LSSuwHDEmBFLMtnNVoob8A',
    },
    {
      title: 'Pouches',
      description:
        'We offer flexible pouch packaging solutions in a variety of formats designed for functionality and strong shelf impact. Formats include stand-up, center seal, shaped, and customized.',
      applications:
        'Stand-Up Pouches, Centre Seal Pouches, Three Side Seal Pouches, Gusset Pouches, Spout Pouches, Shaped Pouches, Customized Pouches.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA1x6XFRG13yhy-etc_-4XL1sSgehBHhOPkz0Q_iLPX9ExtcoBhJ5aBeLzGdNXtSjZS_SkKrmIrVg0A6sqZpPH3cO88kRqhDcB7o3I3Df1AMawFnubywjZ6mH8m_dc1F7bhx851o6POl98_D2PD5XjHWnpGYaC9JtOtDIJBjIuRIRI_u01lJTygs7d0pDZNwZ4tmbnfUKukrl4VAF2cTvvNx8CRZ0B77jUwNRCtIqLIBgeFxarUv8amY-OcsHRUsgDDeg',
    },
    {
      title: 'Paper Bags',
      description:
        'Paper bags provide a practical packaging solution for retail, food service, and promotional purposes. We offer a range of paper bag formats that can be adapted for customized size, design, and printing.',
      applications: 'Retail Bags, Shopping Bags, Food & Takeaway Bags, Promotional Bags, Customized Paper Bags.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAmHUJPx7qVZScNAhX45ggMToMPSS0dDoPkYddEn-y2iAnD6q-LE-eqld5ZWlVMQmbRJaJgc3HJ4rmwX4uxBnvPdCKOyjWO4vuMqI4-xMpTjfQzFa6uIB-PyAAyY6zMkYlARuBXp92DnCg_Ewkl_MDRiPCL0EAmbg6tmILf9thfquY1djjyFq_QhTAAyFa6nX66fZFimyjpleVQzLcLjtP7Sc6c3ulChSp33AGrgRB-5ZJl1Sgk3LKrGGmYanNGeO61jg',
    },
  ];

  protected readonly machines: Machine[] = [
    {
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCqLcEcH2bgjB1S2Yk6D4qXK8JK1fsdkMskhkXFULmqWWg3A2xvz86JrlOIV8sycHRoct-eE65pvQ4suRN78TgkFosg2x_b7Y5F-WjAbRlXjf9mh1npfYy9F9TNtsoE-upRaF-W1QsneAi7hSjysjUqaxwLTOIJeh3ssGGyqu1_MH2HEEmWRBztrw6oiwz15pmFk2Zz49_-VK2VwWYy1sA6skEM7sGdqKB6L67_ZzNvzuEmPZiA9egrQZ0Bdl7hN4kWNg',
      title: '9-Colour Fully Computerized Rotogravure Machine',
      usedFor: [
        'High-volume flexible packaging',
        'Complex multi-color labels and wrappers',
        'Premium decorative laminates',
      ],
      capabilities: [
        'Fully computerized registration control',
        'High-speed continuous printing',
        'Exceptional color consistency across large runs',
      ],
    },
    {
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBMI2MOXwExuNd3grR8u3BcJt-f7-EdXl67vwqTEupCwV1uTVvAaF1ZSrCffBrPRC2G8PKBWlVQEX5K38PaKu_S1CEuZ_81_umhJd3iu9cSiBB_axAVP6EWzGqxG69fiFXHBdwfQQzTX8twX_POHJ8PjYtvw6GJhySWup98cA0hMIpmgwoGueetGgQPuMfJ58jjsrZ6zmBNrun3D1CIGEqK_Hdr3j5jMeAYKHvKjpvKNeGQ_LCQOdDcgJV3phUhn5h57A',
      title: 'Extrusion Coating & Lamination Machine',
      usedFor: [
        'Multi-layer barrier films',
        'Industrial protective packaging materials',
        'Composite structures for food and pharma',
      ],
      capabilities: [
        'Precise coating thickness control',
        'High-strength bond formation',
        'Versatility across various substrates',
      ],
    },
    {
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDPUIadcDFnEeGUl8_4nR1FQCsqnQDXiBhWwtzkfvNo7o8iYW4i5SYL0mgi6yR2s7ZlIODcTS2DkFLO1cNuTl9TuaBtBjW0T9sej3AJM87qfvhxaZAadtNTO9o4SAmu7vrJqjrFHYZsBUi4IoZfhsHlIyLEeejP-_c7Nd9SkroonWMoVwSev6qXtbMqiKojTol8YFu3CYWz0XXZogD1gJRi-n0DAJ3OumdsSW9vZuxiAuPk-JIMZuz8X31pltucnA5n7w',
      title: 'Automatic Pouching Machine',
      usedFor: [
        'Stand-up pouches with zippers',
        'Center-seal and three-side seal bags',
        'Specialized retail packaging formats',
      ],
      capabilities: [
        'High-speed forming, filling, and sealing',
        'Precise temperature and pressure controls',
        'Consistent seal integrity and aesthetics',
      ],
    },
  ];

  private readonly title = inject(Title);

  constructor() {
    this.title.setTitle('Packaging Solutions | Royal Traders');
  }
}

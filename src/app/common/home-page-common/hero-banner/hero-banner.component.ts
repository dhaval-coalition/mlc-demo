import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';
import { CarouselComponent } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.scss',
  encapsulation: ViewEncapsulation.None
})
@BuilderBlock({
  tag: 'app-hero-banner',
  name: 'Home hero banner',
  inputs: [
    {
      name: 'slider',
      type: 'list',
      friendlyName: 'Slide',
      subFields:[
        {
          name: 'heroBackgroundImage',
          type: 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
          defaultValue:'',
          friendlyName: 'Background Image',
        },
        {
          name: 'heroTitle',
          type: 'string',
          defaultValue: 'Enter some text...',
        },
        {
          name: 'heroDescription',
          type: 'longText',
          defaultValue: 'Enter some text...',
        },
        {
          name: 'bulletPoint',
          type: 'list',
          // onChange: (options:any) => {
          //   const bulletPoint = options.get('bulletPoint');
          //   if(bulletPoint.length > 6){
          //     options.set('bulletPoint', bulletPoint.slice(0,6));
          //     alert('Maximum 6 navigation links are allowed.');
          //   }
          // },
          subFields:[
            {
              name: 'icon',
              type: 'file',
              allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
              defaultValue:'https://placehold.co/40x40',
            },
            {
              name: 'name',
              type: 'string',
              defaultValue: 'Enter some text...',
            },
          ]
        }
      ]
    },
  ],
})
export class HeroBannerComponent implements OnInit {
  @ViewChild('heroOwlCarousel', {static: false}) heroOwlCarousel!: CarouselComponent;  

  @Input() slider: {
    heroBackgroundImage: string,
    heroTitle: string,
    heroDescription: string,
    bulletPoint?: {
      name: string,
      icon: string,
    }[]
  }[] = [];
  
  constructor(){}

  ngOnInit(): void {
  }
  heroCustomOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: false,
    navSpeed: 700,
    items: 1,
  }
  goPrev() {
    this.heroOwlCarousel.prev();
  }
  goNext() {
    this.heroOwlCarousel.next();
  }
}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';
import { CarouselComponent } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-information-hub',
  templateUrl: './information-hub.component.html',
  styleUrl: './information-hub.component.scss'
})
@BuilderBlock({
  tag: 'app-information-hub',
  name: 'Information hub',
  inputs: [
    {
      name: 'sectionTitle',
      type: 'string',
      friendlyName: 'Title',
      defaultValue: "Information Hub",
    },
    {
      name: 'sectionDescription',
      type: 'html',
      defaultValue: 'Enter some text...',
      friendlyName: 'Description',
    },
    {
      name: 'informationItems',
      type: 'list',
      friendlyName:"Items",
      defaultValue:[],
      subFields:[
        {
          name: "image",
          type: "file",
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
          friendlyName: "Image",
          defaultValue:'https://placehold.co/356x224',
        },
        {
          name: 'badge',
          type: 'object',
          friendlyName:'Badge',
          defaultValue: {
            text: 'Installment Loans',
            variant: 'secondary',
          },
          subFields: [
            {
              name: 'text',
              friendlyName:'Name',
              type: 'string',
            },
            {
              name: 'variant',
              type: 'string',
              enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
            },
          ],
        },
        {
          name: "itemName",
          type: "string",
          friendlyName: "Name",
          defaultValue: "Name",
        },
        {
          name: "itemDate",
          type: "date",
          friendlyName: "Published Date",
          defaultValue: "Jan 01, 2024",
        },
        {
          name: "itemDescription",
          type: "string",
          friendlyName: "Description",
          defaultValue: "Enter some text...",
        }
      ]
    }
  ]
})
export class InformationHubComponent implements OnInit {
  @ViewChild('owlCarousel', { static: false }) owlCarousel!: CarouselComponent;

  @Input() sectionTitle = '';
  @Input() sectionDescription = '';
  @Input() informationItems:{
    image: string,
    badge?: {
      text: string;
      variant: string;
    },
    itemName: string,
    itemDate: string,
    itemDescription: string,
  }[] = []

  constructor(){
  }
  ngOnInit():void {
  }
  carouselCustomOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    nav: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
  }
  goPrev() {
    this.owlCarousel.prev();
  }
  goNext() {
    this.owlCarousel.next();
  }
}

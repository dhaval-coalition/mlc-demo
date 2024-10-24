import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-we-offer',
  templateUrl: './we-offer.component.html',
  styleUrl: './we-offer.component.scss',
  encapsulation: ViewEncapsulation.None
})
@BuilderBlock({
  tag: 'app-we-offer',
  name: 'We offer',
  inputs:[
    {
      name: 'sectionTitle',
      type: 'string',
      friendlyName: 'Title',
      defaultValue: "Explore the Loan Products We Offer!",
    },
    {
      name: 'sectionDescription',
      type: 'html',
      defaultValue: 'Enter some text...',
      friendlyName: 'Description',
    },
    {
      name: 'items',
      type: 'list',
      friendlyName: 'Offer',
      subFields:[
        {
          name: 'bgColor',
          type: 'color',
          defaultValue: '#EEF3F9',
        },
        {
          name: 'itemDescription',
          type: 'html',
          defaultValue: 'Enter some text...',
          friendlyName: 'Description',
        },
        {
          name: 'descriptionItemIcons',
          friendlyName:'Item icons color',
          type: 'string',
          defaultValue: 'blue',
          enum: ['blue', 'green', 'yellow'],
        },
        {
          name: 'button',
          type: 'object',
          friendlyName:'Button',
          defaultValue: {
            text: 'Apply Now',
            url: '/',
            variant: 'secondary',
          },
          subFields: [
            {
              name: 'text',
              type: 'string',
            },
            {
              name: 'url',
              type: 'url',
            },
            {
              name: 'variant',
              type: 'string',
              defaultValue: 'secondary',
              enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
            },
          ],
        },
        {
          name: "thumbImage",
          type: "file",
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
          friendlyName: "Image",
          defaultValue: "https://placehold.co/451x451",
        }
      ]
    }
  ]
})
export class WeOfferComponent implements OnInit {
  @Input() bgColor = '';
  @Input() sectionTitle = '';
  @Input() sectionDescription = '';
  @Input() descriptionBlock = '';
  @Input() items: {
    descriptionItemIcons: string;
    itemDescription: string;
    bgColor: string;
    thumbImage: string;
    button?: {
      text: string;
      url: string;
      variant: string;
    };
  }[] = [];
  @Input() buttonStyle: any = {
    text: '',
    url: '/',
    variant: ''
  };

  constructor(){}
  ngOnInit(): void {
  }
}

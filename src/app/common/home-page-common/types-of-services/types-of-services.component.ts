import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-types-of-services',
  templateUrl: './types-of-services.component.html',
  styleUrl: './types-of-services.component.scss',
  encapsulation: ViewEncapsulation.None
})
@BuilderBlock({
  tag: 'app-types-of-services',
  name: 'Types of services',
  inputs:[
    {
      name: 'bgColor',
      type: 'color',
      defaultValue: '#ffffff',
    },
    {
      name: 'sectionTitle',
      type: 'string',
      friendlyName: 'Title',
      defaultValue: "See Our Different Types of Services",
    },
    {
      name: 'items',
      type: 'list',
      friendlyName: 'Services',
      subFields:[
        {
          name: 'itemDescription',
          type: 'html',
          defaultValue: 'Enter some text...',
          friendlyName: 'Description',
        },
        {
          name: 'button',
          type: 'object',
          friendlyName:'Button',
          defaultValue: {
            text: 'Learn More',
            url: '/',
            variant: 'primary',
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
              defaultValue: 'primary',
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
        },
        {
          name: 'imagePosition',
          type: 'string',
          friendlyName: 'Image Position',
          defaultValue: 'Right',
          enum: ['Left', 'Right'],
        },
      ]
    },
    {
      name: 'buttonStyle',
      type: 'object',
      friendlyName:'Button',
      defaultValue: {
        text: 'Apply for a Loan',
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
          enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
        },
      ],
    },
  ]
})
export class TypesOfServicesComponent implements OnInit {
  @Input() bgColor = '';
  @Input() sectionTitle = '';
  @Input() descriptionBlock = '';
  @Input() itemDescription = '';
  @Input() items: {
    itemDescription: string;
    thumbImage: string;
    imagePosition: string;
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

  constructor(){
  }
  ngOnInit(): void {
  }
  // Method to check if bgColor is white in HEX or RGB format
  isWhiteBgColor(): boolean {
    if (!this.bgColor) return true; // If bgColor is not set, consider it as white
    const normalizedColor = this.bgColor.trim().toLowerCase();
    return (
      normalizedColor === '#ffffff' || 
      normalizedColor === 'rgb(255, 255, 255)' || 
      normalizedColor === 'rgba(255, 255, 255, 1)'
    );
  }
}

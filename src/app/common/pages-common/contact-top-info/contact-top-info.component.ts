import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-contact-top-info',
  templateUrl: './contact-top-info.component.html',
  styleUrl: './contact-top-info.component.scss',
  encapsulation: ViewEncapsulation.None
})
@BuilderBlock({
  tag: 'app-contact-top-info',
  name: 'Contact top info',
  inputs:[
    {
      name: 'sectionTitle',
      type: 'string',
      friendlyName: 'Title',
      defaultValue: "Contact Minute Loan Center",
    },
    {
      name: 'contactAddress',
      type: 'html',
      defaultValue: 'Enter some text...',
      friendlyName: 'Contact Address',
    },
    {
      name: 'phone',
      type: 'string',
      friendlyName: 'Phone',
      defaultValue: "1-888-213-5744",
    },
    {
      name: 'mail',
      type: 'string',
      friendlyName: 'Mail',
      defaultValue: "questions@minuteloancenter.com",
    },
    {
      name: 'buttonStyle',
      type: 'object',
      friendlyName:'Button',
      defaultValue: {
        text: 'See Our Retail Locations',
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
    {
      name: 'contactCard',
      type: 'object',
      friendlyName:'Card info',
      defaultValue:{
        title: 'Title',
        text: 'Text',
        url: 'URL',
      },
      subFields: [
        {
          name: 'cardItems',
          friendlyName: 'Item',
          type: 'list',
          subFields: [
            {
              name: 'title',
              type: 'string',
            },
            {
              name: 'text',
              type: 'string',
            },
            {
              name: 'url',
              type: 'url',
            },
          ]
        },
      ],
    },
    {
      name: 'bottomDescription',
      type: 'html',
      friendlyName: 'Description',
      defaultValue: "Enter some text...",
    },
  ]
})
export class ContactTopInfoComponent implements OnInit {
  @Input() sectionTitle = '';
  @Input() contactAddress = '';
  @Input() phone = '';
  @Input() mail = '';
  @Input() buttonStyle: any = {
    text: '',
    url: '/',
    variant: ''
  };
  @Input() contactCard: any = {
    cardItems:[]
  };
  @Input() bottomDescription = '';

  constructor(){
  }
  ngOnInit(): void {
  }
}

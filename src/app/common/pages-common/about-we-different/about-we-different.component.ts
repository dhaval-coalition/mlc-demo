import { Component, Input, OnInit } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-about-we-different',
  templateUrl: './about-we-different.component.html',
  styleUrl: './about-we-different.component.scss'
})
@BuilderBlock({
  tag: 'app-about-we-different',
  name: 'About we different',
  inputs:[
    {
      name: 'sectionTitle',
      type: 'string',
      defaultValue: 'We’re Different.',
      friendlyName: 'Title',
    },
    {
      name: 'weDifferentItems',
      type: 'list',
      friendlyName:"Items",
      defaultValue:[
        {
          icon:"https://placehold.co/48x48",
          iconBackgroundColor: '#2E67B1',
          itemName:"Item Title",
        },
        {
          icon:"https://placehold.co/48x48",
          iconBackgroundColor: '#2E67B1',
          itemName:"Item Title",
        },
        {
          icon:"https://placehold.co/48x48",
          iconBackgroundColor: '#2E67B1',
          itemName:"Item Title",
        }
      ],
      subFields:[
        {
          name: "icon",
          type: "file",
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
          friendlyName: "Icon",
        },
        {
          name: 'iconBackgroundColor',
          friendlyName: 'Background Color',
          type: 'color',
        },
        {
          name: "itemName",
          type: "string",
          friendlyName: "Name",
        }
      ]
    },
    {
      name: 'buttonStyle',
      type: 'object',
      friendlyName:'Button',
      defaultValue: {
        text: 'Apply Now!',
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
export class AboutWeDifferentComponent implements OnInit {
  @Input() sectionTitle = '';
  @Input() weDifferentItems: {
    icon: string,
    iconBackgroundColor: string,
    itemName: string,
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

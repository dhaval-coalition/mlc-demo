import { Component, Input, OnInit } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-what-your-funds',
  templateUrl: './what-your-funds.component.html',
  styleUrl: './what-your-funds.component.scss'
})
@BuilderBlock({
  tag: 'app-what-your-funds',
  name: 'What your funds',
  inputs: [
    {
      name: 'bgColor',
      type: 'color',
      defaultValue: '#EEF3F9',
    },
    {
      name: 'sectionTitle',
      type: 'string',
      friendlyName: 'Title',
      defaultValue: "What Your Funds Can Cover:",
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
    {
      name: 'fundsItems',
      type: 'list',
      friendlyName: 'Items',
      subFields: [
        {
          name:'icon',
          type: 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
          friendlyName: "Image",
          defaultValue: "https://placehold.co/48x48",
        },
        {
          name:'name',
          type: 'string',
          friendlyName: "Item Name",
          defaultValue: "Name",
        }
      ]
    },
    {
      name: 'sectionBottomTitle',
      type: 'string',
      friendlyName: 'Bottom Title',
      defaultValue: "…and anything else you need!",
    },
  ]
})
export class WhatYourFundsComponent implements OnInit {
  @Input() bgColor = '';
  @Input() sectionTitle = '';
  @Input() buttonStyle: any = {
    text: '',
    url: '/',
    variant: ''
  };
  @Input() sectionBottomTitle = '';
  @Input() fundsItems: {
    icon: '';
    name: '';
  }[] = [];

  constructor(){

  }
  ngOnInit(): void {

  }
}

import { Component, Input, OnInit } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
@BuilderBlock({
  tag: 'app-reviews',
  name: 'Home review',
  inputs:[
    {
      name: 'reviewTitle',
      type: 'string',
      friendlyName: 'Title',
      defaultValue: 'Minute Loan Center'
    },
    {
      name: 'reviewSubTitle',
      type: 'string',
      friendlyName: 'Sub Title',
      defaultValue: 'Vetted by Experts. Trusted by Thousands.'
    },
    {
      name: 'reviewDescription',
      type: 'html',
      defaultValue: 'Enter some text...',
      friendlyName: 'Description',
    },
    {
      name: 'reviewLogo1',
      type: 'file',
      defaultValue: '',
      bubble: true,
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
      friendlyName: 'Logo 1',
    },
    {
      name: 'reviewLogo2',
      type: 'file',
      defaultValue: '',
      bubble: true,
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
      friendlyName: 'Logo 2',
    },
    {
      name: 'bulletPoint',
      type: 'list',
      friendlyName: 'Items',
      subFields:[
        {
          name: 'icon',
          type: 'file',
          bubble: true,
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
        },
        {
          name: 'name',
          type: 'string',
          friendlyName: 'Name',
          defaultValue: 'Name'
        },
      ]
    }
  ]
})
export class ReviewsComponent implements OnInit {
  @Input() reviewTitle = '';
  @Input() reviewSubTitle = '';
  @Input() reviewDescription = '';
  @Input() reviewLogo1 = '';
  @Input() reviewLogo2 = '';
  @Input() bulletPoint: {
    icon: string,
    name: string,
  }[] = [];

  constructor(){}

  ngOnInit(): void {
    
  }
}

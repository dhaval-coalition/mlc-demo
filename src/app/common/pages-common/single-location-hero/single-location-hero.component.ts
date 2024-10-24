import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-single-location-hero',
  templateUrl: './single-location-hero.component.html',
  styleUrl: './single-location-hero.component.scss',
  encapsulation: ViewEncapsulation.None
})
@BuilderBlock({
  tag: 'app-single-location-hero',
  name: 'Location - hero banner',
  inputs: [
    {
      name: 'bgColor',
      friendlyName: 'Background Color',
      type: 'color',
      defaultValue: '#EBF7F0',
    },
    {
      name:'sectionTitle',
      type: 'string',
      friendlyName: 'Title',
      defaultValue: 'Title',
    },
    {
      name: 'sectionDescription',
      type: 'html',
      defaultValue: 'Minute Loan Center goes the extra mile to get you the funds you need.',
      friendlyName: 'Description',
    },
    {
      name: 'buttonStyle',
      type: 'object',
      friendlyName:'Button 1',
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
        }
      ],
    },
    {
      name: 'buttonStyle2',
      type: 'object',
      friendlyName:'Button 2',
      defaultValue: {
        text: 'Find a Store',
        url: '/',
        variant: 'outline-secondary',
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
          defaultValue: 'outline-secondary',
          enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
        }
      ],
    },
    {
      name: 'singleLocationHeroThumb',
      friendlyName: 'Thumb Image',
      type: 'file',
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
    },
  ]
})
export class SingleLocationHeroComponent implements OnInit {
  @Input() bgColor = '';
  @Input() sectionTitle = '';
  @Input() sectionDescription = '';
  @Input() singleLocationHeroThumb = '';
  @Input() buttonStyle:any = {
    text: '',
    url: '/',
    variant: '',
  };
  @Input() buttonStyle2:any = {
    text: '',
    url: '/',
    variant: '',
  };

  constructor(){}
  ngOnInit(): void {
  }
}

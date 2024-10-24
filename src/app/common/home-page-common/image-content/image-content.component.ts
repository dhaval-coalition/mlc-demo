import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-image-content',
  templateUrl: './image-content.component.html',
  styleUrl: './image-content.component.scss',
  encapsulation: ViewEncapsulation.None
})
@BuilderBlock({
  tag: 'app-image-content',
  name: 'Image with content',
  inputs:[
    {
      name: 'bgColor',
      type: 'color',
      defaultValue: '#EBF7F0',
    },
    {
      name:'bannerImage',
      type:'file',
      defaultValue: 'https://placehold.co/451x362',
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
    },
    {
      name: 'descriptionBlock',
      type: 'html',
      defaultValue: 'Enter some text...',
      friendlyName: 'Description',
    },
    {
      name: 'buttonStyle',
      type: 'object',
      friendlyName:'Button',
      defaultValue: {
        text: 'Apply Now!',
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
  ]
})
export class ImageContentComponent implements OnInit {
  @Input() bannerImage = '';
  @Input() descriptionBlock = '';
  @Input() bgColor = '';
  @Input() buttonStyle: any = {
    text: '',
    url: '/',
    variant: 'primary'
  };

  constructor(){}
  ngOnInit(): void {
    
  }
}

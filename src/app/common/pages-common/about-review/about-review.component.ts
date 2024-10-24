import { Component, Input, OnInit } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-about-review',
  templateUrl: './about-review.component.html',
  styleUrl: './about-review.component.scss'
})
@BuilderBlock({
  tag: 'app-about-review',
  name: 'About review',
  inputs: [
    {
      name: 'sectionTitle',
      type: 'string',
      defaultValue: 'We Treat You Like We Would Want to Be Treated.',
      friendlyName: 'Title',
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
      name: 'sectionBottomTitle',
      type: 'string',
      defaultValue: 'Get the Money You Need.',
      friendlyName: 'Title',
    },
  ]
})
export class AboutReviewComponent implements OnInit{
  @Input() sectionTitle = '';
  @Input() buttonStyle: any = {
    text: '',
    url: '/',
    variant: ''
  };
  @Input() sectionBottomTitle = '';
  
  constructor(){}
  ngOnInit(): void {
  }
}

import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-loans-faq',
  templateUrl: './loans-faq.component.html',
  styleUrl: './loans-faq.component.scss',
  encapsulation: ViewEncapsulation.None
})
@BuilderBlock({
  tag:'app-loans-faq',
  name: 'Faqs and qa',
  inputs: [
    {
      name: 'sectionTitle',
      type: 'string',
      friendlyName: 'Title',
      defaultValue: "FAQs / Q&A",
    },
    {
      name: 'faqAccordionObject',
      type: 'object',
      friendlyName:'FAQ Accordion',
      subFields:[
        {
          name: 'faqItems',
          type: 'list',
          friendlyName: 'Items',
          defaultValue: [],
          subFields: [
            {
              name: 'faqQue',
              type: 'string',
              friendlyName: 'Questions',
            },
            {
              name: 'faqAns',
              type: 'html',
              friendlyName: 'Answers',
            },
          ]
        },
      ]
    },
    {
      name: 'buttonStyle',
      type: 'object',
      friendlyName:'Button',
      defaultValue: {
        text: 'Apply For a Loan',
        url: '/',
        variant: 'secondary',
        width: 'auto',
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
        {
          name: 'width',
          type: 'string',
          defaultValue: 'large',
          enum: ['auto', 'medium', 'large'],
        },
      ],
    },
  ]
})
export class LoansFaqComponent implements OnInit {
  @Input() sectionTitle = '';
  @Input() faqAccordionObject: any = {
    faqItems: [],
  };
  @Input() buttonStyle: any = {
    text: '',
    url: '/',
    variant: '',
    width: '',
  };

  constructor(){
  }
  ngOnInit(): void {
  }
}

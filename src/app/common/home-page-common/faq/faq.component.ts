import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  encapsulation: ViewEncapsulation.None
})
@BuilderBlock({
  tag:'app-faq',
  name: 'Faq',
  inputs: [
    {
      name: 'bgColor',
      friendlyName: 'Background Color',
      type: 'color',
      defaultValue: '#EEF3F9',
    },
    {
      name: 'sectionTitle',
      type: 'string',
      friendlyName: 'Title',
      defaultValue: "FAQs (Who We Serve)",
    },
    {
      name: 'sectionDescription',
      type: 'html',
      defaultValue: 'Enter some text...',
      friendlyName: 'Description',
    },
    {
      name: 'faqObject',
      type: 'object',
      friendlyName:'FAQ Icons',
      defaultValue: {
        iconsBgColor: '#2E67B1',
        faqIcons:[
          {
            itemsImage:"https://placehold.co/48x48",
            itemName:"Name",
          }
        ]
      },
      subFields:[
        {
          name: 'iconsBgColor',
          friendlyName: 'Background Color',
          type: 'color',
        },
        {
          name: 'faqIcons',
          type: 'list',
          friendlyName: 'Icons',
          subFields:[
            {
              name: 'itemsImage',
              friendlyName: 'Icon',
              type: 'file',
              allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
            },
            {
              name: 'itemName',
              type: 'string',
              friendlyName: 'Name',
              defaultValue: "FAQs (Who We Serve)",
            }
          ]
        }
      ]
    },
    {
      name: 'faqAccordionObject',
      type: 'object',
      friendlyName:'FAQ Accordion',
      defaultValue: {
        accordionBlockTitle: "We can help you get funded in minutes!",
        disclosuresDescription: "Enter some text...",
        button:[
          {
            text: 'Apply For a Loan',
            url: '/',
            variant: 'secondary',
          }
        ]
      },
      subFields:[
        {
          name: 'accordionBlockTitle',
          type: 'string',
          friendlyName: 'Title',
        },
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
        {
          name: 'disclosuresDescription',
          type: 'html',
          friendlyName: 'Disclosure',
        },
      ]
    },
    {
      name: 'buttonStyle',
      type: 'object',
      friendlyName:'Button',
      defaultValue: {
        text: 'Visit Our Retail Locations',
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
export class FaqComponent implements OnInit {
  @Input() bgColor = '';
  @Input() sectionTitle = '';
  @Input() sectionDescription = '';
  @Input() faqObject:any = {
    accordionBlockTitle: '',
    iconsBgColor: '',
    faqIcons: [
      {
        itemsImage: '',
        itemName: '',
      }
    ]
  };
  @Input() faqAccordionObject: any = {
    accordionBlockTitle: '',
    disclosuresDescription: '',
    faqItems: [],
  };
  @Input() buttonStyle: any = {
    text: '',
    url: '/',
    variant: ''
  };

  constructor(){
  }
  ngOnInit(): void {
  }
}

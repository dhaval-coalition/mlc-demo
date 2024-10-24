import { Component, Input, OnInit } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
@BuilderBlock({
  tag: 'app-footer',
  name: 'Footer',
  inputs:[
    {
      name: 'footerColumns',
      type: 'list',
      friendlyName:'Column',
      defaultValue:[
        {
          footerNavLinks: [
            { name: 'Line of Credit', url: '#' },
            { name: 'Installment Loans', url: '#' }
          ]
        },
        {
          footerNavLinks: [
            { name: 'Careers', url: '#' },
            { name: 'Extra Mile', url: '#' },
            { name: 'FAQ', url: '#' },
            { name: 'Security Tips', url: '#' }
          ]
        },
        {
          footerNavLinks: [
            { name: 'Delaware', url: '#' },
            { name: 'Kansas', url: '#' },
            { name: 'Louisiana', url: '#' },
            { name: 'Mississippi', url: '#' },
            { name: 'Nevada', url: '#' },
            { name: 'South Carolina', url: '#' },
            { name: 'Utah', url: '#' }
          ]
        },
        {
          footerNavLinks: [
            { name: 'Contact Us', url: '#' },
            { name: 'Blog', url: '#' },
          ]
        }
      ],
      onChange: (options:any) => {
        const footerColumns = options.get('footerColumns');
        if (footerColumns.length > 4) {
          options.set('footerColumns', footerColumns.slice(0, 4))
          alert('Maximum 4 columns are allowed.')
        }
      },
      subFields:[
        {
          name: 'footerNavLinks',
          type: 'list',
          friendlyName: 'Items',
          subFields:[
            {
              name: 'name',
              type: 'string',
            },
            {
              name: 'url',
              type: 'url',
            }
          ]
        }
      ]
    },
    {
      name: 'footerCopyrightText',
      type: 'string',
      defaultValue: 'Minute Loan Center'
    },
    {
      name: 'footerBottomNavLinks',
      type: 'list',
      friendlyName: 'Items',
      defaultValue:[
        {
          name: 'Sitemap', url: '/',
        },
        {
          name: 'Site Credits', url: '/',
        },
        {
          name: 'Privacy Policy', url: '/',
        },
        {
          name: 'Accessibility Statement', url: '/',
        },
      ],
      subFields:[
        {
          name: 'name',
          type: 'string',
        },
        {
          name: 'url',
          type: 'url'
        }
      ]
    }
  ]
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  
  @Input() footerColumns: {
    footerNavLinks?:{
      name: string,
      url: string,
    }[]
  }[] = [];
  @Input() footerCopyrightText = '';
  @Input() footerBottomNavLinks:{
    name: string,
    url: string,
  }[] = []

  constructor(){ }
  ngOnInit():void{ }
}

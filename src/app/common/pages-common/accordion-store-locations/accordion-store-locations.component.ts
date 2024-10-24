import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-accordion-store-locations',
  templateUrl: './accordion-store-locations.component.html',
  styleUrl: './accordion-store-locations.component.scss',
  encapsulation: ViewEncapsulation.None
})
@BuilderBlock({
  tag:'app-accordion-store-locations',
  name: 'Accordion store locations',
  inputs: [
    {
      name: 'sectionTitle',
      type: 'string',
      friendlyName: 'Title',
      defaultValue: "Store Locations:",
    },
    {
      name: 'store',
      type: 'list',
      friendlyName: 'Items',
      subFields: [
        {
          name: 'storeQue',
          type: 'string',
          friendlyName: 'Item title',
          defaultValue: 'Item title',
        },
        {
          name: 'storeHoursSettingObject',
          type: 'object',
          friendlyName:'Store Hours Setting',
          defaultValue: {
            contentTitle1: "Store Hours",
            storeHours: [
              { storeHoursWeek: 'Monday', storeHoursTime: '9 AM–6 PM' },
              { storeHoursWeek: 'Tuesday', storeHoursTime: '9 AM–6 PM' },
              { storeHoursWeek: 'Wednesday', storeHoursTime: '9 AM–6 PM' },
              { storeHoursWeek: 'Thursday', storeHoursTime: '9 AM–6 PM' },
              { storeHoursWeek: 'Friday', storeHoursTime: '9 AM–6 PM' },
              { storeHoursWeek: 'Saturday', storeHoursTime: '9 AM–3 PM' },
              { storeHoursWeek: 'Sunday', storeHoursTime: 'Closed' },
            ]
          },
          subFields:[
            {
              name: 'contentTitle1',
              type: 'string',
              friendlyName: 'Section Title',
            },
            {
              name: 'storeHours',
              type: 'list',
              friendlyName: 'Items',
              subFields: [
                {
                  name: 'storeHoursWeek',
                  type: 'string',
                  friendlyName: 'Week',
                },
                {
                  name: 'storeHoursTime',
                  type: 'string',
                  friendlyName: 'Time',
                },
              ]
            }
          ]
        },
        {
          name: 'locationSettingObject',
          type: 'object',
          friendlyName:'Location Setting',
          defaultValue: {
            contentTitle2: "Location",
            storeAddress: '',
            buttonStyle: {
              text: 'Let’s Get Started',
              url: '/',
              variant: 'secondary',
            }
          },
          subFields:[
            {
              name: 'contentTitle2',
              type: 'string',
              friendlyName: 'Section Title',
            },
            {
              name: 'storeAddress',
              type: 'html',
              friendlyName: 'Item content',
            },
            {
              name: 'buttonStyle',
              type: 'object',
              friendlyName:'Button',
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
                }
              ],
            },
          ]
        },
        {
          name: 'mapSettingObject',
          type: 'object',
          friendlyName:'Map Setting',
          subFields:[
            {
              name: 'mapEmbedCode',
              type: 'html',
              friendlyName: 'Map Embed Code',
            }
          ]
        }
      ]
    }
  ]
})
export class AccordionStoreLocationsComponent implements OnInit {
  @Input() sectionTitle: string = '';
  @Input() store:{
    storeQue: string,
    storeHoursSettingObject: {
      contentTitle1: string,
      storeHours: {
        storeHoursWeek: string,
        storeHoursTime: string
      }[]
    },
    locationSettingObject: {
      contentTitle2: string,
      storeAddress: string,
      buttonStyle: {
        text: string,
        url: string,
        variant: string
      }
    },
    mapSettingObject: {
      mapEmbedCode: string,
    },
  }[] = [];

  constructor(private sanitizer: DomSanitizer){}
  ngOnInit(): void {
  }
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

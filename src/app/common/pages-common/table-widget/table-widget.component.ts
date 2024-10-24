import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-table-widget',
  templateUrl: './table-widget.component.html',
  styleUrl: './table-widget.component.scss',
  encapsulation: ViewEncapsulation.None
})
@BuilderBlock({
  tag: 'app-table-widget',
  name: 'Table',
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
      defaultValue: "MLC Delaware Loan Products Provide Better Options",
    },
    {
      name: 'alignCenter',
      type: 'boolean',
      friendlyName: 'Align Center',
      helperText: 'Align the table content to the center.',
    },
    {
      name: 'textSmall',
      type: 'boolean',
      friendlyName: 'Text Small',
      helperText: 'Reduce the font size of the table content.',
    },
    {
      name: 'alternateBgChange',
      type: 'boolean',
      friendlyName: 'background color rows',
      helperText: 'Alternate the background color for odd and even rows.',
    },
    {
      name: 'tableHeaders',
      type: 'list',
      friendlyName: 'Headers',
      subFields: [
        {
          name: 'header',
          type: 'string',
          friendlyName: 'Table Header',
        },
      ],
    },
    {
      name: 'tableRows',
      type: 'list',
      friendlyName: 'Rows',
      subFields: [
        {
          name: 'columns',
          type: 'list',
          friendlyName: 'Row Columns',
          subFields: [
            {
              name: 'columnValue',
              type: 'html',
              friendlyName: 'Column Value',
            },
          ],
        },
      ],
    },
    {
      name: 'sectionDescription',
      type: 'html',
      defaultValue: 'Enter some text...',
      friendlyName: 'Description',
    },
    {
      name: 'buttonStyle',
      type: 'object',
      friendlyName:'Button',
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
          enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
        },
      ],
    },
  ],
})
export class TableWidgetComponent implements OnInit {
  @Input() bgColor: string = '';
  @Input() sectionTitle: string = '';
  @Input() alignCenter: boolean = false;
  @Input() textSmall: boolean = false;
  @Input() alternateBgChange: boolean = false;
  @Input() tableHeaders: { 
    header: string 
  }[] = [];
  @Input() tableRows: { 
    columns: { 
      columnValue: string 
    }[] 
  }[] = [];
  @Input() sectionDescription: string = '';
  @Input() buttonStyle: any = {
    text: '',
    url: '/',
    variant: ''
  };

  constructor(){
  }
  ngOnInit(): void {
  }
  isDescriptionEmpty(description: string): boolean {
    if (!description) {
      return true; // If the description is null or undefined, it's empty
    }
  
    // Parse the description as HTML and strip out tags
    const parser = new DOMParser();
    const doc = parser.parseFromString(description, 'text/html');
    const textContent = doc.body.textContent?.trim();
  
    // Return true if no meaningful text content is found
    return !textContent;
  }
  
}

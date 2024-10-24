import { Component, Input, OnInit } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-table-widget-2',
  templateUrl: './table-widget-2.component.html',
  styleUrl: './table-widget-2.component.scss'
})
@BuilderBlock({
  tag: 'app-table-widget-2',
  name: 'Fees Table',
  inputs: [
    {
      name: 'sectionTitle',
      type: 'string',
      friendlyName: 'Title',
      defaultValue: "Minute Loan Center Itemization of Charges – Revolving Credit (May 7, 2021)",
    },
    {
      name: 'tableArray',
      type: 'list',
      friendlyName: 'Table',
      subFields:[
        {
          name: 'header',
          type: 'string',
          friendlyName: 'Table Header',
        },
        {
          name: 'tableRows',
          type: 'list',
          friendlyName: 'Rows',
          subFields: [
            {
              name: 'rowColspan',
              type: 'boolean',
              friendlyName: 'Row Colspan',
            },
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
      ]
    },
    {
      name: 'sectionDescription',
      type: 'html',
      defaultValue: 'Enter some text...',
      friendlyName: 'Description',
    },
  ],
})
export class TableWidget2Component implements OnInit {
  @Input() sectionTitle: string = '';
  @Input() tableArray: {
    header: string
    tableRows: {
      rowColspan: boolean,
      columns: { 
        columnValue: string 
      }[] 
    }[]
  }[] = [];
  @Input() sectionDescription: string = '';

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

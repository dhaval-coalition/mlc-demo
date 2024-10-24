import { Component, Input, OnInit } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss'
})
@BuilderBlock({
  tag:'app-how-it-works',
  name: 'How it works',
  inputs: [
    {
      name: 'sectionTitle',
      type: 'string',
      defaultValue: 'How It Works',
      friendlyName: 'Title',
    },
    {
      name: 'sectionDescription',
      type: 'html',
      defaultValue: 'Enter some text...',
      friendlyName: 'Description',
    },
    {
      name: 'howItWorkItems',
      type: 'list',
      friendlyName:"Items",
      defaultValue:[
        {
          icon:"",
          itemName:"Fast Application",
          itemDescription:"Our easy form takes only a minute or two – no credit hit1, no headaches."
        },
        {
          icon:"",
          itemName:"Quick Approval",
          itemDescription:"Receive your online loan approval in minutes, with no hits to your credit!1"
        },
        {
          icon:"",
          itemName:"Instant Funding",
          itemDescription:"Same-day loans just got faster. Get your deposit in seconds."
        }
      ],
      subFields:[
        {
          name: "icon",
          type: "file",
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
          friendlyName: "Icon",
        },
        {
          name: "itemName",
          type: "string",
          friendlyName: "Name",
          defaultValue: "Name",
        },
        {
          name: "itemDescription",
          type: "string",
          friendlyName: "Description",
          defaultValue: "Description",
        }
      ]
    }
  ]
})
export class HowItWorksComponent implements OnInit  {
  @Input() sectionTitle = '';
  @Input() sectionDescription = '';
  @Input() howItWorkItems:{
    icon: string,
    itemName: string,
    itemDescription: string,
  }[] = []

  constructor(){}
  ngOnInit(): void {
    
  }
}

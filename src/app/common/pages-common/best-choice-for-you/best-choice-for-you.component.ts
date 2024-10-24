import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-best-choice-for-you',
  templateUrl: './best-choice-for-you.component.html',
  styleUrl: './best-choice-for-you.component.scss',
  encapsulation: ViewEncapsulation.None
})
@BuilderBlock({
  tag: 'app-best-choice-for-you',
  name: 'Best choice for you',
  inputs: [
    {
      name: 'backgroundColor',
      friendlyName: 'Background Color',
      type: 'color',
      defaultValue: '#EBF7F0',
    },
    {
      name: 'sectionTitle',
      type: 'string',
      defaultValue: 'Why is Minute Loan Center the Best Choice For You?',
      friendlyName: 'Title',
    },
    {
      name: 'sectionDescription',
      type: 'html',
      defaultValue: 'Enter some text...',
      friendlyName: 'Description',
    },
    {
      name: 'bestChoiceItems',
      type: 'list',
      friendlyName:"Items",
      defaultValue:[
        {
          icon:"https://placehold.co/48x48",
          iconBackgroundColor: '#2E67B1',
          itemName:"Item Title",
        },
        {
          icon:"https://placehold.co/48x48",
          iconBackgroundColor: '#2E67B1',
          itemName:"Item Title",
        },
        {
          icon:"https://placehold.co/48x48",
          iconBackgroundColor: '#2E67B1',
          itemName:"Item Title",
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
          name: 'iconBackgroundColor',
          friendlyName: 'Background Color',
          type: 'color',
        },
        {
          name: "itemName",
          type: "string",
          friendlyName: "Name",
        },
        {
          name: 'itemDescription',
          type: 'html',
          friendlyName: 'Description',
        },
      ]
    }
  ]
})
export class BestChoiceForYouComponent implements OnInit {
  @Input() backgroundColor = '';
  @Input() sectionTitle = '';
  @Input() sectionDescription = '';
  @Input() bestChoiceItems:{
    icon: string,
    iconBackgroundColor: string,
    itemName: string,
    itemDescription: string,
  }[] = []

  constructor(){}
  ngOnInit(): void {
  }
}

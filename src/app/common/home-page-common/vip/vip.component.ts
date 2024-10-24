import { Component, Input, OnInit } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-vip',
  templateUrl: './vip.component.html',
  styleUrl: './vip.component.scss'
})
@BuilderBlock({
  tag: 'app-vip',
  name: 'Vip',
  inputs:[
    {
      name: 'sectionTitle',
      type: 'string',
      friendlyName: 'Title',
      defaultValue: "Be a Minute Loan Center VIP",
    },
    {
      name: 'sectionDescription',
      type: 'html',
      defaultValue: 'Enter some text...',
      friendlyName: 'Description',
    },
    {
      name: 'vipBlockItems',
      type: 'list',
      friendlyName:"Items",
      defaultValue:[
        {
          icon:"https://placehold.co/80x80",
          itemName:"Name",
          itemDescription:"Description"
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
        },
        {
          name: "itemDescription",
          type: "string",
          friendlyName: "Description",
        }
      ]
    }
  ]
})
export class VipComponent implements OnInit {
  @Input() sectionTitle = '';
  @Input() sectionDescription = '';
  @Input() vipBlockItems:{
    icon: string,
    itemName: string,
    itemDescription: string,
  }[] = []
  
  constructor(){
  }
  ngOnInit(): void{
  }
}

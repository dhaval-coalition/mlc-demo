import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-vip-can',
  templateUrl: './vip-can.component.html',
  styleUrl: './vip-can.component.scss',
  encapsulation: ViewEncapsulation.None
})
@BuilderBlock({
  tag: 'app-vip-can',
  name: 'Vip can',
  inputs:[
    {
      name:'bannerImage',
      type:'file',
      defaultValue: 'https://placehold.co/451x451',
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
    },
    {
      name: 'sectionTitle',
      type: 'string',
      defaultValue: 'Minute Loan Center VIPs can:',
      friendlyName: 'Title',
    },
    {
      name: 'vipItems',
      type: 'list',
      friendlyName: 'Items',
      subFields: [
        {
          name:'icon',
          type: 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
          friendlyName: "Image",
          defaultValue: "https://placehold.co/48x48",
        },
        {
          name:'itemName',
          type: 'string',
          friendlyName: "Item Name",
          defaultValue: "Name",
        },
        {
          name: 'itemDescription',
          type: 'html',
          defaultValue: 'Enter some text...',
          friendlyName: 'Description',
        },
      ]
    },
  ]
})
export class VipCanComponent implements OnInit {
  @Input() bannerImage = '';
  @Input() sectionTitle = '';
  @Input() vipItems: {
    icon: string,
    name: string,
    itemName : string,
    itemDescription: string,
  }[] = [];

  constructor(){}
  ngOnInit(): void {
    
  }
}

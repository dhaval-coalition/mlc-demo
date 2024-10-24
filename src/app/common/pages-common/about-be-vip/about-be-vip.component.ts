import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-about-be-vip',
  templateUrl: './about-be-vip.component.html',
  styleUrl: './about-be-vip.component.scss',
  encapsulation: ViewEncapsulation.None
})
@BuilderBlock({
  tag: 'app-about-be-vip',
  name: 'About be vip',
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
      defaultValue: 'Be a Minute Loan Center VIP!',
      friendlyName: 'Title',
    },
    {
      name: 'beVipItems',
      type: 'list',
      friendlyName:"Items",
      defaultValue:[
        {
          icon:"https://placehold.co/80x80",
          itemName:"Item Title",
        },
        {
          icon:"https://placehold.co/80x80",
          itemName:"Item Title",
        },
        {
          icon:"https://placehold.co/80x80",
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
export class AboutBeVipComponent implements OnInit {
  @Input() backgroundColor = '';
  @Input() sectionTitle = '';
  @Input() beVipItems:{
    icon: string,
    itemName: string,
    itemDescription: string,
  }[] = []

  constructor(){}
  ngOnInit(): void {
  }
  // Method to check if bgColor is white in HEX or RGB format
  isWhiteBgColor(): boolean {
    if (!this.backgroundColor) return true; // If backgroundColor is not set, consider it as white
    const normalizedColor = this.backgroundColor.trim().toLowerCase();
    return (
      normalizedColor === '#ffffff' || 
      normalizedColor === 'rgb(255, 255, 255)' || 
      normalizedColor === 'rgba(255, 255, 255, 1)'
    );
  }
}

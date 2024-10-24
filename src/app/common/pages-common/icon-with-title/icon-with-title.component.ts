import { Component, Input, OnInit } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-icon-with-title',
  templateUrl: './icon-with-title.component.html',
  styleUrl: './icon-with-title.component.scss'
})
@BuilderBlock({
  tag: 'app-icon-with-title',
  name: 'Icon with title',
  inputs: [
    {
      name: 'iconWithTitleItems',
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
        }
      ]
    }
  ]
})
export class IconWithTitleComponent implements OnInit {
  @Input() iconWithTitleItems:{
    icon: string,
    itemName: string,
  }[] = [];

  constructor(){}
  ngOnInit(): void {
  }
}

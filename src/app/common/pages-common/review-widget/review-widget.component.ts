import { Component, Input, OnInit } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-review-widget',
  templateUrl: './review-widget.component.html',
  styleUrl: './review-widget.component.scss'
})
@BuilderBlock({
  tag: 'app-review-widget',
  name: 'Review widget',
  inputs:[
    {
      name: 'bgColor',
      friendlyName: 'Background Color',
      type: 'color',
      defaultValue: '#EBF7F0',
    },
    {
      name: 'logoItems',
      type: 'list',
      subFields:[
        {
          name: 'logo',
          type: 'file',
          friendlyName: 'Logo',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
        }
      ]
    }
  ]
})
export class ReviewWidgetComponent implements OnInit {
  @Input() bgColor = '';
  @Input() logoItems:{
    logo: string,
  }[] = []

  constructor(){
  }
  ngOnInit(): void {
  }
}

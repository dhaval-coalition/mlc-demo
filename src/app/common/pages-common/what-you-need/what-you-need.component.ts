import { Component, Input, OnInit } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-what-you-need',
  templateUrl: './what-you-need.component.html',
  styleUrl: './what-you-need.component.scss'
})
@BuilderBlock({
  tag: 'app-what-you-need',
  name: 'What you need',
  inputs:[
    {
      name: 'whatYouNeedBgColor',
      type: 'color',
      defaultValue: '#EEF3F9',
    },
    {
      name:'whatYouNeedThumb',
      type:'file',
      defaultValue: 'https://placehold.co/451x362',
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
    },
    {
      name:'sectionSubTitle',
      type: 'string',
      friendlyName: 'Title',
      defaultValue: 'What You Need to Apply:',
    },
    {
      name: 'whatYouNeedItems',
      type: 'list',
      friendlyName: 'Items',
      defaultValue: [],
      subFields: [
        {
          name:'icon',
          type: 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
          friendlyName: "Image",
          defaultValue: "https://placehold.co/48x48",
        },
        {
          name:'name',
          type: 'string',
          friendlyName: "Item Name",
          defaultValue: "Name",
        }
      ]
    }
  ]
})
export class WhatYouNeedComponent implements OnInit {
  @Input() whatYouNeedThumb = '';
  @Input() sectionSubTitle = '';
  @Input() whatYouNeedBgColor = '';
  @Input() whatYouNeedItems: {
    icon: '';
    name: '';
  }[] = [];

  constructor(){}
  ngOnInit(): void {
  }
}

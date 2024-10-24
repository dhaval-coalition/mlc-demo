import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-download-app',
  templateUrl: './download-app.component.html',
  styleUrl: './download-app.component.scss',
  encapsulation: ViewEncapsulation.None
})
@BuilderBlock({
  tag: "app-download-app",
  name: "Download app",
  inputs:[
    {
      name: 'bgColor',
      type: 'color',
      friendlyName:'Background Color',
      defaultValue: '#EBF7F0',
    },
    {
      name: "thumbImage1",
      type: "file",
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
      friendlyName: "Thumb Image 1",
      defaultValue: "https://placehold.co/183x373",
    },
    {
      name: "thumbImage2",
      type: "file",
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
      friendlyName: "Thumb Image 2",
      defaultValue: "https://placehold.co/183x373",
    },
    {
      name: 'circleBgColor',
      type: 'color',
      friendlyName:'Circle Background Color',
      defaultValue: '#2E67B1',
    },
    {
      name: 'sectionDescription',
      type: 'html',
      defaultValue: 'Enter some text...',
      friendlyName: 'Description',
    },
    {
      name: "thumbIcon1",
      type: "file",
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
      friendlyName: "Apple Store",
      defaultValue: "https://placehold.co/180x60",
    },
    {
      name: 'thumbIcon1Url',
      type: 'url',
      friendlyName: 'Apple Store URL',
      defaultValue: '/',
    },
    {
      name: "thumbIcon2",
      type: "file",
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
      friendlyName: "Google Store",
      defaultValue: "https://placehold.co/180x60",
    },
    {
      name: 'thumbIcon1Ur2',
      type: 'url',
      friendlyName: 'Google Store URL',
      defaultValue: '/',
    },
  ]
})
export class DownloadAppComponent implements OnInit {
  @Input() bgColor = '';
  @Input() thumbImage1 = '';
  @Input() thumbImage2 = '';
  @Input() circleBgColor = '';
  @Input() thumbIcon1 = '';
  @Input() thumbIcon1Url = '';
  @Input() thumbIcon2 = '';
  @Input() thumbIcon2Url = '';
  @Input() sectionDescription = '';

  constructor(){
  }
  ngOnInit(): void {
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-blog-top-content',
  templateUrl: './blog-top-content.component.html',
  styleUrl: './blog-top-content.component.scss'
})
@BuilderBlock({
  tag:'app-blog-top-content',
  name: 'Blog top content',
  inputs: [
    {
      name: 'sectionTitle',
      type: 'string',
      defaultValue: 'Welcome to The Minute Blog!',
      friendlyName: 'Title',
    },
    {
      name: 'sectionDescription',
      type: 'html',
      defaultValue: 'Enter some text...',
      friendlyName: 'Description',
    },
  ]
})
export class BlogTopContentComponent implements OnInit {
  @Input() sectionTitle = '';
  @Input() sectionDescription = '';

  constructor(){}
  ngOnInit(): void {
  }
}

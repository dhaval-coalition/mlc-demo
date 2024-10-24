import { Component, Input, OnInit } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-blog-hero',
  templateUrl: './blog-hero.component.html',
  styleUrl: './blog-hero.component.scss'
})
@BuilderBlock({
  tag: 'app-blog-hero',
  name: 'Blog hero',
  inputs:[
    {
      name:'bgImage',
      type: 'file',
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
      friendlyName: "Image",
      defaultValue: "https://placehold.co/1600x248",
    },
    {
      name: 'sectionTitle',
      type: 'string',
      friendlyName: 'Title',
      defaultValue: "The Minute Blog",
    },
  ]
})
export class BlogHeroComponent implements OnInit {
  @Input() bgImage = '';
  @Input() sectionTitle = '';

  constructor(){
  }
  ngOnInit(): void {
  }
}

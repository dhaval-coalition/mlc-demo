import { Component, OnInit } from '@angular/core';
import { Builder } from '@builder.io/sdk';

@Component({
  selector: 'app-single-location',
  templateUrl: './single-location.component.html',
  styleUrl: './single-location.component.scss'
})
export class SingleLocationComponent implements OnInit{
  constructor() {}

  ngOnInit() {
  } 
}

Builder.register('insertMenu', {
  name: 'Single Location - Components',
  items: [
    { name: 'Location - hero banner' },
    { name: 'We offer' },
    { name: 'Accordion store locations' },
    { name: 'Table' },
    { name: 'Fees Table' },
  ],
}) 
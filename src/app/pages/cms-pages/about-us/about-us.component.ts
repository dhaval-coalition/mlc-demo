import { Component, OnInit } from '@angular/core';
import { Builder } from '@builder.io/sdk';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit {
  constructor(){}
  ngOnInit(): void {
  }
}
Builder.register('insertMenu', {
  name: 'About - Components',
  items: [
    { name: 'About we different' },
    { name: 'About be vip' },
    { name: 'About review' },
    { name: 'About vip pays' },
  ],
}) 

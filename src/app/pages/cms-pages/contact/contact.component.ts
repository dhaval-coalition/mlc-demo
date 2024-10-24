import { Component, OnInit } from '@angular/core';
import { Builder } from '@builder.io/sdk';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  constructor(){
  }
  ngOnInit(): void {
  }
}
Builder.register('insertMenu', {
  name: 'Contact - Components',
  items: [
    { name: 'Contact top info' },
  ],
}) 

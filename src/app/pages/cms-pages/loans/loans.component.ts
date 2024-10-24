import { Component } from '@angular/core';
import { Builder } from '@builder.io/sdk';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrl: './loans.component.scss'
})
export class LoansComponent {

}
Builder.register('insertMenu', {
  name: 'Loans - Components',
  items: [
    { name: 'Loans - hero banner' },
    { name: 'Review widget' },
    { name: 'Best choice for you' },
    { name: 'What you need' },
    { name: 'Faqs and qa' },
  ],
}) 

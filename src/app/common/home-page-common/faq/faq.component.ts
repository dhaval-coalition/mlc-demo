import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, NgbAccordionModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FaqComponent {
  @Input() bgColor = '';
	@Input() sectionTitle = '';
	@Input() sectionDescription = '';
	@Input() faqObject: any = {
		accordionBlockTitle: '',
		iconsBgColor: '',
		faqIcons: [
			{
				itemsImage: '',
				iconImageAlt: '',
				itemName: '',
			}
		]
	};
	@Input() faqAccordionObject: any = {
		accordionBlockTitle: '',
		disclosuresDescription: '',
		faqItems: [],
	};
	@Input() buttonStyle: any = {
		text: '',
		url: '/',
		variant: ''
	};

	constructor() {
	}
	ngOnInit(): void {
	}
}

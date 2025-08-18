import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-loans-faq',
  standalone: true,
  imports: [CommonModule, NgbAccordionModule],
  templateUrl: './loans-faq.component.html',
  styleUrl: './loans-faq.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoansFaqComponent {
  @Input() sectionTitle = '';
	@Input() faqAccordionObject: any = {
		faqItems: [],
	};
	@Input() buttonStyle: any = {
		text: '',
		url: '/',
		variant: '',
		width: '',
		targetBlank: false,
	};

	constructor() {
	}
	ngOnInit(): void {
	}
}

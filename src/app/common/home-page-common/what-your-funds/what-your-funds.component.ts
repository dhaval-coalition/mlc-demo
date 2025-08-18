import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-what-your-funds',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './what-your-funds.component.html',
  styleUrl: './what-your-funds.component.scss'
})
export class WhatYourFundsComponent {
  @Input() bgColor = '';
	@Input() sectionTitle = '';
	@Input() buttonStyle: any = {
		text: '',
		url: '/',
		variant: '',
		targetBlank: false,
	};
	@Input() sectionBottomTitle = '';
	@Input() fundsItems: Array<{
		icon: string;
		iconImageAlt: string;
		name: string;
	}> = [];

	constructor() {

	}
	ngOnInit(): void {

	}
}

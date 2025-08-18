import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-about-we-different',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-we-different.component.html',
  styleUrl: './about-we-different.component.scss'
})
export class AboutWeDifferentComponent {
  @Input() sectionTitle = '';
	@Input() weDifferentItems: {
		icon: string,
		iconImageAlt: string,
		iconBackgroundColor: string,
		itemName: string,
	}[] = [];
	@Input() buttonStyle: any = {
		text: '',
		url: '/',
		variant: '',
		targetBlank: false,
	};

	constructor() { }
	ngOnInit(): void {

	}
}

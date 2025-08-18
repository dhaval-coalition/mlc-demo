import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-types-of-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './types-of-services.component.html',
  styleUrl: './types-of-services.component.scss',
	encapsulation: ViewEncapsulation.None
})
export class TypesOfServicesComponent {
  @Input() bgColor = '';
	@Input() sectionTitle = '';
	@Input() descriptionBlock = '';
	@Input() itemDescription = '';
	@Input() items: {
		itemDescription: string;
		thumbImage: string;
		thumbImageAlt: string,
		imagePosition: string;
		button?: {
			text: string;
			url: string;
			variant: string;
			targetBlank: false,
		};
	}[] = [];
	@Input() buttonStyle: any = {
		text: '',
		url: '/',
		variant: '',
		targetBlank: false,
	};

	constructor() {
	}
	ngOnInit(): void {
		if (this.items && !Array.isArray(this.items)) {
			this.items = [this.items]; // Wrap the object in an array
		}
	}
	// Method to check if bgColor is white in HEX or RGB format
	isWhiteBgColor(): boolean {
		if (!this.bgColor) return true; // If bgColor is not set, consider it as white
		const normalizedColor = this.bgColor.trim().toLowerCase();
		return (
			normalizedColor === '#ffffff' ||
			normalizedColor === 'rgb(255, 255, 255)' ||
			normalizedColor === 'rgba(255, 255, 255, 1)'
		);
	}
}

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-table-widget-2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-widget-2.component.html',
  styleUrl: './table-widget-2.component.scss'
})
export class TableWidget2Component {
  @Input() sectionTitle: string = '';
	@Input() tableArray: {
		header: string,
		alternatingColor: boolean,
		tableRows: {
			rowColspan: boolean,
			columns: {
				columnValue: string
			}[]
		}[]
	}[] = [];
	@Input() sectionDescription: string = '';
	@Input() buttonStyle: any = {
		text: '',
		url: '/',
		variant: '',
		targetBlank: false,
	};
	@Input() licenseRegistration: any = {
		titleText: '',
		licenseItems: [
			{
				pdfFileUrl: '',
				pdfFileTargetBlank: false,
				thumbImage: '',
				thumbImageAlt: '',
			},
		],
		licenseBottomDescription: '',
	};

	constructor(
		@Inject(PLATFORM_ID) private platformId: object
	) {
	}
	ngOnInit(): void {
	}
	isDescriptionEmpty(description: string): boolean {
		if (!description) {
			return true; // If the description is null or undefined, it's empty
		}

		if(isPlatformBrowser(this.platformId)){
			// Parse the description as HTML and strip out tags
			const parser = new DOMParser();
			const doc = parser.parseFromString(description, 'text/html');
			const textContent = doc.body.textContent?.trim();

			// Return true if no meaningful text content is found
			return !textContent;
		}
		return true;
	}
}

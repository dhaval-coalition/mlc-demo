import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-table-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-widget.component.html',
  styleUrl: './table-widget.component.scss'
})
export class TableWidgetComponent {
  @Input() bgColor: string = '';
	@Input() sectionTitle: string = '';
	@Input() alignCenter: boolean = false;
	@Input() textSmall: boolean = false;
	@Input() alternateBgChange: boolean = false;
	@Input() tableHeaders: {
		header: string
	}[] = [];
	@Input() tableRows: {
		fixedBGColor: boolean;
		columns: {
			columnValue: string,
		}[]
	}[] = [];
	@Input() sectionDescription: string = '';
	@Input() sectionLargeDescription: string = '';
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
		@Inject(PLATFORM_ID) private platformId: Object
	) {
	}
	ngOnInit(): void {
	}
	isDescriptionEmpty(description: string): boolean {
		if (!description) {
			return true; // If the description is null or undefined, it's empty
		}

		if (isPlatformBrowser(this.platformId)) {
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

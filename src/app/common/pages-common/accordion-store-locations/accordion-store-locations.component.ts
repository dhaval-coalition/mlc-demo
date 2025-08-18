import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-accordion-store-locations',
  standalone: true,
  imports: [CommonModule, NgbAccordionModule],
  templateUrl: './accordion-store-locations.component.html',
  styleUrl: './accordion-store-locations.component.scss'
})
export class AccordionStoreLocationsComponent {
  @Input() sectionTitle: string = '';
	@Input() store: {
		storeQue: string,
		storeHoursSettingObject: {
			contentTitle1: string,
			storeHours: {
				storeHoursWeek: string,
				storeHoursTime: string
			}[]
		},
		locationSettingObject: {
			contentTitle2: string,
			storeAddress: string,
			buttonStyle: {
				text: string,
				url: string,
				variant: string,
				targetBlank: false,
			}
		},
		mapSettingObject: {
			mapEmbedCode: string,
		},
	}[] = [];

	constructor(private sanitizer: DomSanitizer) { }
	ngOnInit(): void {
	}
	sanitizeHtml(html: string): SafeHtml {
		return this.sanitizer.bypassSecurityTrustHtml(html);
	}
}

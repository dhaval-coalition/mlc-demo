import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loans-hero-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loans-hero-banner.component.html',
  styleUrl: './loans-hero-banner.component.scss'
})
export class LoansHeroBannerComponent {
  statesList: any[] = [];

	@Input() bgColor = '';
	@Input() sectionTitle = '';
	@Input() sectionDescription = '';
	@Input() loansHeroThumb = '';
	@Input() loansHeroThumbAlt = '';
	@Input() heroFormFields = true;
	@Input() buttonStyle: any = {
		text: '',
		url: '/',
		variant: '',
		width: '',
		targetBlank: false,
	}

	constructor(
    // private locationsDataService: LocationsDataService
  ) {
	}
	ngOnInit(): void {
		// this.locationsDataService.getStates().subscribe((response: any) => {
		// 	if (response.results && response.results.length > 0 && response.results[0].data.states) {
		// 		this.statesList = response.results[0].data.states;
		// 	}
		// });
	}
	updateButtonUrl(event: Event): void {
		const selectElement = event.target as HTMLSelectElement;
		const selectedOption = selectElement.options[selectElement.selectedIndex];
		const locationUrl = selectedOption.getAttribute('location-url'); // Get the 'location-url' attribute
		this.buttonStyle.url = locationUrl ? locationUrl : '/locations'; // Update the button URL
	}
}

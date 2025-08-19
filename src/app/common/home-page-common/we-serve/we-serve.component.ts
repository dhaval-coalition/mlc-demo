import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { LocationsDataService } from '../../../shared/services/locations-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-we-serve',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './we-serve.component.html',
  styleUrl: './we-serve.component.scss',
	encapsulation: ViewEncapsulation.None
})
export class WeServeComponent {
	statesList: any[] = [];
	locationGuideList: any[] = [];

	@Input() locationType: any = {
		name: 'All Locations'
	};
	@Input() hideLabel = false;
	@Input() sectionTitle = '';
	@Input() itemDescription = '';
	@Input() buttonStyle: any = {
		text: '',
		url: '/',
		variant: 'primary',
		targetBlank: false,
	};

	constructor(
		private getLocationsDataService: LocationsDataService,
		private router: Router
	) { }
	ngOnInit(): void {
		this.getLocationsDataService.getAllLocationType().subscribe({
			next: data => {
				const selectedType = (this.locationType?.Type || 'All Locations').toLowerCase();

				// Dynamically filter based on the selected type with case-insensitive comparison
				let filteredResults = data.results.filter((item: any) =>
					item.name.toLowerCase() === selectedType
				);

				// Fallback to "All Locations" if no matches found
				if (filteredResults.length === 0) {
					filteredResults = data.results.filter((item: any) =>
						item.name.toLowerCase() === 'all locations'
					);
				}

				this.statesList = filteredResults.map((item: any) =>
					item.data.states.map((stateEachItem: any) => {
						return {
							url: stateEachItem.url,
							name: stateEachItem.name,
							thumbnail: stateEachItem.thumbnail,
							thumbnailAlt: stateEachItem.thumbnailAlt,
						};
					})
				).flat();

				this.locationGuideList = filteredResults.map((guideItem: any) =>
					guideItem.data.locationType.map((typeItems: any) => ({
						icon: typeItems.typeIcon,
						iconAlt: typeItems.iconAlt,
						bgColor: typeItems.typeBackgroundColor,
						title: typeItems.typeName,
					}))
				).flat();
			}
		});
	}
	goToState(stateUrl: string) {
		if (stateUrl.startsWith('/locations')) {
			this.router.navigate([stateUrl]);
		} else {
			this.router.navigate([`/locations/${stateUrl}`]);
		}
	}
}

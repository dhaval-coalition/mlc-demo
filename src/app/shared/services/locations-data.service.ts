import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class LocationsDataService {
	private apiUrl = environment.apiUrl;
	private apiKey = environment.builderAPI;
	private modelName = 'locations-data';

	constructor(private http: HttpClient) { }

	// Fetch all states from Builder.io
	getAllLocationType(): Observable<any> {
		const cacheBuster = `?t=${new Date().getTime()}`;
		const url = `${this.apiUrl}${this.modelName}?apiKey=${this.apiKey}&limit=100${cacheBuster}`;
		return this.http.get(url);
	}

	// Fetch all states from Builder.io
	getStates(): Observable<any> {
		const cacheBuster = `?t=${new Date().getTime()}`;
		const url = `${this.apiUrl}${this.modelName}?apiKey=${this.apiKey}&limit=100${cacheBuster}`;
		// return this.http.get(url);
		return this.http.get<any>(url).pipe(
			map(response => {
				// Filter the data to return only 'All Locations'
				return {
					...response,
					results: response.results.filter((item: any) =>
						item.name.toLowerCase() === 'all locations'
					)
				};
			})
		);
	}

	// Fetch location data by slug
	getLocationDataBySlug(slug: string): Observable<any> {
		const url = `${this.apiUrl}${this.modelName}?apiKey=${this.apiKey}`;

		return this.http.get(url).pipe(
			map((response: any) => {
				if (response && response.results && response.results.length > 0) {
					// Filter the location data based on the slug
					// const location = response.results[0].data.states.find((state: any) => state.url === `/${slug}/`);

					// Check for both `/${slug}` and `/${slug}/`
					const location = response.results[0].data.states.find((state: any) =>
						state.url === `/${slug}` || state.url === `/${slug}/`
					);
					if (location) {
						return location; // Return the matched location data
					} else {
						return `${slug}`;
					}
				}
				throw new Error('Location not found');
			}),
			catchError(error => {
				return throwError(error);
			})
		);
	}
}
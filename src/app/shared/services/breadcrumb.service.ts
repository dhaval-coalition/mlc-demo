import { Injectable } from '@angular/core';
import { BreadcrumbService as XngBreadcrumbService } from 'xng-breadcrumb';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class BreadcrumbService {
	private apiUrl = environment.apiUrl;
	private apiKey = environment.builderAPI;
	private modelName = 'pages';
	private modelBlogs = 'blogs';

	constructor(
		private breadcrumbService: XngBreadcrumbService,
		private http: HttpClient,
		private router: Router
	) { }

	private sanitizeBreadcrumbLabel(label: string): string {
		if (!label) {
			return label; // Return as is if label is null or undefined
		}

		// Remove leading/trailing spaces
		label = label.trim();

		// Remove trailing slash if present
		if (label.endsWith('/')) {
			label = label.slice(0, -1);
		}

		// Replace hyphens with spaces
		label = label.replace(/-/g, ' ');

		return label;
	}

	/**
	 * Set a breadcrumb dynamically, sanitizing the label to remove trailing slashes
	 */
	setBreadcrumb(alias: string, label: string): void {
		const sanitizedLabel = this.sanitizeBreadcrumbLabel(label); // Clean up label
		this.breadcrumbService.set(alias, sanitizedLabel);
	}

	/**
	 * Check if the current URL is exactly `/blog` or `/blog/`
	 */
	private isBlogBaseUrl(url: string): boolean {
		return url === '/blog' || url === '/blog/';
	}

	/**
	 * Fetch and set breadcrumb title from the API
	 */
	fetchAndSetBreadcrumb(alias: string): void {
		const currentUrl = this.router.url;

		// Determine the correct model based on whether it's the blog base URL
		const APIModelName = this.isBlogBaseUrl(currentUrl)
			? this.modelBlogs // Use 'blogs' for '/blog' or '/blog/'
			: this.modelName; // Use 'pages' for all other routes

		const fullApiUrl = `${this.apiUrl}${APIModelName}?apiKey=${this.apiKey}&url=${currentUrl}`;

		this.http.get(fullApiUrl).subscribe(
			(response: any) => {
				const results = response.results;
				if (results && results.length > 0 && results[0].data && results[0].data.title) {
					const title = results[0].data.title; // Extract title
					const sanitizedTitle = this.sanitizeBreadcrumbLabel(title); // Sanitize API title
					this.setBreadcrumb(alias, sanitizedTitle); // Set breadcrumb
				} else {
					this.setBreadcrumb(alias, 'Page Not Found'); // Fallback title
				}
			},
			(error) => {
				this.setBreadcrumb(alias, 'Error'); // Fallback for API error
			}
		);
	}
}
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class SnippetsService {
	private apiUrl = environment.apiUrl;
	private apiKey = environment.builderAPI;
	private modelHeadSnippet = 'snippet-code-for-head';
	private modelFooterSnippet = 'snippet-code-for-footer';
	private modelBodySnippet = 'snippet-code-for-body'; // New model for body

	constructor(
		private http: HttpClient,
		private router: Router,
		@Inject(PLATFORM_ID) private platformId: Object
	) {
		if (isPlatformBrowser(this.platformId)) {
			// Fetch all snippets on application load
			this.fetchAndInjectHeadSnippet();
			this.fetchAndInjectBodySnippet();
			this.fetchAndInjectFooterSnippet();
		}

		// Fetch all snippets on every route change
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.fetchAndInjectHeadSnippet();
				this.fetchAndInjectBodySnippet();
				this.fetchAndInjectFooterSnippet();
			}
		});
	}

	/**
	 * Fetch and inject head snippets
	 */
	fetchAndInjectHeadSnippet(): void {
		this.fetchSnippet(this.modelHeadSnippet, 'dynamic-head-snippet', 'head');
	}

	/**
	 * Fetch and inject body snippets
	 */
	fetchAndInjectBodySnippet(): void {
		this.fetchSnippet(this.modelBodySnippet, 'dynamic-body-snippet', 'body');
	}

	/**
	 * Fetch and inject footer snippets
	 */
	fetchAndInjectFooterSnippet(): void {
		this.fetchSnippet(this.modelFooterSnippet, 'dynamic-footer-snippet', 'footer');
	}

	/**
	 * Generic function to fetch and inject snippets (head, body, or footer)
	 */
	private fetchSnippet(modelName: string, elementId: string, targetTag: 'head' | 'body' | 'footer'): void {
		const snippetApiUrl = `${this.apiUrl}${modelName}?apiKey=${this.apiKey}`;

		this.http.get(snippetApiUrl).pipe(
			map((response: any) => {
				if (response?.results?.length > 0) {
					const snippetCode = response.results[0]?.data?.blocks[0]?.component?.options?.code || '';
					return snippetCode;
				} else {
					return ''; // No snippet found
				}
			}),
			catchError((error) => {
				return throwError(error);
			})
		).subscribe((snippetCode: string) => {
			if (isPlatformBrowser(this.platformId)) {
				this.injectSnippet(snippetCode, elementId, targetTag);
			}
		});
	}

	/**
	 * Inject snippet into a specified target (head, body, or footer)
	 */
	private injectSnippet(snippetCode: string, elementId: string, targetTag: 'head' | 'body' | 'footer'): void {
		if (!snippetCode) {
			return; // Exit if there's no snippet to inject
		}

		// Wait until the target element (head, body, footer) is available in the DOM
		const checkInterval = setInterval(() => {
			const targetElement = document.querySelector(targetTag);
			if (targetElement) {
				clearInterval(checkInterval); // Stop checking once target is available

				// Remove existing snippet to avoid duplication
				const existingSnippet = document.querySelector(`#${elementId}`);
				if (existingSnippet) {
					existingSnippet.remove();
				}

				// Create and append new snippet
				const snippetElement = document.createElement('div');
				snippetElement.id = elementId;
				snippetElement.innerHTML = snippetCode;

				targetElement.appendChild(snippetElement);

				// Execute scripts inside the snippet
				this.executeInjectedScripts(snippetElement);
			}
		}, 100); // Check every 100ms

		setTimeout(() => {
			clearInterval(checkInterval); // Stop trying after 5 seconds
		}, 5000);
	}

	/**
	 * Execute all scripts inside the injected snippet
	 */
	private executeInjectedScripts(snippetElement: HTMLElement): void {
		const scripts = snippetElement.getElementsByTagName('script');

		for (let i = 0; i < scripts.length; i++) {
			const script = scripts[i];
			const newScript = document.createElement('script');

			if (script.src) {
				newScript.src = script.src;
				newScript.async = true;
			} else {
				newScript.textContent = script.textContent;
			}

			setTimeout(() => {
				document.body.appendChild(newScript);
				document.body.removeChild(newScript);
			}, 500);
		}
	}
}

import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { CommonModule, isPlatformServer } from '@angular/common';
import { customComponents } from './common/builder-registry';
import { BuilderContent, Content, fetchOneEntry } from '@builder.io/sdk-angular';
import { firstValueFrom } from 'rxjs';
import { SnippetsService } from './shared/services/snippets.service';
import { BodyClassService } from './shared/services/body-class.service';
import { UrlRedirectsService } from './shared/services/url-redirects.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule,
    Content
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  apiKey = environment.builderAPI;
  modelHeader = 'header';
  modelFooter = 'footer';
  contentHeader: BuilderContent | null = null;
  contentFooter: BuilderContent | null = null;
  customComponents = customComponents;
  private http = inject(HttpClient);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private snippetsService: SnippetsService,
    private bodyClassService: BodyClassService,
    private urlRedirectsService: UrlRedirectsService,
  ) {}

  async ngOnInit() {
    // Subscribe to router events to detect navigation changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Update the body class whenever the route changes
        this.updateBodyClass(this.router.url);
      }
    });

    this.snippetsService.fetchAndInjectHeadSnippet();

    // Fetch redirects asynchronously without blocking page rendering
    Promise.resolve().then(() => {
      this.urlRedirectsService.fetchRedirects();
    });

    // Use Angular router instead of window.location for SSR compatibility
    const urlPath = this.router.url.split('?')[0] || "/";

    // Fetch header content
    const builderContentHeader = await fetchOneEntry({
      model: this.modelHeader,
      apiKey: this.apiKey,
      userAttributes: { urlPath },
      fetch: this._httpClientFetch,
    });

    // Fetch footer content
    const builderContentFooter = await fetchOneEntry({
      model: this.modelFooter,
      apiKey: this.apiKey,
      userAttributes: { urlPath },
      fetch: this._httpClientFetch,
    });

    if (builderContentHeader) {
      this.contentHeader = builderContentHeader;
    }

    if (builderContentFooter) {
      this.contentFooter = builderContentFooter;
    }
  }

  // Custom fetch function that uses Angular's HttpClient for SSR compatibility
  private _httpClientFetch = async (url: string, options?: any) => {
    return firstValueFrom(
      this.http.request<any>(options?.method || 'GET', url, {
        body: options?.body,
        headers: options?.headers as any,
        ...options,
        observe: 'response',
        responseType: 'json',
      })
    ).then((response: any) => {
      return {
        ok: response.status >= 200 && response.status < 300,
        status: response.status,
        json: () => Promise.resolve(response.body),
      };
    });
  };

  // SSR-safe URL detection with multiple fallbacks
  getUrlPath(): string {
    if (isPlatformServer(this.platformId)) {
      // On server, try Router service with fallback
      try {
        if (this.router?.url) {
          return this.router.url.split('?')[0];
        }
        
        // Fallback: default to root for SSR
        return "/";
      } catch (error) {
        return "/";
      }
    } else {
      // On client, use router or window.location
      try {
        if (this.router?.url) {
          return this.router.url.split('?')[0];
        }
        
        if (typeof window !== 'undefined' && window.location) {
          return window.location.pathname;
        }
        
        return "/";
      } catch (error) {
        return "/";
      }
    }
  }
  

  updateBodyClass(url: string) {
		// Define body classes for routes and patterns
		const pageClasses = [
			{ pattern: /^\/$/, className: 'home-page' },
			{ pattern: /^\/about\/?$/, className: 'aboutUs-page' },
			{ pattern: /^\/loans\/?$/, className: 'loans-page' },
			{ pattern: /^\/contact\/?$/, className: 'contact-page' },
			{ pattern: /^\/locations\/?$/, className: 'locations-page' },
			{ pattern: /^\/locations\/[^/]+$/, className: 'single-locations-page' },
			{ pattern: /^\/locations\/[^/]+\/$/, className: 'single-locations-page' }, // New class for URLs with a trailing slash
			{ pattern: /^\/blog(\/.*)?$/, className: 'blog-page' },
			{ pattern: /^\/installment-loans\/?$/, className: 'installment-loans-page' },
			{ pattern: /^\/line-of-credit\/?$/, className: 'line-of-credit-page' }, // it's working for both /line-of-credit and /line-of-credit/
			// Match URLs with trailing slashes (like /locations/delaware-personal-loans/)
		];

		// Find a matching class based on the pattern
		const matchedClass = pageClasses.find((entry) => entry.pattern.test(url))?.className;
		const bodyClass = matchedClass || 'default-page';

		// Set the body class
		this.bodyClassService.setBodyClass(bodyClass);
	}
}

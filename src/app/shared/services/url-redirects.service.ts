import { isPlatformServer } from "@angular/common";
import { environment } from "../../../environments/environment";
import { BuilderContent, isPreviewing } from "@builder.io/sdk-angular";
import { Inject, Injectable, Input, Optional, PLATFORM_ID } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UrlRedirectsService {
  isPreviewing = isPreviewing();
  @Input() modelUrlRedirects = 'url-redirects';
  apiKey = environment.builderAPI;
  contentUrlRedirects: BuilderContent[] = []; // Store multiple results
  currentUrlPath = "";
  isLoading = true;
  private limit = 100; // Number of items to fetch per request (increase if needed)
  private offset = 0; // Start at the beginning

  constructor(
    private http: HttpClient,
    @Optional() private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  // Fetch and handle redirects with pagination
  public async fetchRedirects() {
    try {
      // Wait for Router to initialize on the client side
      if (!isPlatformServer(this.platformId) && !this.router) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Use SSR-safe URL detection
      this.currentUrlPath = this.getUrlPath();

      // Create a fetch function that works with or without HttpClient
      const customFetch = async (url: string, options?: any) => {
        try {
          if (this.http) {
            // Use Angular HttpClient if available
            const response = await firstValueFrom(
              this.http.request<any>(options?.method || 'GET', url, {
                body: options?.body,
                headers: options?.headers as any,
                ...options,
                observe: 'response',
                responseType: 'json',
              })
            ) as any;

            return {
              ok: response.status >= 200 && response.status < 300,
              status: response.status,
              json: () => Promise.resolve(response.body),
            };
          } else {
            // Fallback to native fetch if HttpClient is not available
            const response = await fetch(url, {
              method: options?.method || 'GET',
              headers: options?.headers,
              body: options?.body,
              ...options,
            });

            const data = await response.json();

            return {
              ok: response.ok,
              status: response.status,
              json: () => Promise.resolve(data),
            };
          }
        } catch (error) {
          console.error("Error in fetching redirects:", error);
          throw error;
        }
      };

      // Start iterating over pages of redirects
      this.offset = 0;
      this.contentUrlRedirects = []; // Clear any old data
      let hasMoreData = true;
      while (hasMoreData) {
        // Build the URL with pagination parameters
        const url = `${environment.apiUrl}url-redirects?apiKey=${this.apiKey}&limit=${this.limit}&offset=${this.offset}`;

        // Fetch data for this page
        const builderResultContent = await customFetch(url, { method: 'GET' });

        if (builderResultContent && builderResultContent.json) {
          const data = await builderResultContent.json();

          if (data.results && data.results.length > 0) {
            // Deduplicate and add the new redirects to the existing list
            this.contentUrlRedirects = [
              ...this.contentUrlRedirects,
              ...data.results.filter(
                (redirect: BuilderContent) => // Explicit type annotation for redirect
                  !this.contentUrlRedirects.some(
                    (existingRedirect: BuilderContent) => // Explicit type annotation for existingRedirect
                      existingRedirect.data && existingRedirect.data['sourceUrl'] === redirect.data?.['sourceUrl']
                  )
              ),
            ];
            this.offset += this.limit; // Increment the offset for the next batch
          }

          // Check if more results are available
          hasMoreData = data.results.length === this.limit;
        } else {
          // No data returned, stop fetching
          hasMoreData = false;
        }
      }

      // After all pages are fetched, perform redirection
      this.redirectToDestinationUrl();

    } catch (error) {
      console.error('Error in fetching redirects:', error);
    } finally {
      this.isLoading = false;
    }
  }


  private redirectToDestinationUrl() {
    // Normalize the current URL (remove leading and trailing slashes)
    const normalizedUrl = this.normalizeUrl(this.currentUrlPath);

    // Find a matching redirect based on current URL
    const matchingRedirect = this.contentUrlRedirects.find(redirect =>
      redirect.data && redirect.data['sourceUrl'] && this.normalizeUrl(redirect.data['sourceUrl']) === normalizedUrl
    );

    if (matchingRedirect && matchingRedirect.data) {
      const destinationUrl = matchingRedirect.data['destinationUrl'];

      if (!destinationUrl) {
        console.log(`Destination URL is missing for redirect: ${this.currentUrlPath}`);
        return; // Avoid performing a redirect if there's no destination URL
      }

      // Perform the redirect using Angular's Router or window.location
      if (this.router) {
        this.router.navigateByUrl(destinationUrl);  // Angular Router redirection
      } else {
        window.location.href = destinationUrl; // Fallback to native redirection if router is not available
      }
    }
  }

  // Helper function to normalize URLs
  private normalizeUrl(url: string): string {
    return url.replace(/\/+$/, ''); // Remove trailing slashes
  }


  // SSR-safe URL detection with multiple fallbacks
  private getUrlPath(): string {
    if (isPlatformServer(this.platformId)) {
      // On the server-side, use the Angular Router to get the current path
      try {
        if (this.router?.url) {
          return this.router.url.split('?')[0];  // Clean the URL, removing query parameters
        }
        return "/";
      } catch (error) {
        console.error('Error on SSR:', error);
        return "/";
      }
    } else {
      // On the client-side, use window.location.pathname to get the current path
      try {
        if (typeof window !== 'undefined' && window.location) {
          return window.location.pathname;  // Use window's pathname
        }
        return "/";
      } catch (error) {
        console.error('Error on Client-side:', error);
        return "/";
      }
    }
  }


}

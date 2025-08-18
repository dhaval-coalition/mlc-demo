import { Component, Inject, Input, OnInit, PLATFORM_ID, Optional, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Content, BuilderContent, fetchOneEntry, getBuilderSearchParams, isPreviewing } from '@builder.io/sdk-angular';
import { filter } from 'rxjs/operators';
import { customComponents } from '../../../common/builder-registry';
import { environment } from '../../../../environments/environment';
import { SeoService } from '../../../shared/services/seo.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

// Optional: set 404 on SSR responses (Angular Universal)
// import type { Response } from 'express';
// import { RESPONSE } from '@nguniversal/express-engine/tokens';

@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  imports: [CommonModule, Content],
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.scss'],
  host: {
    'ngSkipHydration': 'true'
  }
})
export class DynamicPageComponent implements OnInit {
  isPreviewing = isPreviewing();
  @Input() model = 'pages';         // your Builder model name
  apiKey = environment.builderAPI;
  content: BuilderContent | null = null;
  customComponents = customComponents;
  currentUrlPath = "";
  isLoading = true;

  constructor(
    private http: HttpClient,
    @Optional() private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // SSR-safe URL detection with multiple fallbacks
  private getUrlPath(): string {
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

  async ngOnInit() {
    try {
      // On client side, wait a bit for Router to be fully initialized
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
          throw error;
        }
      };

      const builderContent = await fetchOneEntry({
        model: this.model,
        apiKey: this.apiKey,
        userAttributes: {
          urlPath: this.currentUrlPath,
        },
        // Use fallback fetch function
        fetch: customFetch,
      });
      
      if (!builderContent) {
        // No content found for this URL path
      } else {
        this.content = builderContent;
      }
      
    } catch (error) {
      // Handle any errors silently in production
    } finally {
      this.isLoading = false;
    }
  }
}

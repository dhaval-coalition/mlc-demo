import { CommonModule, isPlatformServer } from '@angular/common';
import { SeoService } from '../../../shared/services/seo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, Optional, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { BuilderContent, Content, fetchOneEntry, isPreviewing } from '@builder.io/sdk-angular';
import { customComponents } from '../../../common/builder-registry';
import { NotFoundComponent } from '../../../common/not-found/not-found.component';

@Component({
  selector: 'app-single-location',
  standalone: true,
  imports: [CommonModule, Content, NotFoundComponent],
  templateUrl: './single-location.component.html',
  styleUrls: ['./single-location.component.scss'],
})
export class SingleLocationComponent{
  isPreviewing = isPreviewing();
  @Input() singleLocationModel = 'single-location';
  apiKey = environment.builderAPI;
  singleLocationContent: BuilderContent | null = null;
  customComponents = customComponents;
  currentUrlPath = "";
  isLoading = true;

  constructor(
    private http: HttpClient,
    private seoService: SeoService,
    @Optional() private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    // Apply SEO metadata dynamically using SeoService
    this.seoService.applyPageMetadata();

    try {
      // On client side, wait a bit for Router to be fully initialized
      if (!isPlatformServer(this.platformId) && !this.router) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Use improved URL detection that includes the slug parameter
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

      const builderPageContent = await fetchOneEntry({
        model: this.singleLocationModel,
        apiKey: this.apiKey,
        userAttributes: {
          urlPath: this.currentUrlPath,
        },
        fetch: customFetch,
      });

      if (builderPageContent) {
        this.singleLocationContent = builderPageContent;
      }

    } catch (error) {
      // Handle any errors silently in production
    } finally {
      this.isLoading = false;
    }
  }

  // Improved SSR-safe URL detection that properly handles route parameters
  private getUrlPath(): string {
    if (isPlatformServer(this.platformId)) {
      // On server, try to get the URL from the route parameters first
      try {
        const slug = this.route.snapshot.paramMap.get('slug');
        if (slug) {
          // Handle both formats: /locations/slug and /locations/slug-personal-loans
          return `/locations/${slug}`;
        }
        
        // Fallback to router URL if available
        if (this.router?.url) {
          return this.router.url.split('?')[0];
        }
        
        // Last fallback: default to root for SSR
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
}

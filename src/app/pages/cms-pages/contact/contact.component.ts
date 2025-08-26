import { CommonModule, isPlatformServer} from '@angular/common';
import { Component, Inject, Input, Optional, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SeoService } from '../../../shared/services/seo.service';
import { BuilderContent, Content, fetchOneEntry, isPreviewing } from '@builder.io/sdk-angular';
import { environment } from '../../../../environments/environment';
import { customComponents } from '../../../common/builder-registry';
import { firstValueFrom } from 'rxjs';
import { FilloutFormComponent } from '../../../common/fillout-form/fillout-form.component';
import { NotFoundComponent } from '../../../common/not-found/not-found.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, Content, FilloutFormComponent, NotFoundComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  isPreviewing = isPreviewing();
  @Input() modelTop = 'pages';
  @Input() modelBottom = 'contact-bottom-content';
  apiKey = environment.builderAPI;
  contentTop: BuilderContent | null = null;
  contentBottom: BuilderContent | null = null;
  customComponents = customComponents;
  currentUrlPath = "";
  isLoading = true;

  constructor(
    private http: HttpClient,
    @Optional() private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private seoService: SeoService
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
    // Apply SEO metadata dynamically using SeoService
    this.seoService.applyPageMetadata();

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

      // Fetch content for both models (top and bottom)
      const builderContentTop = await fetchOneEntry({
        model: this.modelTop,
        apiKey: this.apiKey,
        userAttributes: {
          urlPath: this.currentUrlPath,
        },
        fetch: customFetch,
      });

      if (builderContentTop) {
        this.contentTop = builderContentTop;
      }

      const builderContentBottom = await fetchOneEntry({
        model: this.modelBottom,
        apiKey: this.apiKey,
        userAttributes: {
          urlPath: this.currentUrlPath,
        },
        fetch: customFetch,
      });

      if (builderContentBottom) {
        this.contentBottom = builderContentBottom;
      }

    } catch (error) {
      // Handle any errors silently in production
    } finally {
      this.isLoading = false;
    }
  }
}

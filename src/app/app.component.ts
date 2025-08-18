import { Component, OnInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { customComponents } from './common/builder-registry';
import { BuilderContent, Content, fetchOneEntry } from '@builder.io/sdk-angular';
import { firstValueFrom } from 'rxjs';

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
  modelHeader = 'header'; // Builder model name for the header
  modelFooter = 'footer'; // Builder model name for the footer
  contentHeader: BuilderContent | null = null;
  contentFooter: BuilderContent | null = null;
  customComponents = customComponents; // Ensure this is initialized here
  private http = inject(HttpClient);

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngOnInit() {
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
}

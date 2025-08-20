import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { BuilderContent, fetchOneEntry, isPreviewing } from '@builder.io/sdk-angular';
import { customComponents } from '../common/builder-registry';
import { environment } from '../../environments/environment';
import { SeoService } from './services/seo.service';

@Injectable({ providedIn: 'root' })

export abstract class BuilderPageContentBase {
  isPreviewing = isPreviewing();
  model: string = 'pages'; // Default model value

  apiKey = environment.builderAPI;
  content: BuilderContent | null = null;
  customComponents = customComponents;
  currentUrlPath = '';
  isLoading = true;

  constructor(
    protected http: HttpClient,
    @Optional() protected router: Router,
    @Inject(PLATFORM_ID) protected platformId: Object,
    protected seoService: SeoService
  ) {}

  protected getUrlPath(): string {
    if (isPlatformServer(this.platformId)) {
      try {
        if (this.router?.url) return this.router.url.split('?')[0];
        return '/';
      } catch {
        return '/';
      }
    } else {
      try {
        if (this.router?.url) return this.router.url.split('?')[0];
        if (typeof window !== 'undefined' && window.location) return window.location.pathname;
        return '/';
      } catch {
        return '/';
      }
    }
  }

  protected async customFetch(url: string, options?: any) {
    if (this.http) {
      const resp = await firstValueFrom(
        this.http.request<any>(options?.method || 'GET', url, {
          body: options?.body,
          headers: options?.headers as any,
          ...options,
          observe: 'response',
          responseType: 'json',
        })
      ) as any;

      return {
        ok: resp.status >= 200 && resp.status < 300,
        status: resp.status,
        json: () => Promise.resolve(resp.body),
      };
    } else {
      const response = await fetch(url, {
        method: options?.method || 'GET',
        headers: options?.headers,
        body: options?.body,
        ...options,
      });
      const data = await response.json();
      return {
        ok: (response as any).ok,
        status: (response as any).status,
        json: () => Promise.resolve(data),
      };
    }
  }

  abstract ngOnInit(): Promise<void>;

  protected async initPage(): Promise<void> {
    this.seoService.applyPageMetadata();

    try {
      if (!isPlatformServer(this.platformId) && !this.router) {
        await new Promise(r => setTimeout(r, 100));
      }

      this.currentUrlPath = this.getUrlPath();

      const builderContent = await fetchOneEntry({
        model: this.model,
        apiKey: this.apiKey,
        userAttributes: { urlPath: this.currentUrlPath },
        fetch: (url: string, options?: any) => this.customFetch(url, options),
      });

      this.content = builderContent || null;
    } finally {
      this.isLoading = false;
    }
  }
}

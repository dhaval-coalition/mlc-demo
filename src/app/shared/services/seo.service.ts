import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';  // Import Angular services for title and meta tags
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { fetchOneEntry } from '@builder.io/sdk-angular';  // Correct import for fetchOneEntry
import { SEO_CONFIG } from '../seo.config';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private apiKey = environment.builderAPI;  // Get the API key from the environment variables

  // Define different models for different pages
  private modelSingleLocationName = 'single-location';  // Single Location model
  private modelBlogs = 'blogs';  // Blog listing model
  private modelBlogPost = 'blog-post';  // Individual Blog Post model
  private modelPage = 'pages';  // Generic page model (used for homepage and others)
  private http = inject(HttpClient);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private title: Title, 
    private meta: Meta, 
    private router: Router,
    @Inject(DOCUMENT) private dom: Document
  ) {}
  

  // Method to update the page title
  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  // Method to update the meta description
  updateDescription(description: string) {
    this.meta.updateTag({ name: 'description', content: description });
  }

  updateCanonicalLink(url: string): void {
    const head = this.dom.getElementsByTagName('head')[0]; // Get the head element
    let link: HTMLLinkElement | null = this.dom.querySelector(`link[rel='canonical']`);

    // Prepend domain URL from environment to create the full canonical URL
    const canonicalUrl = `${environment.siteUrl}${url}`;
    
    if (!link) {
      // If the canonical link tag doesn't exist, create a new one
      link = this.dom.createElement('link') as HTMLLinkElement;
      link.setAttribute('rel', 'canonical');
      head.appendChild(link); // Append the new link tag to the head
    }
    // Set the href attribute of the canonical link
    link.setAttribute('href', canonicalUrl);
  }

  // Method to apply SEO metadata based on the current route
  async fetchAndApplySeoMetadata(url: string): Promise<void> {
    let model = this.modelPage;
    let options: { query?: any; url?: string };

    // Determine model and options based on the URL
    if (url.match(/^\/locations\/[^\/]+\/?$/)) {
      model = this.modelSingleLocationName;
      options = { url: url };
    } else if (url === '/blog') {
      model = this.modelBlogs;
      options = { url: url };
    } else if (url.startsWith('/blog/')) {
      model = this.modelBlogPost;
      const slug = url.split('/blog/')[1];
      options = { query: { 'data.slug': slug } };
    } else {
      // Default for homepage or other pages
      options = { url: url };
    }

    // Try fetching the content and applying metadata
    try {
      const content = await fetchOneEntry({
        apiKey: this.apiKey,
        model: model,
        options: options,
        fetch: this._httpClientFetch,  // Custom fetch function used here
      });

      // If content is fetched, apply the metadata
      if (content && content.data) {
        const metaTitle = content.data['metatitle'] || SEO_CONFIG.defaultTitle;  // Fallback to default title
        const metaDescription = content.data['metadesc'] || SEO_CONFIG.defaultDescription;  // Fallback to default description
        const canonicalLink = content.data['url'] || SEO_CONFIG.defaultCanonical;  // Fallback to default canonical
        this.applySeoMetadata(metaTitle, metaDescription, canonicalLink);
      } else {
        // If no content found, apply default metadata
        this.applySeoMetadata(SEO_CONFIG.defaultTitle, SEO_CONFIG.defaultDescription, SEO_CONFIG.defaultCanonical);
      }
    } catch (error) {
      console.error(`Error fetching SEO data for ${url}:`, error);
      this.applySeoMetadata(SEO_CONFIG.defaultTitle, SEO_CONFIG.defaultDescription, SEO_CONFIG.defaultCanonical); // Apply defaults on error
    }
  }

  // Method to apply SEO metadata (title, description, robots, etc.)
  applySeoMetadata(title: string, description: string, canonical: string): void {
    this.updateTitle(title);
    this.updateDescription(description);
    this.updateCanonicalLink(canonical);
    
    // Log the applied SEO metadata
    // console.log(`SEO Applied: Title - ${title}, Description - ${description}`);

    // Apply robots meta tag from SEO_CONFIG
    this.meta.updateTag({ name: 'robots', content: SEO_CONFIG.defaultRobots });
  }

  // Method to apply SEO metadata based on the current route
  applyPageMetadata(): void {
    const currentPath = this.router.url;  // Get the current route path
    this.fetchAndApplySeoMetadata(currentPath);  // Fetch and apply the metadata
  }

  // Method to apply default SEO metadata
  applyDefaultMetadata() {
    this.applyMetadata({
      metatitle: SEO_CONFIG.defaultTitle,
      metadesc: SEO_CONFIG.defaultDescription,
      metacano: SEO_CONFIG.defaultCanonical,
      robots: SEO_CONFIG.defaultRobots,
    });
  }

  // Method to apply custom metadata to the page
  applyMetadata(data: any) {
    const title = data?.metatitle || SEO_CONFIG.defaultTitle;
    const description = data?.metadesc || SEO_CONFIG.defaultDescription;
    const canonical = data?.metacano || SEO_CONFIG.defaultCanonical;
    const robots = data?.robots || SEO_CONFIG.defaultRobots;

    this.updateTitle(title);
    this.updateDescription(description);
    this.updateCanonicalLink(canonical);
    this.meta.updateTag({ name: 'robots', content: robots });
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

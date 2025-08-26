import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, Input, Optional, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { BuilderContent, Content, fetchOneEntry, isPreviewing } from '@builder.io/sdk-angular';
import { environment } from '../../../../environments/environment';
import { customComponents } from '../../../common/builder-registry';
import { CarouselComponent, CarouselModule } from 'ngx-owl-carousel-o';
import { BlogService } from '../../../shared/services/blog.service';
import { SeoService } from '../../../shared/services/seo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { NotFoundComponent } from '../../../common/not-found/not-found.component';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, Content, CarouselModule, NotFoundComponent],
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class BlogDetailsComponent {
  isPreviewing = isPreviewing();
  @Input() blogDetailModel = 'blog-detail-hero-banner';
  apiKey = environment.builderAPI;
  blogDetailContent: BuilderContent | null = null;
  customComponents = customComponents;
  currentUrlPath = "";
  isLoading = true;

  @ViewChild('owlRelatedPostCarousel', { static: false }) owlRelatedPostCarousel!: CarouselComponent;
  blogPost: any;
	badge: string = '';
	relatedPosts: any[] = []; // Array to store related posts
	currentUrl: string = '';

  constructor(
    private http: HttpClient,
    @Optional() private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private seoService: SeoService,
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
		const slug = `/${this.route.snapshot.paramMap.get('slug')}/`;

		if (slug) {
			this.blogService.getBlogPostBySlug(slug).subscribe(response => {
				if (response && response.results && response.results.length > 0) {
					this.blogPost = response.results.find((post: any) => post.data.slug === slug).data; // Accessing .data directly
					const post = response.results.find((post: any) => post.data.slug === slug).data;
					this.blogPost = post; // Store blog post data
					this.badge = post.badge; // Access and store the badge

					// Set the breadcrumb title using the blog's title
					// this.breadcrumbService.set('@blogDetailsTitle', this.blogPost.title);

					// Fetch all blog posts and filter for related posts
					this.fetchRelatedPosts();

					if (isPlatformBrowser(this.platformId)) {
						this.currentUrl = window.location.href;
					}
				}
			});
		}
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
        model: this.blogDetailModel,
        apiKey: this.apiKey,
        userAttributes: {
          urlPath: this.currentUrlPath,
        },
        fetch: customFetch,
      });

      if (builderContentTop) {
        this.blogDetailContent = builderContentTop;
      }

    } catch (error) {
      // Handle any errors silently in production
    } finally {
      this.isLoading = false;
    }
	}
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
	fetchRelatedPosts(): void {
		// Fetch all blog posts and filter them based on the badge
		this.blogService.getRelatedBlogPosts().subscribe(response => {
			if (response && response.results) {

				// Filter posts that have the same badge, excluding the current post
				this.relatedPosts = response.results.filter((post: any) =>
					post.data.badge === this.badge && post.data.slug !== this.blogPost.slug
				).slice(0, 6);

				// Set loop to true only if there are more than 3 items
				this.postCarouselCustomOptions.loop = this.relatedPosts.length > 3;

				// Refresh carousel options to apply the updated loop setting
				if (this.owlRelatedPostCarousel && this.owlRelatedPostCarousel.options) {
					this.owlRelatedPostCarousel.options = { ...this.postCarouselCustomOptions };
				}
			}
		});
	}
	getEncodedURL(): string {
		if (isPlatformBrowser(this.platformId)) {
			return encodeURIComponent(this.currentUrl);
		}
		return '';
	}
	getEncodedTitle(): string {
		return encodeURIComponent(this.blogPost?.title || '');
	}
	printPage(): void {
		if (isPlatformBrowser(this.platformId)) {
			window.print();
		}
	}
	// Generate a URL-friendly slug and navigate to the post
	navigateToPost(post: any): void {
		const slug = this.generateSlug(post.data.slug);
		this.router.navigate(['/blog', slug]);
	}

	// Helper function to generate a URL-friendly slug
	generateSlug(slug: string): string {
		return slug
			.toLowerCase()
			.replace(/ /g, '-')
			.replace(/[^\w-]+/g, '');
	}

	postCarouselCustomOptions: any = {
		loop: true,
		mouseDrag: false,
		touchDrag: false,
		pullDrag: false,
		dots: false,
		nav: false,
		navSpeed: 700,
		responsive: {
			0: {
				items: 1
			},
			558: {
				items: 2
			},
			767: {
				items: 2
			},
			940: {
				items: 3
			}
		},
	}
	goPrev() {
		this.owlRelatedPostCarousel.prev();
	}
	goNext() {
		this.owlRelatedPostCarousel.next();
	}
  
	// Add this method to truncate the description
	truncateDescription(description: string, maxLength: number = 150): string {
	  if (!description) return '';
	  
	  // Remove HTML tags first
	  const plainText = description.replace(/<[^>]*>/g, '');
	  
	  if (plainText.length > maxLength) {
		return plainText.substring(0, maxLength);
	  }
	  return plainText;
	}
}

import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, Input, Optional, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { BuilderContent, Content, fetchOneEntry, isPreviewing } from '@builder.io/sdk-angular';
import { NotFoundComponent } from '../../../common/not-found/not-found.component';
import { environment } from '../../../../environments/environment';
import { customComponents } from '../../../common/builder-registry';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SeoService } from '../../../shared/services/seo.service';
import { debounceTime, firstValueFrom, Subject, Subscription } from 'rxjs';
import { BlogService } from '../../../shared/services/blog.service';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, Content, NotFoundComponent],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class BlogsComponent {
  isPreviewing = isPreviewing();
  @Input() blogTopModel = 'blog-top-content';
  @Input() blogListingModel = 'blogs';
  apiKey = environment.builderAPI;
  blogTopContent: BuilderContent | null = null;
  blogListingContent: BuilderContent | null = null;
  customComponents = customComponents;
  currentUrlPath = "";
  isLoading = true;
  
  blogPosts: any[] = [];
	filteredPosts: any[] = [];
	categories: any[] = ['All'];
	selectedCategory: string = 'All';
	searchQuery: string = '';

  // Pagination properties
	currentPage: number = 1;
	itemsPerPage: number = 9; // Number of items to display per page
	totalPages: number = 0;
	totalPosts: number = 0;
	paginatedPosts: any[] = [];
	pageNumbers: (number | string)[] = []; // This will store the visible page numbers (including ellipses)

  private masonryInstance: any;
	private resizeSubject = new Subject<void>();
	private resizeSubscription!: Subscription;

  constructor(
    private http: HttpClient,
    @Optional() private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private seoService: SeoService,
    private blogService: BlogService,
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
    // this.breadcrumbService.fetchAndSetBreadcrumb('@blogPageTitle');
    this.fetchBlogPosts();

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
        model: this.blogTopModel,
        apiKey: this.apiKey,
        userAttributes: {
          urlPath: this.currentUrlPath,
        },
        fetch: customFetch,
      });

      if (builderContentTop) {
        this.blogTopContent = builderContentTop;
      }

      const builderContentBottom = await fetchOneEntry({
        model: this.blogListingModel,
        apiKey: this.apiKey,
        userAttributes: {
          urlPath: this.currentUrlPath,
        },
        fetch: customFetch,
      });

      if (builderContentBottom) {
        this.blogListingContent = builderContentBottom;
      }

    } catch (error) {
      // Handle any errors silently in production
    } finally {
      this.isLoading = false;
    }
  }

  // Check if page is a number
	isPageNumber(page: any): boolean {
		return typeof page === 'number';
	}

	// Define delay as a class method
	private async delay(ms: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	fetchBlogPosts(): void {
		const limit = 100;  // Number of posts per request
		let offset = 0;     // Initial offset

		// Start fetching the first batch of posts using BlogService
		this.blogService.getAllBlogPosts(limit, offset).subscribe(
			(response: any) => {
				const allPosts = response.results || [];

				// without change to descending order
				// this.blogPosts = allPosts;

				// Sort posts by date in descending order
				this.blogPosts = allPosts.sort((a: any, b: any) => {
					const dateA = new Date(a.data.date).getTime();
					const dateB = new Date(b.data.date).getTime();
					return dateB - dateA; // Descending order
				});

				// Apply filtering immediately after fetching the posts
				this.applyFilters();

				// Extract unique categories (badges) from posts and update the categories list
				this.extractCategories(allPosts);

				// Fetch additional posts if any
				this.fetchAdditionalPosts(limit, allPosts.length);
			}
		);
	}

	ngAfterViewInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			const grid = document.querySelector('.blogPost-wrap') as HTMLElement | null;

			if (grid) {
				import('masonry-layout').then((MasonryModule) => {
					const Masonry = MasonryModule.default;

					this.masonryInstance = new Masonry(grid, {
						itemSelector: '.blogPost-items',
						columnWidth: '.blogPost-items',
						gutter: 24,
						fitWidth: true,
					});

					this.waitForImages(grid).then(() => {
						if (this.masonryInstance) {
							this.masonryInstance.layout();
						}
					});

					// Debounced resize handling
					this.resizeSubscription = this.resizeSubject.pipe(debounceTime(750)).subscribe(() => {
						this.masonryInstance.layout();
					});

					window.addEventListener('resize', () => {
						this.resizeSubject.next();
					});
				})
			}
		}
	}

	ngOnDestroy(): void {
		if (this.resizeSubscription) {
			this.resizeSubscription.unsubscribe();
		}
		if (this.masonryInstance) {
			this.masonryInstance.destroy();
		}
	}

	// Fetch additional posts based on pagination
	async fetchAdditionalPosts(limit: number, currentLength: number): Promise<void> {
		let offset = currentLength;  // Start the next offset at the current length

		const fetchBatch = async (offset: number) => {
			// Delay to prevent rate-limiting
			await this.delay(200);

			// Fetch additional posts using BlogService
			const response = await this.blogService.getAllBlogPosts(limit, offset).toPromise();
			const additionalPosts = response.results || [];

			// If there are more posts, append them to the list
			if (additionalPosts.length > 0) {
				this.blogPosts = [...this.blogPosts, ...additionalPosts];
			}

			// Sort all posts again by date (descending order)
			this.blogPosts.sort((a: any, b: any) => {
				const dateA = new Date(a.data.date).getTime();
				const dateB = new Date(b.data.date).getTime();
				return dateB - dateA;
			});

			// Apply filtering again after loading all posts
			this.applyFilters();

			// If fewer than the limit were returned, it means we've reached the end
			if (additionalPosts.length >= limit) {
				// Otherwise, fetch the next batch
				offset += limit;  // Update offset for the next batch
				await fetchBatch(offset); // Recursive call for the next batch
			}
		};

		// Start fetching from the current offset
		await fetchBatch(offset);
	}

	generateSlug(slug: string): string {
		return slug
			.toLowerCase()
			.trim()
			.replace(/ /g, '-')         // Replace spaces with hyphens
			.replace(/[^\w-]+/g, '')    // Remove invalid characters
			.replace(/^\/+|\/+$/g, ''); // Remove leading and trailing slashes
	}

	navigateToPost(post: any): void {
		// const slug = this.generateSlug(post.data.slug);
		// this.router.navigate(['/blog', slug]);

		// Clean and sanitize the slug
		let slug = this.generateSlug(post.data.slug);

		// Ensure there is exactly one trailing slash
		slug = `${slug}`; // Append a trailing slash

		// Navigate to the blog post without encoding the slash
		this.router.navigate(['/blog', slug]);
	}

	// Extract unique categories (badges) from the posts
	extractCategories(posts: any[]): void {
		const badges = posts.map((post: any) => post.data.badge).filter((badge: any) => badge);
		// Add 'All' as a default option and remove duplicates
		this.categories = ['All', ...Array.from(new Set(badges))];
	}

	// Apply filters based on selected category and search query
	applyFilters(): void {
		// Filter posts based on selected category and search query
		this.filteredPosts = this.blogPosts.filter(post => {
			const matchesCategory = this.selectedCategory === 'All' || post.data.badge === this.selectedCategory;
			const matchesSearch = post.data.title.toLowerCase().includes(this.searchQuery.toLowerCase());
			return matchesCategory && matchesSearch;
		});

		// If no posts match the filter, ensure the array is empty
		if (this.filteredPosts.length === 0) {
			this.filteredPosts = [];
		}

		// Reset pagination when filtering changes
		this.currentPage = 1;
		this.updatePagination();
	}

	onCategoryChange(category: string) {
		this.selectedCategory = category;
		this.applyFilters();
	}

	onSearchChange(event: Event) {
		const target = event.target as HTMLInputElement;
		this.searchQuery = target.value;
		this.applyFilters();
	}

	private waitForImages(grid: HTMLElement): Promise<void> {
		const images = Array.from(grid.querySelectorAll('img'));

		return Promise.all(
			images.map((img) => {
				return new Promise<void>((resolve) => {
					if (img.complete) {
						resolve();
					} else {
						img.addEventListener('load', () => resolve());
						img.addEventListener('error', () => resolve());
					}
				});
			})
		).then();
	}

	updatePagination(): void {
		this.totalPages = Math.ceil(this.filteredPosts.length / this.itemsPerPage);

		// Calculate start and end index for the current page
		const startIndex = (this.currentPage - 1) * this.itemsPerPage;
		const endIndex = startIndex + this.itemsPerPage;
		this.paginatedPosts = this.filteredPosts.slice(startIndex, endIndex);

		// Pagination Logic with Ellipses
		const maxButtons = 3; // Maximum number of buttons to display at once
		let startPage: number, endPage: number;

		if (this.totalPages <= maxButtons) {
			startPage = 1;
			endPage = this.totalPages;
		} else {
			if (this.currentPage <= Math.floor(maxButtons / 2)) {
				startPage = 1;
				endPage = maxButtons;
			} else if (this.currentPage + Math.floor(maxButtons / 2) >= this.totalPages) {
				startPage = this.totalPages - maxButtons + 1;
				endPage = this.totalPages;
			} else {
				startPage = this.currentPage - Math.floor(maxButtons / 2);
				endPage = this.currentPage + Math.floor(maxButtons / 2);
			}
		}

		// Generate page numbers with ellipses
		this.pageNumbers = [];

		// Add first page if needed
		if (startPage > 1) {
			this.pageNumbers.push(1);
			if (startPage > 2) this.pageNumbers.push('...'); // Show ellipses if skipped pages exist
		}

		// Add the range of pages
		for (let i = startPage; i <= endPage; i++) {
			this.pageNumbers.push(i);
		}

		// Add last page if needed
		if (endPage < this.totalPages) {
			if (endPage < this.totalPages - 1) this.pageNumbers.push('...');
			this.pageNumbers.push(this.totalPages);
		}

		// Ensure images are loaded before Masonry re-layout
		if (isPlatformBrowser(this.platformId)) {
			const grid = document.querySelector('.blogPost-wrap') as HTMLElement | null;

			if (grid) {
				this.waitForImages(grid).then(() => {
					if (this.masonryInstance) {
						this.masonryInstance.destroy();
					}

					import('masonry-layout')
						.then((MasonryModule) => {
							const Masonry = MasonryModule.default;
							this.masonryInstance = new Masonry(grid, {
								itemSelector: '.blogPost-items',
								columnWidth: '.blogPost-items',
								gutter: 24,
								fitWidth: true,
							});
						});
				});
			}
		}
	}

	paginate(array: any[], itemsPerPage: number, pageNumber: number): any[] {
		return array.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);
	}

	goToPage(page: number | string): void {
		if (typeof page === 'number' && page >= 1 && page <= this.totalPages) {
			this.currentPage = page;
			this.updatePagination();
		}
	}

	nextPage(): void {
		if (this.currentPage < this.totalPages) {
			this.currentPage++;
			this.updatePagination();
		}
	}

	previousPage(): void {
		if (this.currentPage > 1) {
			this.currentPage--;
			this.updatePagination();
		}
	}
}

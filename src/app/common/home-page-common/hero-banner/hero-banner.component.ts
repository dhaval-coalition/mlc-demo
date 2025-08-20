import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, Inject, Input, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { CarouselComponent, CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeroBannerComponent {
  @ViewChild('heroOwlCarousel', { static: false }) heroOwlCarousel!: CarouselComponent;
	@ViewChild('heroVideo', { static: false }) heroVideo!: ElementRef;

	@Input() slider: {
		mediaType: string,
		heroBackgroundVideo: string,
		posterImage: string,
		heroBackgroundImage: string,
		heroImageAlt: string,
		heroTitle: string,
		heroDescription: string,
		bulletPoint?: {
			name: string,
			icon: string,
			iconImageAlt: string,
		}[],
		buttonStyle?: {
			text: string,
			url: string,
			variant: string
		}
	}[] = [];
	
	carouselVisible = false;

	heroCustomOptions: any = {
		loop: false,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		dots: true,
		nav: false,
		navSpeed: 700,
		items: 1,
		responsiveRefreshRate: 200,
		responsive: {
			0: { items: 1 },
			768: { items: 1 },
			992: { items: 1 }
		},
		autoWidth: false,
		margin: 0,
		stagePadding: 0
	};

	private resizeObserver!: ResizeObserver;
	private currentSlideIndex = 0;
	private isInitializing = false;
  private mutationObserver: MutationObserver | null = null;
  private resizeTimeout: any;

	constructor(
    private cdr: ChangeDetectorRef, 
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

	isValidSlider(slider: any) {
		return Array.isArray(slider) && slider.length > 0;
	}
	get isSliderReady(): boolean {
		return Array.isArray(this.slider) && this.slider.length > 0;
	}

	ngOnInit(): void {
		if (this.slider && !Array.isArray(this.slider)) {
			this.slider = [this.slider];
		}
		this.setupMutationObserver();

		if(isPlatformBrowser(this.platformId)){
			this.setupResizeObserver();
			this.manuallyResizeWindow();
		}
	}

	manuallyResizeWindow(): void {
		setTimeout(() => {
			if (isPlatformBrowser(this.platformId)) {
				window.dispatchEvent(new Event('resize'));
				this.cdr.detectChanges();
			}
		}, 100);
	}
	
	private setupMutationObserver(): void {
		// Disconnect existing observer if any
		if (this.mutationObserver) {
			this.mutationObserver.disconnect();
		}

		const target = this.el.nativeElement.querySelector('.owl-carousel');
		if (!target) {
			return;
		}

		this.mutationObserver = new MutationObserver((mutations) => {
			// Only respond to meaningful mutations
			const hasRelevantMutations = mutations.some(mutation => 
				mutation.type === 'childList' || 
				(mutation.type === 'attributes' && mutation.attributeName !== 'style')
			);

			if (hasRelevantMutations && this.heroOwlCarousel && !this.isInitializing) {
				this.safeCarouselRefresh();
			}
		});

		const config = { 
			attributes: true, 
			attributeFilter: ['class', 'style'], // Only watch specific attributes
			childList: true, 
			subtree: true 
		};

		this.mutationObserver.observe(target, config);
	}
	
	private safeCarouselRefresh(): void {
		if (!this.heroOwlCarousel || this.isInitializing) return;

		try {
			// Use requestAnimationFrame for smoother updates
			requestAnimationFrame(() => {
				this.cdr.detectChanges();
				const carouselElement = this.el.nativeElement.querySelector('.owl-carousel');
				if (carouselElement) {
					// Use visibility instead of display to preserve layout
					carouselElement.style.visibility = 'hidden';
					requestAnimationFrame(() => {
						carouselElement.style.visibility = 'visible';
					});
				}
			});
		} catch (e) {
			// console.log('Safe carousel refresh failed:', e);
		}
	}
	
	private setupResizeObserver(): void {
		this.resizeObserver = new ResizeObserver(() => {
			this.handleResize();
		});
		
		const carouselElement = this.el.nativeElement.querySelector('.owl-carousel');
		if (carouselElement) {
			this.resizeObserver.observe(carouselElement);
		}
	}

	private handleResize(): void {
		if (this.resizeTimeout) {
			clearTimeout(this.resizeTimeout);
		}
		
		this.resizeTimeout = setTimeout(() => {
			if (!this.isInitializing) {
				this.reinitializeCarousel();
			}
		}, 300);
	}

	private reinitializeCarousel(): void {
		if (!this.heroOwlCarousel || this.isInitializing) return;
		
		this.isInitializing = true;
		this.currentSlideIndex = this.heroOwlCarousel.slidesData.findIndex(slide => slide.isActive);
		
		this.carouselVisible = false;
		this.cdr.detectChanges();
		
		setTimeout(() => {
			this.carouselVisible = true;
			this.cdr.detectChanges();
			
			setTimeout(() => {
				if (this.heroOwlCarousel && this.currentSlideIndex >= 0) {
					this.heroOwlCarousel.to(this.currentSlideIndex.toString());
				}
				this.isInitializing = false;
			}, 100);
		}, 150);
	}

	ngOnDestroy(): void {
		if (this.mutationObserver) {
			this.mutationObserver.disconnect();
			this.mutationObserver = null;
		}
		if (this.resizeObserver) {
			this.resizeObserver.disconnect();
		}
		clearTimeout(this.resizeTimeout);
	}
	
	@HostListener('window:resize')
	onResize() {
		this.carouselVisible = false;
		setTimeout(() => {
			this.carouselVisible = true;
		}, 0);
	}
	goPrev() {
		this.heroOwlCarousel.prev();
	}
	goNext() {
		this.heroOwlCarousel.next();
	}
}

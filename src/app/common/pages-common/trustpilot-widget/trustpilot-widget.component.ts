import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, Input, NgZone, PLATFORM_ID, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-trustpilot-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trustpilot-widget.component.html',
  styleUrl: './trustpilot-widget.component.scss'
})
export class TrustpilotWidgetComponent {
  @Input() templateId: string = '53aa8912dec7e10d38f59f36'; // Default Trustpilot template ID
	@Input() businessUnitId: string = '5c5868340d936000014b62f0'; // Default business unit ID
	@Input() height: string = '140px'; // Default height
	@Input() width: string = '100%';   // Default width
	@Input() stars: string = '5'; // Default star rating

	private trustpilotScript: HTMLScriptElement | null = null;

	constructor(
		private renderer: Renderer2,
		private el: ElementRef,
		private ngZone: NgZone,
		@Inject(PLATFORM_ID) private platformId: Object
	) { }

	ngOnInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			this.ngZone.runOutsideAngular(() => {
				this.loadTrustpilotWidget();
			});
		}
	}

	ngOnDestroy(): void {
		this.removeTrustpilotWidget();
	}

	private loadTrustpilotWidget(): void {
		if (isPlatformBrowser(this.platformId)) {
			if (!document.querySelector('script[src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"]')) {
				// Load the Trustpilot script only if it hasn't been loaded already
				this.trustpilotScript = this.renderer.createElement('script');
				if (this.trustpilotScript) {
					this.trustpilotScript.src = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
					this.trustpilotScript.async = true;

					// Set onload after confirming trustpilotScript is not null
					this.trustpilotScript.onload = () => {
						this.initializeTrustpilotWidget();
					};

					this.renderer.appendChild(document.body, this.trustpilotScript);
				}
				this.renderer.appendChild(document.body, this.trustpilotScript!);
			} else {
				// If the script is already loaded, directly initialize the widget
				this.initializeTrustpilotWidget();
			}
		}
	}

	private initializeTrustpilotWidget(): void {
		if (isPlatformBrowser(this.platformId)) {
			setTimeout(() => {
				if ((window as any).Trustpilot && (window as any).Trustpilot.loadFromElement) {
					const trustpilotElement = this.el.nativeElement.querySelector('.trustpilot-widget');
					if (trustpilotElement) {
						(window as any).Trustpilot.loadFromElement(trustpilotElement);
					}
				}
			}, 100); // Adjust the delay if necessary
		}
	}

	private removeTrustpilotWidget(): void {
		if (isPlatformBrowser(this.platformId)) {
			// Clear widget content to force a re-render on reload
			const trustpilotElement = this.el.nativeElement.querySelector('.trustpilot-widget');
			if (trustpilotElement) {
				trustpilotElement.innerHTML = ''; // Clear the content for fresh load on re-init
			}

			// Optionally, remove the script to enforce reload if necessary
			if (this.trustpilotScript) {
				this.renderer.removeChild(document.body, this.trustpilotScript);
				this.trustpilotScript = null;
			}
		}
	}
}

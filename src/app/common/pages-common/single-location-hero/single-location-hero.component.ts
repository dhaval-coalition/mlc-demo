import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-single-location-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-location-hero.component.html',
  styleUrl: './single-location-hero.component.scss'
})
export class SingleLocationHeroComponent {
  @Input() bgColor = '';
	@Input() sectionTitle = '';
	@Input() sectionDescription = '';
	@Input() singleLocationHeroThumb = '';
	@Input() thumbImageAlt = '';
	@Input() buttonStyle: any = {
		text: '',
		url: '/',
		variant: '',
	};
	@Input() buttonStyle2: any = {
		text: '',
		url: '/',
		variant: '',
	};

	@ViewChild('targetSection') targetSection!: ElementRef;

	constructor() { }
	ngOnInit(): void {
	}

	handleClick(event: Event, targetId: string): void {
		const target = event.target as HTMLAnchorElement;
		const href = target.getAttribute('href');

		// Check if href is "#" and scroll to the target element
		if (href === "#") {
			event.preventDefault(); // Prevent the default anchor behavior
			this.scrollToSection(targetId);
		}
	}

	scrollToSection(targetId: string): void {
		const element = document.getElementById(targetId);
		const navbarHeight = 140; // Adjust based on your navbar height

		if (element) {
			const elementPosition = element.getBoundingClientRect().top + window.scrollY; // Get element position
			const offsetPosition = elementPosition - navbarHeight; // Adjust for navbar

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
		}
	}
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

	@Input() footerColumns: {
		footerNavLinks?: {
			name: string,
			url: string,
		}[]
	}[] = [];
	@Input() footerCopyrightText = '';
	@Input() footerBottomNavLinks: {
		name: string,
		url: string,
	}[] = []

	constructor() { }
	ngOnInit(): void { }
}

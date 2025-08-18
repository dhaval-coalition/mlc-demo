import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact-top-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-top-info.component.html',
  styleUrl: './contact-top-info.component.scss'
})
export class ContactTopInfoComponent {
  @Input() sectionTitle = '';
	@Input() contactAddress = '';
	@Input() phone = '';
	@Input() mail = '';
	@Input() buttonStyle: any = {
		text: '',
		url: '/',
		variant: '',
		targetBlank: false,
	};
	@Input() contactCard: any = {
		cardItems: []
	};
	@Input() bottomDescription = '';

	constructor() {
	}
	ngOnInit(): void {
	}
}

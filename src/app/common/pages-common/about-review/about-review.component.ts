import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TrustpilotWidgetComponent } from '../trustpilot-widget/trustpilot-widget.component';

@Component({
  selector: 'app-about-review',
  standalone: true,
  imports: [CommonModule, TrustpilotWidgetComponent],
  templateUrl: './about-review.component.html',
  styleUrl: './about-review.component.scss'
})
export class AboutReviewComponent {
  @Input() sectionTitle = '';
	@Input() buttonStyle: any = {
		text: '',
		url: '/',
		variant: '',
		targetBlank: false,
	};
	@Input() sectionBottomTitle = '';

	constructor() { }
	ngOnInit(): void {
	}
}

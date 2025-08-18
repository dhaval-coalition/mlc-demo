import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-image-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-content.component.html',
  styleUrl: './image-content.component.scss',
	encapsulation: ViewEncapsulation.None
})
export class ImageContentComponent {
  @Input() bannerImage = '';
	@Input() bannerImageAlt = '';
	@Input() descriptionBlock = '';
	@Input() bgColor = '';
	@Input() buttonStyle: any = {
		text: '',
		url: '/',
		variant: 'primary',
		targetBlank: false,
	};

	constructor() { }
	ngOnInit(): void {

	}
}

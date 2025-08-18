import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-we-offer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './we-offer.component.html',
  styleUrl: './we-offer.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class WeOfferComponent {
  @Input() bgColor = '';
  @Input() sectionTitle = '';
  @Input() sectionDescription = '';
  @Input() descriptionBlock = '';
  @Input() items: {
    descriptionItemIcons: string;
    itemDescription: string;
    bgColor: string;
    thumbImage: string;
    thumbImageAlt: string,
    button?: {
      text: string;
      url: string;
      variant: string;
    };
    button2?: {
      text: string;
      url: string;
      variant: string;
    };
  }[] = [];
  @Input() buttonStyle: any = {
    text: '',
    url: '/',
    variant: ''
  };

  sectionDescriptionTrim: string = '';

  constructor(private sanitizer: DomSanitizer){}
  ngOnInit(): void {
    // Initialize sectionDescriptionTrim with cleaned HTML
	  this.sectionDescriptionTrim = this.cleanHTML(this.sectionDescription);
	  if (this.items && !Array.isArray(this.items)) {
		  this.items = [this.items]; // Wrap the object in an array
	  }
  }

  // Method to clean up empty paragraphs
  cleanHTML(content: string): string {
    // Remove <p><br></p> or any empty <p> tags
    return content.replace(/<p><br><\/p>/g, '').replace(/<p><\/p>/g, '');
  }

  get sanitizedDescription(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.sectionDescriptionTrim);
  }
}

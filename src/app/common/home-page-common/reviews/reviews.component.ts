import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TrustpilotWidgetComponent } from '../../pages-common/trustpilot-widget/trustpilot-widget.component';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, TrustpilotWidgetComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ReviewsComponent {
  @Input() reviewTitle = '';
  @Input() reviewSubTitle = '';
  @Input() reviewDescription = '';
  @Input() reviewLogo1 = '';
  @Input() reviewLogo1Alt = '';
  @Input() bulletPoint: {
    icon: string,
    iconAlt: string,
    name: string,
  }[] = [];

  constructor(){}

  ngOnInit(): void {
    
  }
}

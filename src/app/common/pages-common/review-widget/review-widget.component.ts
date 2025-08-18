import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TrustpilotWidgetComponent } from '../trustpilot-widget/trustpilot-widget.component';

@Component({
  selector: 'app-review-widget',
  standalone: true,
  imports: [CommonModule, TrustpilotWidgetComponent],
  templateUrl: './review-widget.component.html',
  styleUrl: './review-widget.component.scss'
})
export class ReviewWidgetComponent {
  @Input() bgColor = '';
  @Input() logoItems:{
    logo: string,
    logoImageAlt: string,
  }[] = []

  constructor(){
  }
  ngOnInit(): void {
  }
}

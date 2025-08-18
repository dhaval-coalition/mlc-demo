import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-section-faq',
  standalone: true,
  imports: [CommonModule, NgbAccordionModule],
  templateUrl: './section-faq.component.html',
  styleUrl: './section-faq.component.scss'
})
export class SectionFaqComponent {
  @Input() sectionTitle = '';
  @Input() faqAccordionObject: any = {
    faqItems: [],
  };
  @Input() buttonStyle: any = {
    text: '',
    url: '/',
    variant: '',
    width: '',
  };

  constructor(){}
  ngOnInit(): void {
  }
}

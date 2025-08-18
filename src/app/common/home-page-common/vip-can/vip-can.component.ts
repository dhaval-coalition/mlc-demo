import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-vip-can',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vip-can.component.html',
  styleUrl: './vip-can.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class VipCanComponent {
  @Input() sectionFullWidth = true;
  @Input() sectionHeadTitle = '';
  @Input() sectionHeadDescription = '';
  @Input() bannerImage = '';
  @Input() bannerImageAlt = '';
  @Input() sectionTitle = '';
  @Input() vipItems: {
    icon: string,
    iconImageAlt: string,
    name: string,
    itemName : string,
    itemDescription: string,
  }[] = [];

  constructor(){}
  ngOnInit(): void {
    
  }
}

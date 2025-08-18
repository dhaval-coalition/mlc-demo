import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-about-be-vip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-be-vip.component.html',
  styleUrl: './about-be-vip.component.scss'
})
export class AboutBeVipComponent {
  @Input() backgroundColor = '';
  @Input() sectionTitle = '';
  @Input() beVipItems:{
    icon: string,
    iconImageAlt: string,
    itemName: string,
    itemDescription: string,
  }[] = []

  constructor(){}
  ngOnInit(): void {
  }
  // Method to check if bgColor is white in HEX or RGB format
  isWhiteBgColor(): boolean {
    if (!this.backgroundColor) return true; // If backgroundColor is not set, consider it as white
    const normalizedColor = this.backgroundColor.trim().toLowerCase();
    return (
      normalizedColor === '#ffffff' || 
      normalizedColor === 'rgb(255, 255, 255)' || 
      normalizedColor === 'rgba(255, 255, 255, 1)'
    );
  }
}

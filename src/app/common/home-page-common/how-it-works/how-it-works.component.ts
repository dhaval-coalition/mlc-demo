import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HowItWorksComponent {
  @Input() sectionTitle = '';
  @Input() sectionDescription = '';
  @Input() howItWorkItems:{
    icon: string,
    iconAlt: string,
    itemName: string,
    itemDescription: string,
  }[] = []

  constructor(){}
  ngOnInit(): void {
    
  }
}

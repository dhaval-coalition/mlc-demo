import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-best-choice-for-you',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './best-choice-for-you.component.html',
  styleUrl: './best-choice-for-you.component.scss'
})
export class BestChoiceForYouComponent {
  @Input() backgroundColor = '';
  @Input() sectionTitle = '';
  @Input() sectionDescription = '';
  @Input() largeText = false;
  @Input() bestChoiceItems:{
    icon: string,
    iconImageAlt: string,
    iconBackgroundColor: string,
    itemName: string,
    itemDescription: string,
  }[] = []

  constructor(){}
  ngOnInit(): void {
  }
}

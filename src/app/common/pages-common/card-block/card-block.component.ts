import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-block.component.html',
  styleUrl: './card-block.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CardBlockComponent {
  @Input() sectionTitle = '';
  @Input() cardBlockItems: {
    itemDescription: string;
  }[] = [];

  constructor(){}
  ngOnInit(): void {
  }
}

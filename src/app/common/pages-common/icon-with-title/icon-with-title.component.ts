import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-with-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-with-title.component.html',
  styleUrl: './icon-with-title.component.scss'
})
export class IconWithTitleComponent {
  @Input() iconWithTitleItems:{
    icon: string,
    iconImageAlt: string,
    itemName: string,
  }[] = [];

  constructor(){}
  ngOnInit(): void {
  }
}

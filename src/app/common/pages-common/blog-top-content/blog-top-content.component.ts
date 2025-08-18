import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blog-top-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-top-content.component.html',
  styleUrl: './blog-top-content.component.scss'
})
export class BlogTopContentComponent {
  @Input() sectionTitle = '';
  @Input() sectionDescription = '';

  constructor(){}
  ngOnInit(): void {
  }
}

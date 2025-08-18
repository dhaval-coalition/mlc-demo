import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blog-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-hero.component.html',
  styleUrl: './blog-hero.component.scss'
})
export class BlogHeroComponent {
  @Input() bgImage = '';
  @Input() sectionTitle = '';

  constructor(){
  }
  ngOnInit(): void {
  }
}

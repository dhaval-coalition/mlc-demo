import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-what-you-need',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './what-you-need.component.html',
  styleUrl: './what-you-need.component.scss'
})
export class WhatYouNeedComponent {
  @Input() whatYouNeedThumb = '';
  @Input() thumbImageAlt = '';
  @Input() sectionSubTitle = '';
  @Input() whatYouNeedBgColor = '';
  @Input() whatYouNeedItems: {
    icon: string;
    iconImageAlt: string;
    name: string;
  }[] = [];

  constructor(){}
  ngOnInit(): void {
  }
}

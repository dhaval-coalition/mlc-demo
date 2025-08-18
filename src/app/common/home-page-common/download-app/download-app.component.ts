import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-download-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './download-app.component.html',
  styleUrl: './download-app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DownloadAppComponent {
  @Input() bgColor = '';
  @Input() thumbImage1 = '';
  @Input() thumbImage2 = '';
  @Input() circleBgColor = '';
  @Input() thumbIcon1 = '';
  @Input() thumbIcon1Url = '';
  @Input() thumbIcon2 = '';
  @Input() thumbIcon2Url = '';
  @Input() sectionDescription = '';
  @Input() thumbImageAlt1 = '';
  @Input() thumbImageAlt2 = '';
  @Input() thumbIconAlt1 = '';
  @Input() thumbIconAlt2 = '';

  constructor(){
  }
  ngOnInit(): void {
  }
}

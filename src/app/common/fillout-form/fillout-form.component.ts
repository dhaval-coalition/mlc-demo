import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-fillout-form',
  templateUrl: './fillout-form.component.html',
  styleUrls: ['./fillout-form.component.scss']
})
export class FilloutFormComponent implements AfterViewInit {

  private filloutId: string = 'tBbtWNP7bXus'; // Your Fillout Form ID /sW8YpRqiTAus

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: any // Detect platform
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFilloutForm();
    }
  }

  private loadFilloutForm() {
    const container = this.el.nativeElement.querySelector('#filloutFormContainer');
    if (!container) return;

    // Create Fillout Form element
    const div = document.createElement('div');
    div.setAttribute('data-fillout-id', this.filloutId);
    div.setAttribute('data-fillout-embed-type', 'standard'); // Change to "fullscreen" if needed
    div.setAttribute('data-fillout-inherit-parameters', '');
    div.setAttribute('style', 'width:100%;height:100%;');

    container.appendChild(div);

    // Add Fillout Embed Script (Only if not already added)
    // if (!document.querySelector('script[src="https://server.fillout.com/embed/v1/"]')) {
    //   const script = document.createElement('script');
    //   script.src = 'https://server.fillout.com/embed/v1/';
    //   script.async = true;
    //   document.body.appendChild(script);
    // }
  }
}

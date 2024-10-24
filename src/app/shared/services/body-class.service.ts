import { Injectable, Inject, Renderer2, RendererFactory2, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BodyClassService {
  private renderer: Renderer2;
  private isBrowser: boolean;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.isBrowser = isPlatformBrowser(platformId);
  }

  addClass(className: string) {
    if (this.isBrowser) {
      this.renderer.addClass(document.body, className);
    }
  }

  removeClass(className: string) {
    if (this.isBrowser) {
      this.renderer.removeClass(document.body, className);
    }
  }

  setBodyClass(className: string) {
    if (this.isBrowser && className && className.trim() !== '') {
      document.body.className = ''; // Clear existing classes
      this.addClass(className);
    }
  }
  
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { BodyClassService } from './shared/services/body-class.service';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'minuteloancenter-angular';
  private routerSubscription: any;

  constructor(private router: Router, private bodyClassService: BodyClassService) {}
  
  ngOnInit() {
    this.updateBodyClass(this.router.url);
    this.routerSubscription = this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateBodyClass(event.urlAfterRedirects);
    });
  }

  updateBodyClass(url: string) {
    // Define body classes for routes and patterns
    const pageClasses = [
      { pattern: /^\/home$/, className: 'home-page' },
      { pattern: /^\/about$/, className: 'aboutUs-page' },
      { pattern: /^\/loans$/, className: 'loans-page' },
      { pattern: /^\/contact$/, className: 'contact-page' },
      { pattern: /^\/locations$/, className: 'locations-page' },
      { pattern: /^\/locations\/[^/]+$/, className: 'single-locations-page' },
      { pattern: /^\/blog(\/.*)?$/, className: 'blog-page' },
    ];
  
    // Find a matching class based on the pattern
    const matchedClass = pageClasses.find((entry) => entry.pattern.test(url))?.className;
    const bodyClass = matchedClass || 'default-page';
  
    // Set the body class
    this.bodyClassService.setBodyClass(bodyClass);
  }  

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}

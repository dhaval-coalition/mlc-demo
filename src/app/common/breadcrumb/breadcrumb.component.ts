import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {
  currentUrl: string = '';

  constructor(public breadcrumbService: BreadcrumbService, private router: Router) {}

  ngOnInit(): void {
      // Subscribe to router events to get the current URL
      this.router.events.pipe(
          filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd) // Correct type filter
      ).subscribe((event: NavigationEnd) => {
          this.currentUrl = event.urlAfterRedirects;
      });
  }

  // Function to check if current route is the home page
  isHomePage(): boolean {
      return this.currentUrl === '/';
  }
}

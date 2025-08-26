import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BreadcrumbService as XngBreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  imports: [CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BreadcrumbComponent {
  constructor(
    private breadcrumbService: XngBreadcrumbService
  ) {}

  ngOnInit(): void {}

  // Optional: Method to set breadcrumbs dynamically
  setBreadcrumb(alias: string, label: string): void {
    this.breadcrumbService.set(alias, label);
  }
}

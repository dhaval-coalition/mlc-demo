import { Component, Inject, Input, PLATFORM_ID, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Content } from '@builder.io/sdk-angular';
import { SeoService } from '../../shared/services/seo.service';
import { HttpClient } from '@angular/common/http';
import { BuilderPageContentBase } from '../../shared/builder-page-content.base';
import { NotFoundComponent } from '../../common/not-found/not-found.component';

@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  imports: [CommonModule, Content, NotFoundComponent],
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.scss'],
  host: {
    'ngSkipHydration': 'true'
  }
})
export class DynamicPageComponent extends BuilderPageContentBase {
  @Input() override model = 'pages'; // directly set model here

  constructor(
    http: HttpClient,
    @Optional() router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
    seo: SeoService,
    @Optional() route: ActivatedRoute
  ) {
    super(http, router, platformId, seo, route); // Pass the route to the base class
  }

  // Implement ngOnInit, which will call the shared initPage
  async ngOnInit() {
    await this.initPage();
  }
}

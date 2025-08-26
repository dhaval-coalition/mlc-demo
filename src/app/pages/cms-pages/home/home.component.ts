import { CommonModule } from '@angular/common';
import { Component, Inject, Input, Optional, PLATFORM_ID } from '@angular/core';
import { Content } from '@builder.io/sdk-angular';
import { SeoService } from '../../../shared/services/seo.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BuilderPageContentBase } from '../../../shared/builder-page-content.base';
import { NotFoundComponent } from '../../../common/not-found/not-found.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Content, NotFoundComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BuilderPageContentBase {
  @Input() override model = 'pages';

  constructor(
    http: HttpClient,
    @Optional() router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
    seo: SeoService
  ) {
    super(http, router, platformId, seo);
  }

  async ngOnInit() {
    await this.initPage();
  }

}

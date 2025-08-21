import { CommonModule } from '@angular/common';
import { Component, Inject, Input, Optional, PLATFORM_ID } from '@angular/core';
import { Content } from '@builder.io/sdk-angular';
import { BuilderPageContentBase } from '../../../shared/builder-page-content.base';
import { SeoService } from '../../../shared/services/seo.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, Content],
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent extends BuilderPageContentBase {
  @Input() override model = 'pages';

  constructor(
    http: HttpClient,
    @Optional() router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
    seo: SeoService
  ) {
    super(http, router, platformId, seo);
  }
  
  async ngOnInit(){
    await this.initPage();
  }
}

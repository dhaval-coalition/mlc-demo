import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BuilderModule } from '@builder.io/angular';
import { environment } from '../../../environments/environment';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { PagesCommonModule } from '../pages-common/pages-common.module';
import { ReviewsComponent } from './reviews/reviews.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { WeServeComponent } from './we-serve/we-serve.component';
import { TypesOfServicesComponent } from './types-of-services/types-of-services.component';
import { WhatYourFundsComponent } from './what-your-funds/what-your-funds.component';
import { InformationHubComponent } from './information-hub/information-hub.component';
import { DownloadAppComponent } from './download-app/download-app.component';
import { VipComponent } from './vip/vip.component';
import { VipCanComponent } from './vip-can/vip-can.component';
import { FaqComponent } from './faq/faq.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ImageContentComponent } from './image-content/image-content.component';

@NgModule({
  declarations: [
    HeroBannerComponent,
    ReviewsComponent,
    ImageContentComponent,
    HowItWorksComponent,
    WeServeComponent,
    TypesOfServicesComponent,
    WhatYourFundsComponent,
    InformationHubComponent,
    DownloadAppComponent,
    VipComponent,
    VipCanComponent,
    FaqComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BuilderModule.forRoot(environment.builderAPI),
    PagesCommonModule,
    NgbAccordionModule,
    CarouselModule
  ],
	exports: [
    HeroBannerComponent,
    ReviewsComponent,
    ImageContentComponent,
    HowItWorksComponent,
    WeServeComponent,
    TypesOfServicesComponent,
    WhatYourFundsComponent,
    InformationHubComponent,
    VipComponent,
    VipCanComponent,
    FaqComponent
	]
})
export class HomePageCommonModule { }
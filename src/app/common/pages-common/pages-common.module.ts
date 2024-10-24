import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetCashComponent } from './get-cash/get-cash.component';
import { BuilderModule } from '@builder.io/angular';
import { environment } from '../../../environments/environment';
import { LoansHeroBannerComponent } from './loans-hero-banner/loans-hero-banner.component';
import { ReviewWidgetComponent } from './review-widget/review-widget.component';
import { BestChoiceForYouComponent } from './best-choice-for-you/best-choice-for-you.component';
import { WhatYouNeedComponent } from './what-you-need/what-you-need.component';
import { LoansFaqComponent } from './loans-faq/loans-faq.component';
import { NgbAccordionModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { BlogHeroComponent } from './blog-hero/blog-hero.component';
import { BlogTopContentComponent } from './blog-top-content/blog-top-content.component';
import { StoreLocatorModalComponent } from './store-locator-modal/store-locator-modal.component';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { StoreLocatorService } from '../../shared/services/store-locator.service';
import { AboutWeDifferentComponent } from './about-we-different/about-we-different.component';
import { AboutBeVipComponent } from './about-be-vip/about-be-vip.component';
import { AboutReviewComponent } from './about-review/about-review.component';
import { AboutVipPaysComponent } from './about-vip-pays/about-vip-pays.component';
import { SingleLocationHeroComponent } from './single-location-hero/single-location-hero.component';
import { IconWithTitleComponent } from './icon-with-title/icon-with-title.component';
import { WeOfferComponent } from './we-offer/we-offer.component';
import { AccordionStoreLocationsComponent } from './accordion-store-locations/accordion-store-locations.component';
import { TableWidgetComponent } from './table-widget/table-widget.component';
import { TableWidget2Component } from './table-widget-2/table-widget-2.component';
import { ContactTopInfoComponent } from './contact-top-info/contact-top-info.component';

@NgModule({
  declarations: [
    GetCashComponent,
    LoansHeroBannerComponent,
    ReviewWidgetComponent,
    BestChoiceForYouComponent,
    WhatYouNeedComponent,
    LoansFaqComponent,
    BlogHeroComponent,
    BlogTopContentComponent,
    StoreLocatorModalComponent,
    AboutWeDifferentComponent,
    AboutBeVipComponent,
    AboutReviewComponent,
    AboutVipPaysComponent,
    SingleLocationHeroComponent,
    IconWithTitleComponent,
    WeOfferComponent,
    AccordionStoreLocationsComponent,
    TableWidgetComponent,
    TableWidget2Component,
    ContactTopInfoComponent
  ],
  imports: [
    CommonModule,
    BuilderModule.forRoot(environment.builderAPI),
    NgbAccordionModule,
    FormsModule,
    GoogleMapsModule,
    NgbAlertModule
  ],
  exports: [
    GetCashComponent,
    LoansHeroBannerComponent
  ],
  providers:[
    StoreLocatorService
  ]
})
export class PagesCommonModule { }

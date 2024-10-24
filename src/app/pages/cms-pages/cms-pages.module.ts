import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsPagesRoutingModule } from './cms-pages-routing.module';
import { SamplePageComponent } from './sample-page/sample-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BuilderModule } from '@builder.io/angular';
import { environment } from '../../../environments/environment';
import { LoansComponent } from './loans/loans.component';
import { LocationsComponent } from './locations/locations.component';
import { StoreLocatorService } from '../../shared/services/store-locator.service';
import { LocationsDataService } from '../../shared/services/locations-data.service';
import { SingleLocationComponent } from './single-location/single-location.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [
    SamplePageComponent,
    AboutUsComponent,
    LoansComponent,
    LocationsComponent,
    SingleLocationComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    CmsPagesRoutingModule,
		BuilderModule.forRoot(environment.builderAPI)
  ],
  exports: [
    SamplePageComponent,
    AboutUsComponent,
    LoansComponent,
    LocationsComponent
  ],
  providers: [
    StoreLocatorService,
    LocationsDataService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmsPagesModule { }

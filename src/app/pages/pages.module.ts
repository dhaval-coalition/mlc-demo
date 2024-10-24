import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { LayoutModule } from '../layout/layout.module';
import { PagesCommonModule } from '../common/pages-common/pages-common.module';
import { BuilderModule } from '@builder.io/angular';
import { environment } from '../../environments/environment';


@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutModule,
    PagesCommonModule,
		BuilderModule.forRoot(environment.builderAPI)
  ],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class PagesModule { }

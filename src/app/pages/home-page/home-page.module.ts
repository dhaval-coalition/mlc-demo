//Framework or npm package import
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//custom module/component import statement
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageCommonModule } from '../../common/home-page-common/home-page-common.module';
import { environment } from '../../../environments/environment';
import { BuilderModule } from '@builder.io/angular';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		HomeRoutingModule,
		HomePageCommonModule,
		BuilderModule.forRoot(environment.builderAPI)
	],
	declarations: [
		HomeComponent
	]
})

export class HomePageModule { }

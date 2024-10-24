import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { BuilderModule } from '@builder.io/angular';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BuilderModule.forRoot(environment.builderAPI)
  ],
	exports: [
		HeaderComponent,
    FooterComponent,
    LayoutComponent
	]
})
export class LayoutModule { }
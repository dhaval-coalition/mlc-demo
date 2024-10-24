import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsPagesRoutingModule } from './blogs-pages-routing.module';
import { BlogsComponent } from './blogs/blogs.component';
import { BuilderModule } from '@builder.io/angular';
import { environment } from '../../../environments/environment';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { LayoutModule } from '../../layout/layout.module';


@NgModule({
  declarations: [
    BlogsComponent,
    BlogDetailsComponent
  ],
  imports: [
    CommonModule,
    BlogsPagesRoutingModule,
		BuilderModule.forRoot(environment.builderAPI),
    LayoutModule
  ]
})
export class BlogsPagesModule { }

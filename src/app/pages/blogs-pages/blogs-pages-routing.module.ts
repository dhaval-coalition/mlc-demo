import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

const routes: Routes = [
  {
    path: '',
    component: BlogsComponent,
    data: {
        breadcrumb: 'blog'
    }
  },
  {
    path: ':slug',
    component: BlogDetailsComponent,
    data: {
        breadcrumb: 'blog'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsPagesRoutingModule { }

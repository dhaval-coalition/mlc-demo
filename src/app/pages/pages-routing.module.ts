import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home-page/home-page.module').then(r => r.HomePageModule)
      },
      {
        path: '',
        loadChildren: () => import('./cms-pages/cms-pages.module').then(r => r.CmsPagesModule)
      },
      {
        path: 'blog',
        loadChildren: () => import('./blogs-pages/blogs-pages.module').then(r => r.BlogsPagesModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

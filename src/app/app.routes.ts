import { Routes } from '@angular/router';
import { DynamicPageComponent } from './pages/cms-pages/dynamic-page/dynamic-page.component';

export const routes: Routes = [
  {
    path: "home",
    component: DynamicPageComponent,
    data: { model: "pages" }
  },
  {
    path: "about",
    component: DynamicPageComponent,
    data: { model: "pages" }
  },
  {
    path: "test",
    component: DynamicPageComponent,
    data: { model: "pages" }
  },
  {
    path: "**",
    component: DynamicPageComponent
  }
];
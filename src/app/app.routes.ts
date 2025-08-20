import { Routes } from '@angular/router';
import { DynamicPageComponent } from './pages/dynamic-page/dynamic-page.component';
import { AboutUsComponent } from './pages/cms-pages/about-us/about-us.component';
import { HomeComponent } from './pages/cms-pages/home/home.component';
import { ContactComponent } from './pages/cms-pages/contact/contact.component';
import { LoansComponent } from './pages/cms-pages/loans/loans.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "about",
    component: AboutUsComponent,
  },
  {
    path: "contact",
    component: ContactComponent,
  },
  {
    path: "loans",
    component: LoansComponent,
  },
  {
    path: "**",
    component: DynamicPageComponent
  }
];
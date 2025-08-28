import { Routes } from '@angular/router';
import { DynamicPageComponent } from './pages/dynamic-page/dynamic-page.component';
import { AboutUsComponent } from './pages/cms-pages/about-us/about-us.component';
import { HomeComponent } from './pages/cms-pages/home/home.component';
import { ContactComponent } from './pages/cms-pages/contact/contact.component';
import { LoansComponent } from './pages/cms-pages/loans/loans.component';
import { LocationsComponent } from './pages/cms-pages/locations/locations.component';
import { SingleLocationComponent } from './pages/cms-pages/single-location/single-location.component';
import { BlogsComponent } from './pages/blogs-pages/blogs/blogs.component';
import { BlogDetailsComponent } from './pages/blogs-pages/blog-details/blog-details.component';

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
    path: "locations",
    component: LocationsComponent,
  },
  {
    path: 'locations/:slug',
    component: SingleLocationComponent,
  },
  {
    path: "blog",
    component: BlogsComponent,
  },
  {
    path: "blog/:slug",
    component: BlogDetailsComponent,
  },
  {
    path: "**",
    component: DynamicPageComponent
  }
];
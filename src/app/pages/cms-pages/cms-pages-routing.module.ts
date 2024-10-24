import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SamplePageComponent } from './sample-page/sample-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoansComponent } from './loans/loans.component';
import { LocationsComponent } from './locations/locations.component';
import { SingleLocationComponent } from './single-location/single-location.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { 
    path:'',
    children: [
      {
        path: 'sample',
        component: SamplePageComponent,
        data: {
            breadcrumb: 'sample'
        }
      },
      {
        path: 'about',
        component: AboutUsComponent,
        data: {
            breadcrumb: 'about'
        }
      },
      {
        path: 'loans',
        component: LoansComponent,
        data: {
            breadcrumb: 'loans'
        }
      },
      {
        path: 'locations',
        component: LocationsComponent,
        data: {
            breadcrumb: 'locations'
        }
      },
      {
        path: 'locations/:slug',
        component: SingleLocationComponent,
        data: {
            breadcrumb: 'single locations'
        }
      },
      {
        path: 'contact',
        component: ContactComponent,
        data: {
            breadcrumb: 'contact'
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsPagesRoutingModule { }

import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';
import { LocationsDataService } from '../../../shared/services/locations-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-we-serve',
  templateUrl: './we-serve.component.html',
  styleUrl: './we-serve.component.scss',
  encapsulation: ViewEncapsulation.None
})
@BuilderBlock({
  tag: 'app-we-serve',
  name: 'We serve',
  inputs:[
    {
      name: 'sectionTitle',
      type: 'string',
      defaultValue: 'We Serve the Following States!',
      friendlyName: 'Title',
    },
    {
      name: "itemDescription",
      type: "html",
      friendlyName: "Description",
      defaultValue: "Description",
    },
    {
      name: 'buttonStyle',
      type: 'object',
      friendlyName:'Button',
      defaultValue: {
        text: 'Visit Our Retail Locations',
        url: '/',
        variant: 'primary',
      },
      subFields: [
        {
          name: 'text',
          type: 'string',
        },
        {
          name: 'url',
          type: 'url',
        },
        {
          name: 'variant',
          type: 'string',
          enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
        },
      ],
    },
  ]
})
export class WeServeComponent implements OnInit {
  statesList: any[] = [];
  locationGuideList: any[] = [];

  @Input() sectionTitle = '';
  @Input() itemDescription = '';
  @Input() buttonStyle: any = {
    text: '',
    url: '/',
    variant: 'primary'
  };

  constructor(private getLocationsDataService: LocationsDataService, private router: Router){}
  ngOnInit(): void {
    this.getLocationsDataService.getStates().subscribe({
      next: data => {
        this.statesList = data.results.map((item:any) => 
          item.data.states.map((stateEachItem:any) => {
            return {
              url: stateEachItem.url,
              name: stateEachItem.name,
              thumbnail: stateEachItem.thumbnail,
            };
          })
        ).flat();

        this.locationGuideList = data.results.map((guideItem:any) => 
          guideItem.data.locationType.map((typeItems:any) => ({
            icon: typeItems.typeIcon,
            bgColor: typeItems.typeBackgroundColor,
            title: typeItems.typeName,
          }))
        ).flat();
      }
    });
  }
  goToState(stateUrl: string) {
    if (stateUrl.startsWith('/locations')) {
      this.router.navigate([stateUrl]);
    } else {
      this.router.navigate([`/locations/${stateUrl}`]);
    }
  }
   
}

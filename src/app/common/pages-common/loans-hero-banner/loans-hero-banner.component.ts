import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';
import { LocationsDataService } from '../../../shared/services/locations-data.service';

@Component({
  selector: 'app-loans-hero-banner',
  templateUrl: './loans-hero-banner.component.html',
  styleUrl: './loans-hero-banner.component.scss',
  encapsulation: ViewEncapsulation.None
})
@BuilderBlock({
  tag: 'app-loans-hero-banner',
  name: 'Loans - hero banner',
  inputs: [
    {
      name: 'bgColor',
      friendlyName: 'Background Color',
      type: 'color',
      defaultValue: '#EEF3F9',
    },
    {
      name:'sectionTitle',
      type: 'string',
      friendlyName: 'Title',
      defaultValue: 'Apply For A Fast Personal Loan - Choose your State',
    },
    {
      name: 'sectionDescription',
      type: 'html',
      defaultValue: 'Enter some text...',
      friendlyName: 'Description',
    },
    {
      name: 'heroFormFields',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'buttonStyle',
      type: 'object',
      friendlyName:'Button',
      defaultValue: {
        text: 'See Our Store Locator',
        url: '/',
        variant: 'secondary',
        width: 'large',
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
          defaultValue: 'primary',
          enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
        },
        {
          name: 'width',
          type: 'string',
          defaultValue: 'large',
          enum: ['auto', 'medium', 'large'],
        },
      ],
    },
    {
      name: 'loansHeroThumb',
      friendlyName: 'Thumb Image',
      type: 'file',
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
    },
  ]
})
export class LoansHeroBannerComponent implements OnInit {
  statesList:any[] = [];

  @Input() bgColor = '';
  @Input() sectionTitle = '';
  @Input() sectionDescription = '';
  @Input() loansHeroThumb = '';
  @Input() heroFormFields = true;
  @Input() buttonStyle:any = {
    text: '',
    url: '/',
    variant: '',
    width: '',
  }

  constructor(private locationsDataService:LocationsDataService){
  }
  ngOnInit(): void {
    this.locationsDataService.getStates().subscribe((response:any) => {
      if(response.results && response.results.length > 0 && response.results[0].data.states){
        this.statesList = response.results[0].data.states;
      }
    });
  }
}

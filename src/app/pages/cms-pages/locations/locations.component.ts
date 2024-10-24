import { Component, OnInit } from '@angular/core';
import { LocationsDataService } from '../../../shared/services/locations-data.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss'
})
export class LocationsComponent implements OnInit {
  states: any[] = [];

  constructor(private LocationsDataService: LocationsDataService) {}

  ngOnInit() {
    this.LocationsDataService.getStates().subscribe({
      next: data => {
        this.states = data.results.map((item: any) => 
          item.data.states.map((stateEachItem: any) => ({
            name: stateEachItem.name,
            thumbnail: stateEachItem.thumbnail
          }))
        ).flat(); // Using flat() to ensure a single-level array
      },
      error: err => {
        console.error('Error fetching states:', err);
      }
    });
  }
  
}

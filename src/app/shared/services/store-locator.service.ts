import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreLocatorService {

  constructor() { }

  // Static store data with lat/lng
  getStores(): Observable<any[]> {
    const stores = [
        { 
          name: 'Alabama', 
          lat: 32.3770, 
          lng: -86.3000,
          zip: '36104' 
        },
        { 
          name: 'Delaware', 
          lat: 39.1581, 
          lng: -75.5244,
          zip: '19901' 
        },
        { 
          name: 'Kansas', 
          lat: 39.0489, 
          lng: -95.6770,
          zip: '66603' 
        },
        { 
          name: 'Louisiana', 
          lat: 30.4571, 
          lng: -91.1874,
          zip: '70802' 
        },
        { 
          name: 'Mississippi', 
          lat: 32.2988, 
          lng: -90.1848,
          zip: '39201' 
        },
        { 
          name: 'Missouri', 
          lat: 38.5767, 
          lng: -92.1735,
          zip: '65101' 
        },
        { 
          name: 'Nevada', 
          lat: 39.1638, 
          lng: -119.7674,
          zip: '89701'  
        },
        { 
          name: 'South Carolina', 
          lat: 34.0007,
          lng: -81.0348,
          zip: '29201' 
        },
        { 
          name: 'Utah', 
          lat: 40.7608, 
          lng: -111.8910,
          zip: '84101'  
        },
        { 
          name: 'Wisconsin', 
          lat: 43.0747, 
          lng: -89.3844,
          zip: '53703' 
        }
    ];      

    // Return the static store data as an observable
    return of(stores);
  }
}

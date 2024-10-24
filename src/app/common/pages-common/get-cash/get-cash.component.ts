import { Component, OnInit } from '@angular/core';
import { LocationsDataService } from '../../../shared/services/locations-data.service';

@Component({
  selector: 'app-get-cash',
  templateUrl: './get-cash.component.html',
  styleUrl: './get-cash.component.scss'
})
export class GetCashComponent implements OnInit {
  statesList:any[] = [];

  constructor(private locationsDataService:LocationsDataService){}
  ngOnInit(): void {
    this.locationsDataService.getStates().subscribe((response:any) => {
      if(response.results && response.results.length > 0 && response.results[0].data.states){
        this.statesList = response.results[0].data.states;
      }
    });
  }
}

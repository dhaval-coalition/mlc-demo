import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreLocatorService } from '../../../shared/services/store-locator.service';

@Component({
  selector: 'app-store-locator-modal',
  templateUrl: './store-locator-modal.component.html',
  styleUrl: './store-locator-modal.component.scss'
})
export class StoreLocatorModalComponent implements OnInit {
  stores: any[] = [];
  filteredStores: any[] = [];
  searchZip: string = '';
  errorMessage: string = ''; // To track validation errors

  // Map options
  center: google.maps.LatLngLiteral = { lat: 39.8283, lng: -98.5795 }; // Center of US (can adjust as needed)
  zoom = 4; // Initial zoom level
  
  constructor(private storeLocatorService: StoreLocatorService, private activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.storeLocatorService.getStores().subscribe((data: any[]) => {
      this.stores = data;
      this.filteredStores = data; // Initialize with all stores
      this.setMapCenter(); // Set center based on initial data
    });
  }

  onEnterKey(): void {
    this.filterStores();
  }

  // Filter stores by zip code
  filterStores(): void {
    // Clear any previous error message
    this.errorMessage = '';

    // Reset to default if searchZip is empty
    if (!this.searchZip) {
      this.filteredStores = this.stores; // Reset to all stores
      this.setMapCenter(); // Reset map center to default
      return;
    }

    // Validate that the zip code is a number and 5 digits long
    const zipPattern = /^\d{5}$/;
    if (!zipPattern.test(this.searchZip)) {
      this.errorMessage = 'Please enter a valid 5-digit zip code.';
      return;
    }

    // Filter stores based on the entered zip code
    this.filteredStores = this.stores.filter(store => store.zip && store.zip.includes(this.searchZip));

    // If no stores are found, show an error message
    if (this.filteredStores.length === 0) {
      this.errorMessage = 'No stores found for this zip code.';
    }
    
    this.setMapCenter(); // Re-center the map based on filtered stores
  }

  // Set the center of the map based on the first store (or default if none)
  private setMapCenter(): void {
    if (this.filteredStores.length > 0) {
      const firstStore = this.filteredStores[0];
      this.center = {
        lat: firstStore.lat,
        lng: firstStore.lng
      };
      this.zoom = 4; // Zoom in closer to the stores
    } else {
      this.center = { lat: 39.8283, lng: -98.5795 }; // Default to US center
      this.zoom = 4;
    }
  }

  storeModalClose(){
    this.activeModal.close();
  }
  closeAlert(){
    this.errorMessage = '';
  }
}

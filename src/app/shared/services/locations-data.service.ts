import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationsDataService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.builderAPI;
  private modelName = 'locations-data';

  constructor(private http: HttpClient) { }

  // Fetch all states from Builder.io
  getStates(): Observable<any> {
    const url = `${this.apiUrl}${this.modelName}?apiKey=${this.apiKey}&limit=100`;
    return this.http.get(url);
  }
}

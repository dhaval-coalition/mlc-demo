    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { forkJoin, map, Observable } from 'rxjs';
    import { environment } from '../../../environments/environment';

    @Injectable({
    providedIn: 'root',
    })
    export class SitemapService {
        private apiUrl = environment.apiUrl;
        private apiKey = environment.builderAPI;
        private limit = 100;
        private modelPages = 'pages';
        private modelSingleLocation = 'single-location';
        private modelBlogListing = 'blogs';

        constructor(private http: HttpClient) {}

        getSitemapItems(): Observable<any[]> {
            const pagesAPIUrl = `${this.apiUrl}${this.modelPages}?apiKey=${this.apiKey}&limit=${this.limit}`;
            const singleLocationAPIUrl = `${this.apiUrl}${this.modelSingleLocation}?apiKey=${this.apiKey}&limit=${this.limit}`;
            const blogsListingAPIUrl = `${this.apiUrl}${this.modelBlogListing}?apiKey=${this.apiKey}&limit=${this.limit}`;
        
            return forkJoin([
                this.http.get<any>(pagesAPIUrl).pipe(
                    map(response => {
                        // Annotate results with modelName
                        return (response?.results || []).map((item: any) => ({
                            ...item,
                            modelName: this.modelPages,
                        }));
                    })
                ),
                this.http.get<any>(singleLocationAPIUrl).pipe(
                    map(response => {
                        // Annotate results with modelName
                        return (response?.results || []).map((item: any) => ({
                            ...item,
                            modelName: this.modelSingleLocation,
                        }));
                    })
                ),
                this.http.get<any>(blogsListingAPIUrl).pipe(
                    map(response => {
                        // Annotate results with modelName
                        return (response?.results || []).map((item: any) => ({
                            ...item,
                            modelName: this.modelBlogListing,
                        }));
                    })
                ),
            ]).pipe(
                map(([pages, singleLocations, blogsListing]) => {
                    // Combine both results into a single array
                    return [...pages, ...singleLocations, ...blogsListing];
                })
            );
        }
    }
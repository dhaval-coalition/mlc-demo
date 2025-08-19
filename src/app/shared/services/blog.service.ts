import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.builderAPI;
  private modelName = 'blog-post';

  constructor(private http: HttpClient) { }

  // Fetch blog posts with pagination support
  getAllBlogPosts(limit: number = 100, offset: number = 0): Observable<any> {
    const url = `${this.apiUrl}${this.modelName}?apiKey=${this.apiKey}&limit=${limit}&offset=${offset}`;
    return this.http.get(url);
  }  

  getBlogPosts(): Observable<any> {
    const url = `${this.apiUrl}${this.modelName}?apiKey=${this.apiKey}&limit=6`;
    return this.http.get(url);
  }

  getRelatedBlogPosts(): Observable<any> {
    const url = `${this.apiUrl}${this.modelName}?apiKey=${this.apiKey}&limit=50`;
    return this.http.get(url);
  }

  getBlogPostBySlug(slug: string): Observable<any> {
    const url = `${this.apiUrl}${this.modelName}?apiKey=${this.apiKey}&query.data.slug=${encodeURIComponent(slug)}`;
    return this.http.get(url);
  }  
}

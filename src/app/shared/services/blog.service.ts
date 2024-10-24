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

  getBlogPosts(): Observable<any> {
    const url = `${this.apiUrl}${this.modelName}?apiKey=${this.apiKey}&limit=10`;
    return this.http.get(url);
  }

  getBlogPostBySlug(slug: string): Observable<any> {
    const url = `${this.apiUrl}${this.modelName}?apiKey=${this.apiKey}&query.data.slug=${encodeURIComponent(slug)}`;
    return this.http.get(url);
  }  
}

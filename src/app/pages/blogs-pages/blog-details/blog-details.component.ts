import { Component, Inject, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../shared/services/blog.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class BlogDetailsComponent implements OnInit {
  blogPost: any;
  currentUrl: string = '';

  constructor(private route: ActivatedRoute, private blogService: BlogService, @Inject(PLATFORM_ID) private platformId: any) { }
  
  ngOnInit(): void {
    const slug = `/${this.route.snapshot.paramMap.get('slug')}/`;

    if (slug) {
      this.blogService.getBlogPostBySlug(slug).subscribe(response => {
        if (response && response.results && response.results.length > 0) {
          this.blogPost = response.results.find((post: any) => post.data.slug === slug).data; // Accessing .data directly

          if (isPlatformBrowser(this.platformId)) {
            this.currentUrl = window.location.href;
          }
        } else {
          console.error('Blog post not found with the given slug');
        }
      });      
    }
  }
  getEncodedURL(): string {
    if (isPlatformBrowser(this.platformId)) {
      return encodeURIComponent(this.currentUrl);
    }
    return '';
  }
  getEncodedTitle(): string {
    return encodeURIComponent(this.blogPost?.title || '');
  }
  printPage(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.print();
    }
  }
}

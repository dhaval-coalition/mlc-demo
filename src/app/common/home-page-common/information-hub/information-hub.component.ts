import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { Router } from 'express';
import { CarouselComponent, CarouselModule } from 'ngx-owl-carousel-o';

interface BlogPost {
  data: {
    title: string;
    date: string;
    badge: string;
    badgeVariant?: string;
    thumbnail: string;
    thumbnailAltText: string,
    description: string;
    slug: string;
  };
}

@Component({
  selector: 'app-information-hub',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './information-hub.component.html',
  styleUrl: './information-hub.component.scss'
})
export class InformationHubComponent {
  @ViewChild('owlRelatedPostCarousel', { static: false }) owlRelatedPostCarousel!: CarouselComponent;

  recentPosts: BlogPost[] = [];

  @Input() sectionTitle = '';
  @Input() sectionDescription = '';

  // constructor(private router: Router, private blogService: BlogService){
  // }
  
  ngOnInit(): void {
    // Fetch the most recent blog posts
    // this.blogService.getBlogPosts().subscribe({
    //   next: (response: { results: BlogPost[] }) => {
    //     if (response && response.results) {
    //       // Sort posts by date and take the latest 6
    //       this.recentPosts = response.results
    //         .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    //         .slice(0, 6);
    //     }
    //   }
    // });
  }

  // Generate a URL-friendly slug and navigate to the post
  navigateToPost(post: any): void {
    // const slug = this.generateSlug(post.data.slug);
    // this.router.navigate(['/blog', slug]);
  }

  // Helper function to generate a URL-friendly slug
  generateSlug(slug: string): string {
    return slug
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  postCarouselCustomOptions: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    nav: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      558: {
        items: 2
      },
      767: {
        items: 2
      },
      940: {
        items: 3
      }
    },
  }
  goPrev() {
    this.owlRelatedPostCarousel.prev();
  }
  goNext() {
    this.owlRelatedPostCarousel.next();
  }

  // Add this method to truncate the description
  truncateDescription(description: string, maxLength: number = 150): string {
    if (!description) return '';
    
    // Remove HTML tags first
    const plainText = description.replace(/<[^>]*>/g, '');
    
    if (plainText.length > maxLength) {
      return plainText.substring(0, maxLength);
    }
    return plainText;
  }
}

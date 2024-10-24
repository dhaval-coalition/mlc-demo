import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BlogService } from '../../../shared/services/blog.service';
import { Builder } from '@builder.io/sdk';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class BlogsComponent implements OnInit {
  blogPosts: any[] = [];
  filteredPosts:any[] = [];
  categories:any[] = ['All'];
  selectedCategory:string = 'All';
  searchQuery:string = '';

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 3; // Number of items to display per page
  totalPages: number = 0;
  paginatedPosts: any[] = [];

  constructor(private blogService: BlogService, private router: Router){}
  
  ngOnInit(): void {
    this.blogService.getBlogPosts().subscribe((response:any) => {
      const posts = response.results || [];
      this.blogPosts = posts;
      this.filteredPosts = posts;

      const badges = posts.map((post:any) => post.data.badge).map((badge:any) => badge);
      this.categories = ['All', ...Array.from(new Set(badges))];
      
      // Initialize pagination
      this.updatePagination();
    })
  }

  generateSlug(slug: string): string {
    return slug
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  navigateToPost(post: any): void {
    const slug = this.generateSlug(post.data.slug);
    this.router.navigate(['/blog', slug]);
  }

  filterPosts() {
    this.filteredPosts = this.blogPosts.filter(post => {
      const matchesCategory = this.selectedCategory === 'All' || post.data.badge === this.selectedCategory;
      const matchesSearch = post.data.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  
    if (this.filteredPosts.length === 0) {
      this.filteredPosts = [];
    }

    // Reset to first page whenever filtering changes
    this.currentPage = 1;
    this.updatePagination();
  }
  
  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.filterPosts();
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.filterPosts();
  }  

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredPosts.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPosts = this.filteredPosts.slice(startIndex, endIndex);
  }

  paginate(array: any[], itemsPerPage: number, pageNumber: number): any[] {
    return array.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
        return;
    }
    this.currentPage = page;
    this.updatePagination();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePagination();
    }
  }

}
Builder.register('insertMenu', {
  name: 'Blog - Components',
  items: [
    { name: 'Blog hero' },
    { name: 'Blog top content' },
  ],
}) 

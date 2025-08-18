import { Component, HostListener, Inject, Input, PLATFORM_ID, Renderer2 } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() logoImageURL = '';
  @Input() logoURL = '';
  @Input() navLinks: { 
    name: string, 
    url: string,
    subNav?: {
      name: string, 
      url: string,
    }[]
  }[] = [];
  @Input() buttonList: { name: string, url:string, style: string, }[] = [];
  @Input() buttonText = '';
  @Input() buttonUrl = '';
  @Input() openLinkInNewTab = false;

  menuOpen = false;
  openSections: boolean[] = [];
  isMobile = false;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  ngOnInit(): void {
    this.openSections = this.navLinks.map(() => false);
    this.updateIsMobile();
  }
  updateIsMobile() {
    if(isPlatformBrowser(this.platformId)){
      this.isMobile = window.innerWidth <= 990;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateIsMobile();
  }

  menuClick(): void{
    this.menuOpen = !this.menuOpen;

    if(this.menuOpen){
      this.renderer.addClass(document.body, 'menu-open');
    }else{
      this.renderer.removeClass(document.body, 'menu-open');
    }
  }
  menuCloseBtn(): void{
    this.menuOpen = false;
    this.renderer.removeClass(document.body, 'menu-open');
  }
  toggleSubMenu(index: number): void {
    this.openSections[index] = !this.openSections[index];
  }
}

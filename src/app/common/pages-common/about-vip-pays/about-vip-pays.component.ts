import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-about-vip-pays',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-vip-pays.component.html',
  styleUrl: './about-vip-pays.component.scss'
})
export class AboutVipPaysComponent {
  @Input() sectionTitle = '';
  @Input() sectionDescription = '';
  @Input() vipPaysItems:{
    itemBackgroundColor: string,
    itemDescription: string,
    videoOptions?: {
      aboutVideo?: string;
      autoplay?: boolean;
      loop?: boolean;
      muted?: boolean;
      controls?: boolean;
    };
  }[] = [];

  constructor(private sanitizer: DomSanitizer){}
  ngOnInit(): void {
  }
  
  getSafeVideoUrl(options: {
    aboutVideo?: string;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
  }): SafeResourceUrl {
    if (!options.aboutVideo) {
      return '';
    }

    const videoId = options.aboutVideo;
    let youtubeUrl = `https://www.youtube.com/embed/${videoId}`;

    // Add query parameters for autoplay, loop, etc.
    const params = new URLSearchParams();
    params.set('autoplay', options.autoplay ? '1' : '0');
    if (options.loop) {
      params.set('loop', '1');
      params.set('playlist', videoId);
    } else {
      params.set('loop', '0');
    }
    params.set('mute', options.muted ? '1' : '0');
    params.set('controls', options.controls ? '1' : '0');

    // Append parameters to the URL
    youtubeUrl += `?${params.toString()}`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);
  }
}

import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-about-vip-pays',
  templateUrl: './about-vip-pays.component.html',
  styleUrl: './about-vip-pays.component.scss',
  encapsulation: ViewEncapsulation.None
})
@BuilderBlock({
  tag: 'app-about-vip-pays',
  name: 'About vip pays',
  inputs: [
    {
      name: 'sectionTitle',
      type: 'string',
      defaultValue: 'Being an MLC VIP Pays',
      friendlyName: 'Title',
    },
    {
      name: 'sectionDescription',
      type: 'html',
      defaultValue: 'Enter some text...',
      friendlyName: 'Description',
    },
    {
      name: 'vipPaysItems',
      type: 'list',
      friendlyName: 'Items',
      defaultValue: [
        {
          itemBackgroundColor: '#EEF3F9',
          itemName: 'Item Title',
          videoOptions: {
            aboutVideo: '',
            autoplay: false,
            loop: false,
            muted: true,
            controls: true
          }
        }
      ],
      subFields:[
        {
          name: 'itemBackgroundColor',
          friendlyName: 'Background Color',
          type: 'color',
        },
        {
          name: 'videoOptions',
          type: 'object',
          friendlyName: 'Video Options',
          subFields: [
            {
              name: 'aboutVideo',
              friendlyName: 'Video ID',
              type: 'string',
              helperText: 'Enter only the YouTube video ID (e.g., A6C2Vs8HnsA).',
            },
            {
              name: 'autoplay',
              type: 'boolean',
              friendlyName: 'Autoplay',
            },
            {
              name: 'loop',
              type: 'boolean',
              friendlyName: 'Loop',
            },
            {
              name: 'muted',
              type: 'boolean',
              friendlyName: 'Muted',
            },
            {
              name: 'controls',
              type: 'boolean',
              friendlyName: 'Show Controls',
            },
          ]
        },
        {
          name: 'itemDescription',
          type: 'html',
          friendlyName: 'Description',
        },
      ]
    },
  ]
})
export class AboutVipPaysComponent implements OnInit {
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

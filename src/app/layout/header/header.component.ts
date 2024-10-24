import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
@BuilderBlock({
  tag: 'app-header',
  name: 'Header',
  inputs: [
    {
      name: 'logoImageURL',
      type: 'file',
      defaultValue: 'https://cdn.builder.io/api/v1/image/assets%2F25324592541e4b09b9ff0a341256de6b%2Fc915fc48b7584dbaaca53f6994fbb763',
      bubble: true,
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
      required: true,
    },
    {
      name: 'logoURL',
      type: 'url',
      defaultValue: '/',
      required: true,
    },
    {
      name: 'navLinks',
      type: 'list',
      defaultValue: [
        { 
          name: 'Loans', 
          url: '/',
          subNav: [
            { name: 'Line of Credit', url: '/' },
            { name: 'Installment Loans', url: '/' },
          ] 
        },
        { 
          name: 'Locations', 
          url: '/',
          subNav: [
            { name: 'Alabama', url: '/' },
            { name: 'Delaware', url: '/' },
            { name: 'Kansas', url: '/' },
            { name: 'Louisiana', url: '/' },
            { name: 'Mississippi', url: '/' },
          ]
        },
        { 
          name: 'About', 
          url: '/',
          subNav: [
            { name: 'Careers', url: '/' },
            { name: 'Extra Mile', url: '/' },
            { name: 'FAQ', url: '/' },
            { name: 'Security Tips', url: '/' },
          ]
        },
        { name: 'Blog', url: '/' },
        { name: 'Contact', url: '/' },
      ],
      onChange: (options:any) => {
        const navLinks = options.get('navLinks');
        if (navLinks.length > 6) {
          options.set('navLinks', navLinks.slice(0, 6))
          alert('Maximum 6 navigation links are allowed.')
        }
      },
      subFields: [
        {
          name: 'name',
          type: 'string',
          required: true,
        },
        {
          name: 'url',
          type: 'url',
          required: true,
        },
        {
          name: 'subNav',
          type: 'list',
          advanced: true,
          subFields: [
            {
              name: 'name',
              type: 'string',
              required: true,
            },
            {
              name: 'url',
              type: 'url',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "buttonList",
      type: "list",
      defaultValue: [
        { name: "VIP Member Login", url: "/", style: "primary"},
        { name: "Register", url: "/", style: "outline-primary" },
        { name: "Chat", url: "/", style: "outline-primary" },
      ],
      onChange: (options:any) => {
        const buttonList = options.get('buttonList');
        if(buttonList.length > 3){
          options.set('buttonList', buttonList.slice(0,3))
          alert('Maximum 3 buttons are allowed.');
        }
      },
      subFields: [
        {
          name: "name",
          type: "string",
          bubble: true,
          required: true,
        },
        {
          name: "url",
          type: "url",
          bubble: true,
          required: true,
        },
        {
          name: 'style',
          type: 'text',
          enum: [
            {
              label: 'primary',
              value: 'primary',
            },
            {
              label: 'outline-primary',
              value: 'outline-primary',
            },
            {
              label: 'secondary',
              value: 'secondary',
            },
            {
              label: 'outline-secondary',
              value: 'outline-secondary',
            },
          ],
        },
        {
          name: 'openLinkInNewTab',
          type: 'boolean',
          defaultValue: false,
          friendlyName: 'Open in new tab',
        },
      ]
    },
  ],
})
export class HeaderComponent implements OnInit {
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

  constructor(private renderer: Renderer2) { }
  ngOnInit(): void {
    
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
}
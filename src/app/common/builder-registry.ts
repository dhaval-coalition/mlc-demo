// builder-registry.ts
import { RegisteredComponent } from "@builder.io/sdk-angular";
import { AboutBeVipComponent } from "./pages-common/about-be-vip/about-be-vip.component";
import { AboutReviewComponent } from "./pages-common/about-review/about-review.component";
import { AboutVipPaysComponent } from "./pages-common/about-vip-pays/about-vip-pays.component";
import { AboutWeDifferentComponent } from "./pages-common/about-we-different/about-we-different.component";
import { AccordionStoreLocationsComponent } from "./pages-common/accordion-store-locations/accordion-store-locations.component";
import { BestChoiceForYouComponent } from "./pages-common/best-choice-for-you/best-choice-for-you.component";
import { BlogHeroComponent } from "./pages-common/blog-hero/blog-hero.component";
import { BlogTopContentComponent } from "./pages-common/blog-top-content/blog-top-content.component";
import { CardBlockComponent } from "./pages-common/card-block/card-block.component";
import { ContactTopInfoComponent } from "./pages-common/contact-top-info/contact-top-info.component";
import { IconWithTitleComponent } from "./pages-common/icon-with-title/icon-with-title.component";
import { LoansFaqComponent } from "./pages-common/loans-faq/loans-faq.component";
import { LoansHeroBannerComponent } from "./pages-common/loans-hero-banner/loans-hero-banner.component";
import { ReviewWidgetComponent } from "./pages-common/review-widget/review-widget.component";
import { SectionFaqComponent } from "./pages-common/section-faq/section-faq.component";
import { SingleLocationHeroComponent } from "./pages-common/single-location-hero/single-location-hero.component";
import { TableWidgetComponent } from "./pages-common/table-widget/table-widget.component";
import { TableWidget2Component } from "./pages-common/table-widget-2/table-widget-2.component";
import { WeOfferComponent } from "./pages-common/we-offer/we-offer.component";
import { WhatYouNeedComponent } from "./pages-common/what-you-need/what-you-need.component";
import { HeaderComponent } from "../layout/header/header.component";
import { FooterComponent } from "../layout/footer/footer.component";
import { DownloadAppComponent } from "./home-page-common/download-app/download-app.component";
import { FaqComponent } from "./home-page-common/faq/faq.component";
import { HeroBannerComponent } from "./home-page-common/hero-banner/hero-banner.component";
import { HowItWorksComponent } from "./home-page-common/how-it-works/how-it-works.component";
import { ImageContentComponent } from "./home-page-common/image-content/image-content.component";
import { InformationHubComponent } from "./home-page-common/information-hub/information-hub.component";
import { ReviewsComponent } from "./home-page-common/reviews/reviews.component";
import { TypesOfServicesComponent } from "./home-page-common/types-of-services/types-of-services.component";
import { VipComponent } from "./home-page-common/vip/vip.component";
import { VipCanComponent } from "./home-page-common/vip-can/vip-can.component";
import { WeServeComponent } from "./home-page-common/we-serve/we-serve.component";
import { WhatYourFundsComponent } from "./home-page-common/what-your-funds/what-your-funds.component";

export const customComponents: RegisteredComponent[] = [
  {
    component: AboutBeVipComponent,
    name: "About be vip",
    meta: {
      selector: 'app-about-be-vip',
      standalone: true
    },
    inputs: [
      {
        name: 'backgroundColor',
        friendlyName: 'Background Color',
        type: 'color',
        defaultValue: '#EBF7F0',
      },
      {
        name: 'sectionTitle',
        type: 'string',
        defaultValue: 'Be a Minute Loan Center VIP!',
        friendlyName: 'Title',
      },
      {
        name: 'beVipItems',
        type: 'list',
        friendlyName:"Items",
        defaultValue:[
          {
            icon:"https://placehold.co/80x80",
            itemName:"Item Title",
          },
          {
            icon:"https://placehold.co/80x80",
            itemName:"Item Title",
          },
          {
            icon:"https://placehold.co/80x80",
            itemName:"Item Title",
          }
        ],
        subFields:[
          {
            name: "icon",
            type: "file",
            allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
            friendlyName: "Icon",
          },
          {
            name: 'iconImageAlt',
            type: 'string',
            defaultValue: '',
            friendlyName: 'Alt text',
          },
          {
            name: "itemName",
            type: "string",
            friendlyName: "Name",
          },
          {
            name: 'itemDescription',
            type: 'html',
            friendlyName: 'Description',
          },
        ]
      }
    ]
  },
  {
    component: AboutReviewComponent,
    name: "About review",
    meta: {
      selector: 'app-about-review',
      standalone: true
    },
    inputs: [
      {
        name: 'sectionTitle',
        type: 'string',
        defaultValue: 'We Treat You Like We Would Want to Be Treated.',
        friendlyName: 'Title',
      },
      {
        name: 'buttonStyle',
        type: 'object',
        friendlyName: 'Button',
        defaultValue: {
          text: 'Apply Now!',
          url: '/',
          variant: 'secondary',
          targetBlank: false,
        },
        subFields: [
          {
            name: 'text',
            type: 'string',
          },
          {
            name: 'url',
            type: 'url',
          },
          {
            name: 'variant',
            type: 'string',
            enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
          },
          {
            name: 'targetBlank',
            type: 'boolean',
            friendlyName: 'Open link in new tab',
          },
        ],
      },
      {
        name: 'sectionBottomTitle',
        type: 'string',
        defaultValue: 'Get the Money You Need.',
        friendlyName: 'Title',
      },
    ]
  },
  {
    component: AboutVipPaysComponent,
    name: 'About vip pays',
    meta: {
      selector: 'app-about-vip-pays',
      standalone: true
    },
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
  },
  {
    component: AboutWeDifferentComponent,
    name: "About we different",
    meta: {
      selector: 'app-about-we-different',
      standalone: true
    },
    inputs: [
      {
        name: 'sectionTitle',
        type: 'string',
        defaultValue: 'We’re Different.',
        friendlyName: 'Title',
      },
      {
        name: 'weDifferentItems',
        type: 'list',
        friendlyName: "Items",
        defaultValue: [
          {
            icon: "https://placehold.co/48x48",
            iconBackgroundColor: '#2E67B1',
            itemName: "Item Title",
          },
          {
            icon: "https://placehold.co/48x48",
            iconBackgroundColor: '#2E67B1',
            itemName: "Item Title",
          },
          {
            icon: "https://placehold.co/48x48",
            iconBackgroundColor: '#2E67B1',
            itemName: "Item Title",
          }
        ],
        subFields: [
          {
            name: "icon",
            type: "file",
            allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
            friendlyName: "Icon",
          },
          {
            name: 'iconImageAlt',
            type: 'string',
            defaultValue: '',
            friendlyName: 'Alt text',
          },
          {
            name: 'iconBackgroundColor',
            friendlyName: 'Background Color',
            type: 'color',
          },
          {
            name: "itemName",
            type: "string",
            friendlyName: "Name",
          }
        ]
      },
      {
        name: 'buttonStyle',
        type: 'object',
        friendlyName: 'Button',
        defaultValue: {
          text: 'Apply Now!',
          url: '/',
          variant: 'secondary',
          targetBlank: false,
        },
        subFields: [
          {
            name: 'text',
            type: 'string',
          },
          {
            name: 'url',
            type: 'url',
          },
          {
            name: 'variant',
            type: 'string',
            enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
          },
          {
            name: 'targetBlank',
            type: 'boolean',
            friendlyName: 'Open link in new tab',
          },
        ],
      },
    ]
  },
  {
    component: AccordionStoreLocationsComponent,
    name: "Accordion store locations",
    meta: {
      selector: 'app-accordion-store-locations',
      standalone: true
    },
    inputs: [
      {
        name: 'sectionTitle',
        type: 'string',
        friendlyName: 'Title',
        defaultValue: "Store Locations:",
      },
      {
        name: 'store',
        type: 'list',
        friendlyName: 'Items',
        subFields: [
          {
            name: 'storeQue',
            type: 'string',
            friendlyName: 'Item title',
            defaultValue: 'Item title',
          },
          {
            name: 'storeHoursSettingObject',
            type: 'object',
            friendlyName: 'Store Hours Setting',
            defaultValue: {
              contentTitle1: "Store Hours",
              storeHours: [
                { storeHoursWeek: 'Monday', storeHoursTime: '9 AM–6 PM' },
                { storeHoursWeek: 'Tuesday', storeHoursTime: '9 AM–6 PM' },
                { storeHoursWeek: 'Wednesday', storeHoursTime: '9 AM–6 PM' },
                { storeHoursWeek: 'Thursday', storeHoursTime: '9 AM–6 PM' },
                { storeHoursWeek: 'Friday', storeHoursTime: '9 AM–6 PM' },
                { storeHoursWeek: 'Saturday', storeHoursTime: '9 AM–3 PM' },
                { storeHoursWeek: 'Sunday', storeHoursTime: 'Closed' },
              ]
            },
            subFields: [
              {
                name: 'contentTitle1',
                type: 'string',
                friendlyName: 'Section Title',
              },
              {
                name: 'storeHours',
                type: 'list',
                friendlyName: 'Items',
                subFields: [
                  {
                    name: 'storeHoursWeek',
                    type: 'string',
                    friendlyName: 'Week',
                  },
                  {
                    name: 'storeHoursTime',
                    type: 'string',
                    friendlyName: 'Time',
                  },
                ]
              }
            ]
          },
          {
            name: 'locationSettingObject',
            type: 'object',
            friendlyName: 'Location Setting',
            defaultValue: {
              contentTitle2: "Location",
              storeAddress: '',
              buttonStyle: {
                text: 'Let’s Get Started',
                url: '/',
                variant: 'secondary',
                targetBlank: false,
              },
            },
            subFields: [
              {
                name: 'contentTitle2',
                type: 'string',
                friendlyName: 'Section Title',
              },
              {
                name: 'storeAddress',
                type: 'html',
                friendlyName: 'Item content',
              },
              {
                name: 'buttonStyle',
                type: 'object',
                friendlyName: 'Button',
                subFields: [
                  {
                    name: 'text',
                    type: 'string',
                  },
                  {
                    name: 'url',
                    type: 'url',
                  },
                  {
                    name: 'variant',
                    type: 'string',
                    enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
                  },
                  {
                    name: 'targetBlank',
                    type: 'boolean',
                    friendlyName: 'Open link in new tab',
                  },
                ],
              }
            ]
          },
          {
            name: 'mapSettingObject',
            type: 'object',
            friendlyName: 'Map Setting',
            subFields: [
              {
                name: 'mapEmbedCode',
                type: 'html',
                friendlyName: 'Map Embed Code',
              }
            ]
          }
        ]
      }
    ]
  },
  {
    component: BestChoiceForYouComponent,
    name: "Best choice for you",
    meta: {
      selector: 'app-best-choice-for-you',
      standalone: true
    },
    inputs: [
      {
        name: 'backgroundColor',
        friendlyName: 'Background Color',
        type: 'color',
        defaultValue: '#EBF7F0',
      },
      {
        name: 'sectionTitle',
        type: 'string',
        defaultValue: 'Why is Minute Loan Center the Best Choice For You?',
        friendlyName: 'Title',
      },
      {
        name: 'largeText',
        type: 'boolean',
        friendlyName: 'Large Description Text',
      },
      {
        name: 'sectionDescription',
        type: 'html',
        defaultValue: 'Enter some text...',
        friendlyName: 'Description',
      },
      {
        name: 'bestChoiceItems',
        type: 'list',
        friendlyName:"Items",
        defaultValue:[
          {
            icon:"https://placehold.co/48x48",
            iconBackgroundColor: '#2E67B1',
            itemName:"Item Title",
          },
          {
            icon:"https://placehold.co/48x48",
            iconBackgroundColor: '#2E67B1',
            itemName:"Item Title",
          },
          {
            icon:"https://placehold.co/48x48",
            iconBackgroundColor: '#2E67B1',
            itemName:"Item Title",
          }
        ],
        subFields:[
          {
            name: "icon",
            type: "file",
            allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
            friendlyName: "Icon",
          },
          {
            name: 'iconImageAlt',
            type: 'string',
            defaultValue: '',
            friendlyName: 'Alt text',
          },
          {
            name: 'iconBackgroundColor',
            friendlyName: 'Background Color',
            type: 'color',
          },
          {
            name: "itemName",
            type: "string",
            friendlyName: "Name",
          },
          {
            name: 'itemDescription',
            type: 'html',
            friendlyName: 'Description',
          },
        ]
      }
    ]
  },
  {
    component: BlogHeroComponent,
    name: "Blog hero",
    meta: {
      selector: 'app-blog-hero',
      standalone: true
    },
    inputs:[
      {
        name:'bgImage',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
        friendlyName: "Image",
        defaultValue: "https://placehold.co/1600x248",
      },
      {
        name: 'sectionTitle',
        type: 'string',
        friendlyName: 'Title',
        defaultValue: "The Minute Blog",
      },
    ]
  },
  {
    component: BlogTopContentComponent,
    name: "Blog top content",
    meta: {
      selector: 'app-blog-top-content',
      standalone: true
    },
    inputs: [
      {
        name: 'sectionTitle',
        type: 'string',
        defaultValue: 'Welcome to The Minute Blog!',
        friendlyName: 'Title',
      },
      {
        name: 'sectionDescription',
        type: 'html',
        defaultValue: 'Enter some text...',
        friendlyName: 'Description',
      },
    ]
  },
  {
    component: CardBlockComponent,
    name: "Card block",
    meta: {
      selector: 'app-card-block',
      standalone: true
    },
    inputs:[
      {
        name:'sectionTitle',
        type: 'string',
        friendlyName: 'Title',
        defaultValue: '',
      },
      {
        name: 'cardBlockItems',
        type: 'list',
        friendlyName: 'Items',
        defaultValue: [],
        subFields: [
          {
            name: 'itemDescription',
            type: 'html',
            friendlyName: 'Description',
          },
        ]
      }
    ]
  },
  {
    component: ContactTopInfoComponent,
    name: "Contact top info",
    meta: {
      selector: 'app-contact-top-info',
      standalone: true
    },
    inputs: [
      {
        name: 'sectionTitle',
        type: 'string',
        friendlyName: 'Title',
        defaultValue: "Contact Minute Loan Center",
      },
      {
        name: 'contactAddress',
        type: 'html',
        defaultValue: 'Enter some text...',
        friendlyName: 'Contact Address',
      },
      {
        name: 'phone',
        type: 'string',
        friendlyName: 'Phone',
        defaultValue: "1-888-213-5744",
      },
      {
        name: 'mail',
        type: 'string',
        friendlyName: 'Mail',
        defaultValue: "questions@minuteloancenter.com",
      },
      {
        name: 'buttonStyle',
        type: 'object',
        friendlyName: 'Button',
        defaultValue: {
          text: 'See Our Retail Locations',
          url: '/',
          variant: 'secondary',
          targetBlank: false,
        },
        subFields: [
          {
            name: 'text',
            type: 'string',
          },
          {
            name: 'url',
            type: 'url',
          },
          {
            name: 'variant',
            type: 'string',
            enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
          },
          {
            name: 'targetBlank',
            type: 'boolean',
            friendlyName: 'Open link in new tab',
          },
        ],
      },
      {
        name: 'contactCard',
        type: 'object',
        friendlyName: 'Card info',
        defaultValue: {
          title: 'Title',
          text: 'Text',
          url: 'URL',
        },
        subFields: [
          {
            name: 'cardItems',
            friendlyName: 'Item',
            type: 'list',
            subFields: [
              {
                name: 'title',
                type: 'string',
              },
              {
                name: 'text',
                type: 'string',
              },
              {
                name: 'url',
                type: 'url',
              },
            ]
          },
        ],
      },
      {
        name: 'bottomDescription',
        type: 'html',
        friendlyName: 'Description',
        defaultValue: "Enter some text...",
      },
    ]
  },
  {
    component: IconWithTitleComponent,
    name: "Icon with title",
    meta: {
      selector: 'app-icon-with-title',
      standalone: true
    },
    inputs: [
      {
        name: 'iconWithTitleItems',
        type: 'list',
        friendlyName:"Items",
        defaultValue:[
          {
            icon:"https://placehold.co/80x80",
            itemName:"Item Title",
          },
          {
            icon:"https://placehold.co/80x80",
            itemName:"Item Title",
          },
          {
            icon:"https://placehold.co/80x80",
            itemName:"Item Title",
          },
          {
            icon:"https://placehold.co/80x80",
            itemName:"Item Title",
          }
        ],
        subFields:[
          {
            name: "icon",
            type: "file",
            allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
            friendlyName: "Icon",
          },
          {
            name: 'iconImageAlt',
            type: 'string',
            defaultValue: '',
            friendlyName: 'Alt text',
          },
          {
            name: "itemName",
            type: "string",
            friendlyName: "Name",
          }
        ]
      }
    ]
  },
  {
    component: LoansFaqComponent,
    name: "Faqs and qa",
    meta: {
      selector: 'app-loans-faq',
      standalone: true
    },
    inputs: [
      {
        name: 'sectionTitle',
        type: 'string',
        friendlyName: 'Title',
        defaultValue: "FAQs / Q&A",
      },
      {
        name: 'faqAccordionObject',
        type: 'object',
        friendlyName: 'FAQ Accordion',
        subFields: [
          {
            name: 'faqItems',
            type: 'list',
            friendlyName: 'Items',
            defaultValue: [],
            subFields: [
              {
                name: 'faqQue',
                type: 'string',
                friendlyName: 'Questions',
              },
              {
                name: 'faqAns',
                type: 'html',
                friendlyName: 'Answers',
              },
            ]
          },
        ]
      },
      {
        name: 'buttonStyle',
        type: 'object',
        friendlyName: 'Button',
        defaultValue: {
          text: 'Apply For a Loan',
          url: '/',
          variant: 'secondary',
          width: 'auto',
          targetBlank: false,
        },
        subFields: [
          {
            name: 'text',
            type: 'string',
          },
          {
            name: 'url',
            type: 'url',
          },
          {
            name: 'variant',
            type: 'string',
            enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
          },
          {
            name: 'width',
            type: 'string',
            defaultValue: 'large',
            enum: ['auto', 'medium', 'large'],
          },
          {
            name: 'targetBlank',
            type: 'boolean',
            friendlyName: 'Open link in new tab',
          },
        ],
      },
    ]
  },
  {
    component: LoansHeroBannerComponent,
    name: "Loans - hero banner",
    meta: {
      selector: 'app-loans-hero-banner',
      standalone: true
    },
    inputs: [
      {
        name: 'bgColor',
        friendlyName: 'Background Color',
        type: 'color',
        defaultValue: '#EEF3F9',
      },
      {
        name: 'sectionTitle',
        type: 'string',
        friendlyName: 'Title',
        defaultValue: 'Apply For A Fast Personal Loan - Choose your State',
      },
      {
        name: 'sectionDescription',
        type: 'html',
        defaultValue: 'Enter some text...',
        friendlyName: 'Description',
      },
      {
        name: 'heroFormFields',
        type: 'boolean',
        defaultValue: true,
      },
      {
        name: 'buttonStyle',
        type: 'object',
        friendlyName: 'Button',
        defaultValue: {
          text: 'See Our Store Locator',
          url: '/',
          variant: 'secondary',
          width: 'large',
          targetBlank: false,
        },
        subFields: [
          {
            name: 'text',
            type: 'string',
          },
          {
            name: 'url',
            type: 'url',
          },
          {
            name: 'variant',
            type: 'string',
            defaultValue: 'primary',
            enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
          },
          {
            name: 'width',
            type: 'string',
            defaultValue: 'large',
            enum: ['auto', 'medium', 'large'],
          },
          {
            name: 'targetBlank',
            type: 'boolean',
            friendlyName: 'Open link in new tab',
          },
        ],
      },
      {
        name: 'loansHeroThumb',
        friendlyName: 'Thumb Image',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
      },
      {
        name: 'loansHeroThumbAlt',
        type: 'string',
        defaultValue: '',
        friendlyName: 'Alt text',
      },
    ]
  },
  {
    component: ReviewWidgetComponent,
    name: "Review widget",
    meta: {
      selector: 'app-review-widget',
      standalone: true
    },
    inputs:[
      {
        name: 'bgColor',
        friendlyName: 'Background Color',
        type: 'color',
        defaultValue: '#EBF7F0',
      },
      {
        name: 'logoItems',
        type: 'list',
        subFields:[
          {
            name: 'logo',
            type: 'file',
            friendlyName: 'Logo',
            allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
          },
          {
            name: 'logoImageAlt',
            type: 'string',
            defaultValue: '',
            friendlyName: 'Alt text',
          }
        ]
      }
    ]
  },
  {
    component: SectionFaqComponent,
    name: "Section faq",
    meta: {
      selector: 'app-section-faq',
      standalone: true
    },
    inputs: [
      {
        name: 'sectionTitle',
        type: 'string',
        friendlyName: 'Title',
        defaultValue: "Title",
      },
      {
        name: 'faqAccordionObject',
        type: 'object',
        friendlyName:'FAQ Accordion',
        subFields:[
          {
            name: 'faqItems',
            type: 'list',
            friendlyName: 'Items',
            defaultValue: [],
            subFields: [
              {
                name: 'faqQue',
                type: 'string',
                friendlyName: 'Questions',
              },
              {
                name: 'faqAns',
                type: 'html',
                friendlyName: 'Answers',
              },
            ]
          },
        ]
      },
    ]
  },
  {
    component: SingleLocationHeroComponent,
    name: "Location - hero banner",
    meta: {
      selector: 'app-single-location-hero',
      standalone: true
    },
    inputs: [
      {
        name: 'bgColor',
        friendlyName: 'Background Color',
        type: 'color',
        defaultValue: '#EBF7F0',
      },
      {
        name: 'sectionTitle',
        type: 'string',
        friendlyName: 'Title',
        defaultValue: 'Title',
      },
      {
        name: 'sectionDescription',
        type: 'html',
        defaultValue: 'Minute Loan Center goes the extra mile to get you the funds you need.',
        friendlyName: 'Description',
      },
      {
        name: 'buttonStyle',
        type: 'object',
        friendlyName: 'Button 1',
        defaultValue: {
          text: 'Apply Now',
          url: '/',
          variant: 'secondary',
          targetBlank: false,
        },
        subFields: [
          {
            name: 'text',
            type: 'string',
          },
          {
            name: 'url',
            type: 'url',
          },
          {
            name: 'variant',
            type: 'string',
            defaultValue: 'secondary',
            enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
          },
          {
            name: 'targetBlank',
            type: 'boolean',
            friendlyName: 'Open link in new tab',
          },
        ],
      },
      {
        name: 'buttonStyle2',
        type: 'object',
        friendlyName: 'Button 2',
        defaultValue: {
          text: 'Find a Store',
          url: '/',
          variant: 'outline-secondary',
          targetBlank: false,
        },
        subFields: [
          {
            name: 'text',
            type: 'string',
          },
          {
            name: 'url',
            type: 'url',
          },
          {
            name: 'variant',
            type: 'string',
            defaultValue: 'outline-secondary',
            enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
          },
          {
            name: 'targetBlank',
            type: 'boolean',
            friendlyName: 'Open link in new tab',
          },
        ],
      },
      {
        name: 'singleLocationHeroThumb',
        friendlyName: 'Thumb Image',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
      },
      {
        name: 'thumbImageAlt',
        type: 'string',
        defaultValue: '',
        friendlyName: 'Alt text',
      },
    ]
  },
  {
    component: TableWidgetComponent,
    name: "Table",
    meta: {
      selector: 'app-table-widget',
      standalone: true
    },
    inputs: [
      {
        name: 'bgColor',
        friendlyName: 'Background Color',
        type: 'color',
        defaultValue: '#EEF3F9',
      },
      {
        name: 'sectionTitle',
        type: 'string',
        friendlyName: 'Title',
        defaultValue: "MLC Delaware Loan Products Provide Better Options",
      },
      {
        name: 'alignCenter',
        type: 'boolean',
        friendlyName: 'Align Center',
        helperText: 'Align the table content to the center.',
      },
      {
        name: 'textSmall',
        type: 'boolean',
        friendlyName: 'Text Small',
        helperText: 'Reduce the font size of the table content.',
      },
      {
        name: 'alternateBgChange',
        type: 'boolean',
        friendlyName: 'Disabled alternate background color',
        helperText: 'Disabled alternate background color for odd and even rows.',
      },
      {
        name: 'tableHeaders',
        type: 'list',
        friendlyName: 'Headers',
        subFields: [
          {
            name: 'header',
            type: 'string',
            friendlyName: 'Table Header',
          },
        ],
      },
      {
        name: 'tableRows',
        type: 'list',
        friendlyName: 'Rows',
        subFields: [
          {
            name: 'fixedBGColor',
            type: 'boolean',
            friendlyName: "Add gray background",
            helperText: "Add background color gray to row.",
          },
          {
            name: 'columns',
            type: 'list',
            friendlyName: 'Row Columns',
            subFields: [
              {
                name: 'columnValue',
                type: 'html',
                friendlyName: 'Column Value',
              },
            ],
          },
        ],
      },
      {
        name: 'sectionDescription',
        type: 'html',
        defaultValue: 'Enter some text...',
        friendlyName: 'Description (with small text)',
      },
      {
        name: 'sectionLargeDescription',
        type: 'html',
        defaultValue: 'Enter some text...',
        friendlyName: 'Description',
      },
      {
        name: 'licenseRegistration',
        type: 'object',
        friendlyName: 'License & Registration',
        defaultValue: {
          titleText: '',
          licenseItems: [
            {
              pdfFileUrl: '',
              pdfFileTargetBlank: false,
              thumbImage: '',
              thumbImageAlt: '',
            },
          ],
          licenseBottomDescription: '',
        },
        subFields: [
          {
            name: 'titleText',
            friendlyName: 'Title',
            type: 'string',
          },
          {
            name: 'licenseItems',
            type: 'list',
            friendlyName: 'Items',
            subFields: [
              {
                name: "pdfFileUrl",
                type: "file",
                allowedFileTypes: ['pdf', 'jpeg', 'jpg', 'png'],
                friendlyName: "PDF File",
              },
              {
                name: 'pdfFileTargetBlank',
                type: 'boolean',
                friendlyName: 'Open link in new tab',
              },
              {
                name: "thumbImage",
                type: "file",
                allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
                friendlyName: "Preview Thumb Image",
              },
              {
                name: 'thumbImageAlt',
                type: 'string',
                friendlyName: 'Alt text',
              },
            ]
          },
          {
            name: 'licenseBottomDescription',
            type: 'html',
            defaultValue: 'Enter some text...',
            friendlyName: 'Description',
          },
        ],
      },
      {
        name: 'buttonStyle',
        type: 'object',
        friendlyName: 'Button',
        defaultValue: {
          text: 'Apply Now',
          url: '/',
          variant: 'secondary',
          targetBlank: false,
        },
        subFields: [
          {
            name: 'text',
            type: 'string',
          },
          {
            name: 'url',
            type: 'url',
          },
          {
            name: 'variant',
            type: 'string',
            enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
          },
          {
            name: 'targetBlank',
            type: 'boolean',
            friendlyName: 'Open link in new tab',
          },
        ],
      },
    ],
  },
  {
    component: TableWidget2Component,
    name: "Fees Table",
    meta: {
      selector: 'app-table-widget-2',
      standalone: true
    },
    inputs: [
      {
        name: 'sectionTitle',
        type: 'string',
        friendlyName: 'Title',
        defaultValue: "Minute Loan Center Itemization of Charges – Revolving Credit (May 7, 2021)",
      },
      {
        name: 'tableArray',
        type: 'list',
        friendlyName: 'Table',
        subFields: [
          {
            name: 'header',
            type: 'string',
            friendlyName: 'Table Header',
          },
          {
            name: 'alternatingColor',
            type: 'boolean',
            friendlyName: 'Alternate Color Rows',
          },
          {
            name: 'tableRows',
            type: 'list',
            friendlyName: 'Rows',
            subFields: [
              {
                name: 'rowColspan',
                type: 'boolean',
                friendlyName: 'Row Colspan',
              },
              {
                name: 'columns',
                type: 'list',
                friendlyName: 'Row Columns',
                subFields: [
                  {
                    name: 'columnValue',
                    type: 'html',
                    friendlyName: 'Column Value',
                  },
                ],
              },
            ],
          },
        ]
      },
      {
        name: 'sectionDescription',
        type: 'html',
        defaultValue: 'Enter some text...',
        friendlyName: 'Description',
      },
      {
        name: 'licenseRegistration',
        type: 'object',
        friendlyName: 'License & Registration',
        defaultValue: {
          titleText: '',
          licenseItems: [
            {
              pdfFileUrl: '',
              pdfFileTargetBlank: false,
              thumbImage: '',
              thumbImageAlt: '',
            },
          ],
          licenseBottomDescription: '',
        },
        subFields: [
          {
            name: 'titleText',
            friendlyName: 'Title',
            type: 'string',
          },
          {
            name: 'licenseItems',
            type: 'list',
            friendlyName: 'Items',
            subFields: [
              {
                name: "pdfFileUrl",
                type: "file",
                allowedFileTypes: ['pdf', 'jpeg', 'jpg', 'png'],
                friendlyName: "PDF File",
              },
              {
                name: 'pdfFileTargetBlank',
                type: 'boolean',
                friendlyName: 'Open link in new tab',
              },
              {
                name: "thumbImage",
                type: "file",
                allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
                friendlyName: "Preview Thumb Image",
              },
              {
                name: 'thumbImageAlt',
                type: 'string',
                friendlyName: 'Alt text',
              },
            ]
          },
          {
            name: 'licenseBottomDescription',
            type: 'html',
            defaultValue: 'Enter some text...',
            friendlyName: 'Description',
          },
        ],
      },
      {
        name: 'buttonStyle',
        type: 'object',
        friendlyName: 'Button',
        defaultValue: {
          text: 'Apply Now',
          url: '/',
          variant: 'secondary',
          targetBlank: false,
        },
        subFields: [
          {
            name: 'text',
            type: 'string',
          },
          {
            name: 'url',
            type: 'url',
          },
          {
            name: 'variant',
            type: 'string',
            enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
          },
          {
            name: 'targetBlank',
            type: 'boolean',
            friendlyName: 'Open link in new tab',
          },
        ],
      },
    ],
  },
  {
    component: WeOfferComponent,
    name: "We offer",
    meta: {
      selector: 'app-we-offer',
      standalone: true
    },
    inputs:[
      {
        name: 'sectionTitle',
        type: 'string',
        friendlyName: 'Title',
        defaultValue: "Explore the Loan Products We Offer!",
      },
      {
        name: 'sectionDescription',
        type: 'html',
        defaultValue: 'Enter some text...',
        friendlyName: 'Description',
      },
      {
        name: 'items',
        type: 'list',
        friendlyName: 'Offer',
        subFields:[
          {
            name: 'bgColor',
            type: 'color',
            defaultValue: '#EEF3F9',
          },
          {
            name: 'itemDescription',
            type: 'html',
            defaultValue: 'Enter some text...',
            friendlyName: 'Description',
          },
          {
            name: 'descriptionItemIcons',
            friendlyName:'Item icons color',
            type: 'string',
            defaultValue: 'blue',
            enum: ['blue', 'green', 'yellow'],
          },
          {
            name: 'button',
            type: 'object',
            friendlyName:'Button',
            defaultValue: {
              text: 'Apply Now',
              url: '/',
              variant: 'secondary',
            },
            subFields: [
              {
                name: 'text',
                type: 'string',
              },
              {
                name: 'url',
                type: 'url',
              },
              {
                name: 'variant',
                type: 'string',
                defaultValue: 'secondary',
                enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
              },
            ],
          },
          {
            name: 'button2',
            type: 'object',
            friendlyName:'Button 2',
            defaultValue: {
              text: 'Learn More',
              url: '/',
              variant: 'primary',
            },
            subFields: [
              {
                name: 'text',
                type: 'string',
              },
              {
                name: 'url',
                type: 'url',
              },
              {
                name: 'variant',
                type: 'string',
                defaultValue: 'primary',
                enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
              },
            ],
          },
          {
            name: "thumbImage",
            type: "file",
            allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
            friendlyName: "Image",
            defaultValue: "https://placehold.co/451x451",
          },
          {
            name: 'thumbImageAlt',
            type: 'string',
            defaultValue: '',
            friendlyName: 'Alt text',
          },
        ]
      }
    ]
  },
  {
    component: WhatYouNeedComponent,
    name: "What you need",
    meta: {
      selector: 'app-what-you-need',
      standalone: true
    },
    inputs:[
      {
        name: 'whatYouNeedBgColor',
        type: 'color',
        defaultValue: '#EEF3F9',
      },
      {
        name:'whatYouNeedThumb',
        type:'file',
        defaultValue: 'https://placehold.co/451x362',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
      },
      {
        name: 'thumbImageAlt',
        type: 'string',
        defaultValue: '',
        friendlyName: 'Alt text',
      },
      {
        name:'sectionSubTitle',
        type: 'string',
        friendlyName: 'Title',
        defaultValue: 'What You Need to Apply:',
      },
      {
        name: 'whatYouNeedItems',
        type: 'list',
        friendlyName: 'Items',
        defaultValue: [],
        subFields: [
          {
            name:'icon',
            type: 'file',
            allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
            friendlyName: "Image",
            defaultValue: "https://placehold.co/48x48",
          },
          {
            name: 'iconImageAlt',
            type: 'string',
            defaultValue: '',
            friendlyName: 'Alt text',
          },
          {
            name:'name',
            type: 'string',
            friendlyName: "Item Name",
            defaultValue: "Name",
          }
        ]
      }
    ]
  },
  {
    component: HeaderComponent,
    name: "Header",
    meta: {
      selector: 'app-header',
      standalone: true
    },
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
  },
  {
    component: FooterComponent,
    name: "Footer",
    meta: {
      selector: 'app-footer',
      standalone: true
    },
    inputs: [
      {
        name: 'footerColumns',
        type: 'list',
        friendlyName: 'Column',
        defaultValue: [
          {
            footerNavLinks: [
              { name: 'Line of Credit', url: '#' },
              { name: 'Installment Loans', url: '#' }
            ]
          },
          {
            footerNavLinks: [
              { name: 'Careers', url: '#' },
              { name: 'Extra Mile', url: '#' },
              { name: 'FAQ', url: '#' },
              { name: 'Security Tips', url: '#' }
            ]
          },
          {
            footerNavLinks: [
              { name: 'Delaware', url: '#' },
              { name: 'Kansas', url: '#' },
              { name: 'Louisiana', url: '#' },
              { name: 'Mississippi', url: '#' },
              { name: 'Nevada', url: '#' },
              { name: 'South Carolina', url: '#' },
              { name: 'Utah', url: '#' }
            ]
          },
          {
            footerNavLinks: [
              { name: 'Contact Us', url: '#' },
              { name: 'Blog', url: '#' },
            ]
          }
        ],
        onChange: (options: any) => {
          const footerColumns = options.get('footerColumns');
          if (footerColumns.length > 4) {
            options.set('footerColumns', footerColumns.slice(0, 4))
            alert('Maximum 4 columns are allowed.')
          }
        },
        subFields: [
          {
            name: 'footerNavLinks',
            type: 'list',
            friendlyName: 'Items',
            subFields: [
              {
                name: 'name',
                type: 'string',
              },
              {
                name: 'url',
                type: 'url',
              }
            ]
          }
        ]
      },
      {
        name: 'footerCopyrightText',
        type: 'string',
        defaultValue: 'Minute Loan Center'
      },
      {
        name: 'footerBottomNavLinks',
        type: 'list',
        friendlyName: 'Items',
        defaultValue: [
          {
            name: 'Sitemap', url: '/',
          },
          {
            name: 'Site Credits', url: '/',
          },
          {
            name: 'Privacy Policy', url: '/',
          },
          {
            name: 'Accessibility Statement', url: '/',
          },
        ],
        subFields: [
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'url',
            type: 'url'
          }
        ]
      }
    ]
  },
  {
    component: DownloadAppComponent,
    name: "Download app",
    meta: {
      selector: 'app-download-app',
      standalone: true
    },
    inputs:[
      {
        name: 'bgColor',
        type: 'color',
        friendlyName:'Background Color',
        defaultValue: '#EBF7F0',
      },
      {
        name: "thumbImage1",
        type: "file",
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
        friendlyName: "Thumb Image 1",
        defaultValue: "https://placehold.co/183x373",
      },
      {
        name: 'thumbImageAlt1',
        type: 'string',
        defaultValue: '',
        friendlyName: 'Alt text',
      },
      {
        name: "thumbImage2",
        type: "file",
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
        friendlyName: "Thumb Image 2",
        defaultValue: "https://placehold.co/183x373",
      },
      {
        name: 'thumbImageAlt2',
        type: 'string',
        defaultValue: '',
        friendlyName: 'Alt text',
      },
      {
        name: 'circleBgColor',
        type: 'color',
        friendlyName:'Circle Background Color',
        defaultValue: '#2E67B1',
      },
      {
        name: 'sectionDescription',
        type: 'html',
        defaultValue: 'Enter some text...',
        friendlyName: 'Description',
      },
      {
        name: "thumbIcon1",
        type: "file",
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
        friendlyName: "Apple Store",
        defaultValue: "https://placehold.co/180x60",
      },
      {
        name: 'thumbIconAlt1',
        type: 'string',
        defaultValue: '',
        friendlyName: 'Alt text',
      },
      {
        name: 'thumbIcon1Url',
        type: 'url',
        friendlyName: 'Apple Store URL',
        defaultValue: '/',
      },
      {
        name: "thumbIcon2",
        type: "file",
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
        friendlyName: "Google Store",
        defaultValue: "https://placehold.co/180x60",
      },
      {
        name: 'thumbIconAlt2',
        type: 'string',
        defaultValue: '',
        friendlyName: 'Alt text',
      },
      {
        name: 'thumbIcon2Url',
        type: 'url',
        friendlyName: 'Google Store URL',
        defaultValue: '/',
      },
    ]
  },
  {
    component: FaqComponent,
    name: "Faq",
    meta: {
      selector: 'app-faq',
      standalone: true
    },
    inputs: [
      {
        name: 'bgColor',
        friendlyName: 'Background Color',
        type: 'color',
        defaultValue: '#EEF3F9',
      },
      {
        name: 'sectionTitle',
        type: 'string',
        friendlyName: 'Title',
        defaultValue: "FAQs (Who We Serve)",
      },
      {
        name: 'sectionDescription',
        type: 'html',
        defaultValue: 'Enter some text...',
        friendlyName: 'Description',
      },
      {
        name: 'faqObject',
        type: 'object',
        friendlyName: 'FAQ Icons',
        defaultValue: {
          iconsBgColor: '#2E67B1',
          faqIcons: [
            {
              itemsImage: "https://placehold.co/48x48",
              itemName: "Name",
            }
          ]
        },
        subFields: [
          {
            name: 'iconsBgColor',
            friendlyName: 'Background Color',
            type: 'color',
          },
          {
            name: 'faqIcons',
            type: 'list',
            friendlyName: 'Icons',
            subFields: [
              {
                name: 'itemsImage',
                friendlyName: 'Icon',
                type: 'file',
                allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
              },
              {
                name: 'iconImageAlt',
                type: 'string',
                defaultValue: '',
                friendlyName: 'Alt text',
              },
              {
                name: 'itemName',
                type: 'string',
                friendlyName: 'Name',
                defaultValue: "FAQs (Who We Serve)",
              }
            ]
          }
        ]
      },
      {
        name: 'faqAccordionObject',
        type: 'object',
        friendlyName: 'FAQ Accordion',
        defaultValue: {
          accordionBlockTitle: "We can help you get funded in minutes!",
          disclosuresDescription: "Enter some text...",
          button: [
            {
              text: 'Apply For a Loan',
              url: '/',
              variant: 'secondary',
            }
          ]
        },
        subFields: [
          {
            name: 'accordionBlockTitle',
            type: 'string',
            friendlyName: 'Title',
          },
          {
            name: 'faqItems',
            type: 'list',
            friendlyName: 'Items',
            defaultValue: [],
            subFields: [
              {
                name: 'faqQue',
                type: 'string',
                friendlyName: 'Questions',
              },
              {
                name: 'faqAns',
                type: 'html',
                friendlyName: 'Answers',
              },
            ]
          },
          {
            name: 'disclosuresDescription',
            type: 'html',
            friendlyName: 'Disclosure',
          },
        ]
      },
      {
        name: 'buttonStyle',
        type: 'object',
        friendlyName: 'Button',
        defaultValue: {
          text: 'Visit Our Retail Locations',
          url: '/',
          variant: 'secondary',
        },
        subFields: [
          {
            name: 'text',
            type: 'string',
          },
          {
            name: 'url',
            type: 'url',
          },
          {
            name: 'variant',
            type: 'string',
            enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
          },
          {
            name: 'targetBlank',
            type: 'boolean',
            friendlyName: 'Open link in new tab',
          },
        ],
      },
    ]
  },
  {
    component: HeroBannerComponent,
    name: "Home hero banner",
    meta: {
      selector: 'app-hero-banner',
      standalone: true
    },
    inputs: [
      {
        name: 'slider',
        type: 'list',
        friendlyName: 'Slide',
        subFields: [
          {
            name: 'mediaType',
            type: 'string',
            enum: ['video', 'image'],
            defaultValue: 'image',
            friendlyName: 'Media Type',
          },
          {
            name: 'heroBackgroundVideo',
            type: 'file',
            allowedFileTypes: ['mp4'],
            defaultValue: '',
            friendlyName: 'Background Video',
          },
          {
            name: 'posterImage',
            type: 'file',
            allowedFileTypes: ['jpeg', 'png'],
            helperText: 'Image to show before the video plays',
          },
          {
            name: 'heroBackgroundImage',
            type: 'file',
            allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
            defaultValue: '',
            friendlyName: 'Background Image',
          },
          {
            name: 'heroImageAlt',
            type: 'string',
            defaultValue: '',
            friendlyName: 'Alt text',
          },
          {
            name: 'heroTitle',
            type: 'string',
            defaultValue: 'Enter some text...',
          },
          {
            name: 'heroDescription',
            type: 'longText',
            defaultValue: 'Enter some text...',
          },
          {
            name: 'bulletPoint',
            type: 'list',
            subFields: [
              {
                name: 'icon',
                type: 'file',
                allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
                defaultValue: 'https://placehold.co/40x40',
              },
              {
                name: 'iconImageAlt',
                type: 'string',
                defaultValue: '',
                friendlyName: 'Alt text',
              },
              {
                name: 'name',
                type: 'string',
                defaultValue: 'Enter some text...',
              },
            ]
          },
          {
            name: 'buttonStyle',
            type: 'object',
            friendlyName: 'Button',
            defaultValue: {
              text: 'Apply now',
              url: '/',
              variant: 'secondary',
            },
            subFields: [
              {
                name: 'text',
                type: 'string',
              },
              {
                name: 'url',
                type: 'url',
              },
              {
                name: 'variant',
                type: 'string',
                enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
              },
            ],
          }
        ]
      },
    ],
  },
  {
    component: HowItWorksComponent,
    name: "How it works",
    meta: {
      selector: 'app-how-it-works',
      standalone: true
    },
    inputs: [
      {
        name: 'sectionTitle',
        type: 'string',
        defaultValue: 'How It Works',
        friendlyName: 'Title',
      },
      {
        name: 'sectionDescription',
        type: 'html',
        defaultValue: 'Enter some text...',
        friendlyName: 'Description',
      },
      {
        name: 'howItWorkItems',
        type: 'list',
        friendlyName:"Items",
        defaultValue:[
          {
            icon:"",
            itemName:"Fast Application",
            itemDescription:"Our easy form takes only a minute or two – no credit hit1, no headaches."
          },
          {
            icon:"",
            itemName:"Quick Approval",
            itemDescription:"Receive your online loan approval in minutes, with no hits to your credit!1"
          },
          {
            icon:"",
            itemName:"Instant Funding",
            itemDescription:"Same-day loans just got faster. Get your deposit in seconds."
          }
        ],
        subFields:[
          {
            name: "icon",
            type: "file",
            allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
            friendlyName: "Icon",
          },
          {
            name: 'iconAlt',
            type: 'string',
            defaultValue: '',
            friendlyName: 'Alt text',
          },
          {
            name: "itemName",
            type: "string",
            friendlyName: "Name",
            defaultValue: "Name",
          },
          {
            name: "itemDescription",
            type: "string",
            friendlyName: "Description",
            defaultValue: "Description",
          }
        ]
      }
    ]
  },
  {
    component: ImageContentComponent,
    name: "Image with content",
    meta: {
      selector: 'app-image-content',
      standalone: true
    },
    inputs: [
      {
        name: 'bgColor',
        type: 'color',
        defaultValue: '#EBF7F0',
      },
      {
        name: 'bannerImage',
        type: 'file',
        defaultValue: 'https://placehold.co/451x362',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
      },
      {
        name: 'bannerImageAlt',
        type: 'string',
        defaultValue: '',
        friendlyName: 'Alt text',
      },
      {
        name: 'descriptionBlock',
        type: 'html',
        defaultValue: 'Enter some text...',
        friendlyName: 'Description',
      },
      {
        name: 'buttonStyle',
        type: 'object',
        friendlyName: 'Button',
        defaultValue: {
          text: 'Apply Now!',
          url: '/',
          variant: 'primary',
          targetBlank: false,
        },
        subFields: [
          {
            name: 'text',
            type: 'string',
          },
          {
            name: 'url',
            type: 'url',
          },
          {
            name: 'variant',
            type: 'string',
            defaultValue: 'primary',
            enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
          },
          {
            name: 'targetBlank',
            type: 'boolean',
            friendlyName: 'Open link in new tab',
          },
        ],
      },
    ]
  },
  {
    component: InformationHubComponent,
    name: "Information hub",
    meta: {
      selector: 'app-information-hub',
      standalone: true
    },
    inputs: [
      {
        name: 'sectionTitle',
        type: 'string',
        friendlyName: 'Title',
        defaultValue: "Information Hub",
      },
      {
        name: 'sectionDescription',
        type: 'html',
        defaultValue: 'Enter some text...',
        friendlyName: 'Description',
      }
    ]
  },
  {
    component: ReviewsComponent,
    name: "Home review",
    meta: {
      selector: 'app-reviews',
      standalone: true
    },
    inputs:[
      {
        name: 'reviewTitle',
        type: 'string',
        friendlyName: 'Title',
        defaultValue: 'Minute Loan Center'
      },
      {
        name: 'reviewSubTitle',
        type: 'string',
        friendlyName: 'Sub Title',
        defaultValue: 'Vetted by Experts. Trusted by Thousands.'
      },
      {
        name: 'reviewDescription',
        type: 'html',
        defaultValue: 'Enter some text...',
        friendlyName: 'Description',
      },
      {
        name: 'reviewLogo1',
        type: 'file',
        defaultValue: '',
        bubble: true,
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
        friendlyName: 'Logo 1',
      },
      {
        name: 'reviewLogo1Alt',
        type: 'string',
        defaultValue: '',
        friendlyName: 'Alt text',
      },
      {
        name: 'bulletPoint',
        type: 'list',
        friendlyName: 'Items',
        subFields:[
          {
            name: 'icon',
            type: 'file',
            bubble: true,
            allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
          },
          {
            name: 'iconAlt',
            type: 'string',
            defaultValue: '',
            friendlyName: 'Alt text',
          },
          {
            name: 'name',
            type: 'string',
            friendlyName: 'Name',
            defaultValue: 'Name'
          },
        ]
      }
    ]
  },
  {
    component: TypesOfServicesComponent,
    name: "Types of services",
    meta: {
      selector: 'app-types-of-services',
      standalone: true
    },
    inputs: [
      {
        name: 'bgColor',
        type: 'color',
        defaultValue: '#ffffff',
      },
      {
        name: 'sectionTitle',
        type: 'string',
        friendlyName: 'Title',
        defaultValue: "See Our Different Types of Services",
      },
      {
        name: 'items',
        type: 'list',
        friendlyName: 'Services',
        subFields: [
          {
            name: 'itemDescription',
            type: 'html',
            defaultValue: 'Enter some text...',
            friendlyName: 'Description',
          },
          {
            name: 'button',
            type: 'object',
            friendlyName: 'Button',
            defaultValue: {
              text: 'Learn More',
              url: '/',
              variant: 'primary',
              targetBlank: false,
            },
            subFields: [
              {
                name: 'text',
                type: 'string',
              },
              {
                name: 'url',
                type: 'url',
              },
              {
                name: 'variant',
                type: 'string',
                defaultValue: 'primary',
                enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
              },
              {
                name: 'targetBlank',
                type: 'boolean',
                friendlyName: 'Open link in new tab',
              },
            ],
          },
          {
            name: "thumbImage",
            type: "file",
            allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
            friendlyName: "Image",
            defaultValue: "https://placehold.co/451x451",
          },
          {
            name: 'thumbImageAlt',
            type: 'string',
            defaultValue: '',
            friendlyName: 'Alt text',
          },
          {
            name: 'imagePosition',
            type: 'string',
            friendlyName: 'Image Position',
            defaultValue: 'Right',
            enum: ['Left', 'Right'],
          },
        ]
      },
      {
        name: 'buttonStyle',
        type: 'object',
        friendlyName: 'Button',
        defaultValue: {
          text: 'Apply for a Loan',
          url: '/',
          variant: 'secondary',
          targetBlank: false,
        },
        subFields: [
          {
            name: 'text',
            type: 'string',
          },
          {
            name: 'url',
            type: 'url',
          },
          {
            name: 'variant',
            type: 'string',
            enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
          },
          {
            name: 'targetBlank',
            type: 'boolean',
            friendlyName: 'Open link in new tab',
          },
        ],
      },
    ]
  },
  {
    component: VipComponent,
    name: "Vip",
    meta: {
      selector: 'app-vip',
      standalone: true
    },
    inputs:[
      {
        name: 'sectionTitle',
        type: 'string',
        friendlyName: 'Title',
        defaultValue: "Be a Minute Loan Center VIP",
      },
      {
        name: 'sectionDescription',
        type: 'html',
        defaultValue: 'Enter some text...',
        friendlyName: 'Description',
      },
      {
        name: 'vipBlockItems',
        type: 'list',
        friendlyName:"Items",
        defaultValue:[
          {
            icon:"https://placehold.co/80x80",
            itemName:"Name",
            itemDescription:"Description"
          }
        ],
        subFields:[
          {
            name: "icon",
            type: "file",
            allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
            friendlyName: "Icon",
          },
          {
            name: 'iconImageAlt',
            type: 'string',
            defaultValue: '',
            friendlyName: 'Alt text',
          },
          {
            name: "itemName",
            type: "string",
            friendlyName: "Name",
          },
          {
            name: "itemDescription",
            type: "string",
            friendlyName: "Description",
          }
        ]
      }
    ]
  },
  {
    component: VipCanComponent,
    name: "Vip can",
    meta: {
      selector: 'app-vip-can',
      standalone: true
    },
    inputs:[
      {
        name: 'sectionFullWidth',
        friendlyName: 'Remove Left/Right Spacing',
        type: 'boolean',
        defaultValue: false,
      },
      {
        name: 'sectionHeadTitle',
        type: 'string',
        defaultValue: 'How It Works',
        friendlyName: 'Title',
      },
      {
        name: 'sectionHeadDescription',
        type: 'html',
        defaultValue: 'Enter some text...',
        friendlyName: 'Description',
      },
      {
        name:'bannerImage',
        type:'file',
        defaultValue: 'https://placehold.co/451x451',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
      },
      {
        name: 'bannerImageAlt',
        type: 'string',
        defaultValue: '',
        friendlyName: 'Alt text',
      },
      {
        name: 'sectionTitle',
        type: 'string',
        defaultValue: 'Minute Loan Center VIPs can:',
        friendlyName: 'Title',
      },
      {
        name: 'vipItems',
        type: 'list',
        friendlyName: 'Items',
        subFields: [
          {
            name:'icon',
            type: 'file',
            allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
            friendlyName: "Image",
            defaultValue: "https://placehold.co/48x48",
          },
          {
            name: 'iconImageAlt',
            type: 'string',
            defaultValue: '',
            friendlyName: 'Alt text',
          },
          {
            name:'itemName',
            type: 'string',
            friendlyName: "Item Name",
            defaultValue: "Name",
          },
          {
            name: 'itemDescription',
            type: 'html',
            defaultValue: 'Enter some text...',
            friendlyName: 'Description',
          },
        ]
      },
    ]
  },
  {
    component: WeServeComponent,
    name: "We serve",
    meta: {
      selector: 'app-we-serve',
      standalone: true
    },
    inputs: [
      {
        name: 'locationType',
        type: 'object',
        friendlyName: 'Location Type',
        defaultValue: {
          name: 'All Locations',
        },
        subFields: [
          {
            name: 'Type',
            type: 'string',
            enum: ['All Locations', 'Type 1', 'Type 2', 'Type 3', 'Type 4', 'Type 5'],
          },
        ],
      },
      {
        name: 'hideLabel',
        type: 'boolean',
        friendlyName: 'Hide location guide label',
      },
      {
        name: 'sectionTitle',
        type: 'string',
        defaultValue: 'We Serve the Following States!',
        friendlyName: 'Title',
      },
      {
        name: "itemDescription",
        type: "html",
        friendlyName: "Description",
        defaultValue: "Description",
      },
      {
        name: 'buttonStyle',
        type: 'object',
        friendlyName: 'Button',
        defaultValue: {
          text: 'Visit Our Retail Locations',
          url: '/',
          variant: 'primary',
          targetBlank: false,
        },
        subFields: [
          {
            name: 'text',
            type: 'string',
          },
          {
            name: 'url',
            type: 'url',
          },
          {
            name: 'variant',
            type: 'string',
            enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
          },
          {
            name: 'targetBlank',
            type: 'boolean',
            friendlyName: 'Open link in new tab',
          },
        ],
      },
    ]
  },
  {
    component: WhatYourFundsComponent,
    name: "What your funds",
    meta: {
      selector: 'app-what-your-funds',
      standalone: true
    },
    inputs: [
      {
        name: 'bgColor',
        type: 'color',
        defaultValue: '#EEF3F9',
      },
      {
        name: 'sectionTitle',
        type: 'string',
        friendlyName: 'Title',
        defaultValue: "What Your Funds Can Cover:",
      },
      {
        name: 'buttonStyle',
        type: 'object',
        friendlyName: 'Button',
        defaultValue: {
          text: 'Apply Now!',
          url: '/',
          variant: 'secondary',
          targetBlank: false,
        },
        subFields: [
          {
            name: 'text',
            type: 'string',
          },
          {
            name: 'url',
            type: 'url',
          },
          {
            name: 'variant',
            type: 'string',
            enum: ['primary', 'outline-primary', 'secondary', 'outline-secondary'],
          },
          {
            name: 'targetBlank',
            type: 'boolean',
            friendlyName: 'Open link in new tab',
          },
        ],
      },
      {
        name: 'fundsItems',
        type: 'list',
        friendlyName: 'Items',
        subFields: [
          {
            name: 'icon',
            type: 'file',
            allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
            friendlyName: "Image",
            defaultValue: "https://placehold.co/48x48",
          },
          {
            name: 'iconImageAlt',
            type: 'string',
            defaultValue: '',
            friendlyName: 'Alt text',
          },
          {
            name: 'name',
            type: 'string',
            friendlyName: "Item Name",
            defaultValue: "Name",
          }
        ]
      },
      {
        name: 'sectionBottomTitle',
        type: 'string',
        friendlyName: 'Bottom Title',
        defaultValue: "…and anything else you need!",
      },
    ]
  }
];

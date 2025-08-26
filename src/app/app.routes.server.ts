import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: "",
    renderMode: RenderMode.Client
  },
  {
    path: "about",
    renderMode: RenderMode.Client
  },
  {
    path: "contact",
    renderMode: RenderMode.Client
  },
  {
    path: "loans",
    renderMode: RenderMode.Client
  },
  {
    path: "locations",
    renderMode: RenderMode.Client
  },
  {
    path: 'locations-detail',
    renderMode: RenderMode.Client
  },
  {
    path: "blog",
    renderMode: RenderMode.Client
  },
  {
    path: "blog-detail",
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];

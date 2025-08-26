import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: "",
    renderMode: RenderMode.Server
  },
  {
    path: "about",
    renderMode: RenderMode.Server
  },
  {
    path: "contact",
    renderMode: RenderMode.Server
  },
  {
    path: "loans",
    renderMode: RenderMode.Server
  },
  {
    path: "locations",
    renderMode: RenderMode.Server
  },
  {
    path: 'locations-detail',
    renderMode: RenderMode.Server
  },
  {
    path: "blog",
    renderMode: RenderMode.Server
  },
  {
    path: "blog-detail",
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];

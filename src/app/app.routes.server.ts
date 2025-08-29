import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Specific dynamic routes that need server-side rendering
  {
    path: 'locations/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Server
  },
  // Static routes that can be prerendered
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'contact',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'loans',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'locations',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'blog',
    renderMode: RenderMode.Prerender
  },
  // Catch-all for dynamic pages (careers, extra-mile, installment-loans, etc.)
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];

# Angular SSR/SSG Deployment Guide for Vercel

## Issues Fixed

This guide addresses the following issues that were causing pages to render as the homepage:

1. **URL Detection Problems**: Components were falling back to homepage (`"/"`) when URL detection failed during SSR
2. **Route Parameter Handling**: Dynamic routes weren't properly extracting slug parameters during server-side rendering
3. **Builder.io Content Fetching**: Components were requesting homepage content instead of page-specific content
4. **Vercel Configuration**: Missing proper routing configuration for Angular SSR/SSG

## Changes Made

### 1. Component URL Detection Fixes

**Blog Details Component** (`src/app/pages/blogs-pages/blog-details/blog-details.component.ts`):
- Updated `getUrlPath()` to properly extract slug from route parameters
- Added fallback logic that prioritizes route parameters over router URL

**Single Location Component** (`src/app/pages/cms-pages/single-location/single-location.component.ts`):
- Updated `getUrlPath()` to properly extract slug from route parameters
- Added ActivatedRoute injection for parameter access

**Dynamic Page Component** (`src/app/pages/dynamic-page/dynamic-page.component.ts`):
- Updated to pass ActivatedRoute to base class
- Improved URL detection for dynamic pages

**Base Class** (`src/app/shared/builder-page-content.base.ts`):
- Enhanced URL detection logic to handle route parameters
- Added support for different route types (blog, locations, etc.)

### 2. Server Routes Configuration

**Updated** (`src/app/app.routes.server.ts`):
- Set catch-all route to use `RenderMode.Server` instead of `RenderMode.Prerender`
- Organized routes by type (static vs dynamic)
- Dynamic pages like careers, extra-mile, installment-loans are handled by the catch-all route

### 3. Vercel Configuration

**Created** (`vercel.json`):
- Proper routing for static assets
- Server function configuration
- Route handling for Angular SSR/SSG

### 4. Build Configuration

**Updated** (`package.json`):
- Added `build:vercel` script for server-side rendering
- Added `build:prerender` script for static generation
- Updated `build:prod` for mixed rendering

**Updated** (`angular.json`):
- Added production environment file replacement
- Ensured proper build configuration

## Deployment Instructions

### For Server-Side Rendering (Recommended)

1. **Build the application**:
   ```bash
   npm run build:vercel
   ```

2. **Deploy to Vercel**:
   - Connect your repository to Vercel
   - Set build command: `npm run build:vercel`
   - Set output directory: `dist/angular-19-builder-ssr-ssg-starter`
   - Deploy

### For Mixed Rendering (Static + Server)

1. **Build the application**:
   ```bash
   npm run build:prod
   ```

2. **Deploy to Vercel**:
   - Use the same settings as above
   - The `vercel.json` will handle routing appropriately

## Testing the Fix

After deployment, test the following pages to ensure they render correctly:

1. **Location Pages**: `/locations/alabama`, `/locations/delaware`, etc.
2. **Blog Pages**: `/blog/your-blog-slug`
3. **Dynamic Pages**: `/careers`, `/extra-mile`, `/installment-loans`

## Troubleshooting

### If pages still render as homepage:

1. **Check Vercel logs** for any build or runtime errors
2. **Verify environment variables** are set correctly in Vercel
3. **Check Builder.io API key** is accessible from Vercel
4. **Test locally** with `npm run serve:ssr:angular-19-builder-SSR-SSG-starter`

### Common Issues:

1. **CORS Issues**: Ensure Builder.io API allows requests from your Vercel domain
2. **Timeout Issues**: Increase function timeout in `vercel.json` if needed
3. **Memory Issues**: Check Vercel function memory limits

## Environment Variables

Ensure these are set in your Vercel project:

- `BUILDER_API_KEY`: Your Builder.io API key
- `NODE_ENV`: `production`

## Additional Notes

- The `vercel.json` configuration ensures proper handling of both static and server-rendered routes
- Server-side rendering is used for dynamic content that depends on route parameters
- Static generation is used for known static pages to improve performance
- The catch-all route ensures all unknown pages are handled by the server

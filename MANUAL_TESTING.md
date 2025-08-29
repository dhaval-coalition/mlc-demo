# Manual Testing Guide for Angular SSR/SSG Fixes

## Quick Test Commands

### 1. Test Local Server
```bash
# Start the local SSR server
npm run serve:ssr:angular-19-builder-SSR-SSG-starter

# In another terminal, run the automated tests
node test-pages.js
```

### 2. Test Specific Pages Manually

Open your browser and navigate to these URLs to verify they're not showing the homepage:

#### Location Pages (should show location-specific content):
- `http://localhost:4000/locations/alabama`
- `http://localhost:4000/locations/delaware`
- `http://localhost:4000/locations/california`
- `http://localhost:4000/locations/texas`

#### Blog Pages (should show blog-specific content):
- `http://localhost:4000/blog/[actual-blog-slug]`
- Replace `[actual-blog-slug]` with real blog slugs from your Builder.io

#### Dynamic Pages (should show page-specific content):
- `http://localhost:4000/careers`
- `http://localhost:4000/extra-mile`
- `http://localhost:4000/installment-loans`

## What to Look For

### ✅ SUCCESS Indicators:
- Page loads with unique content (not homepage)
- Page title is specific to the page
- URL in browser matches the requested page
- Content is different from homepage
- No redirects to homepage

### ❌ FAILURE Indicators:
- Page shows homepage content
- Page redirects to homepage
- Page shows 404 or error
- Page title is generic or homepage title
- URL changes to homepage

## Testing Checklist

### Before Deployment:
- [ ] All location pages render unique content
- [ ] All blog pages render unique content  
- [ ] All dynamic pages render unique content
- [ ] Homepage still works correctly
- [ ] Static pages (about, contact, loans) still work

### After Deployment:
- [ ] Test the same pages on your Vercel domain
- [ ] Check Vercel function logs for any errors
- [ ] Verify Builder.io API calls are working
- [ ] Test with real blog slugs from your CMS

## Debugging Tips

### If pages still show homepage:

1. **Check Browser Console**:
   - Look for JavaScript errors
   - Check network requests to Builder.io API

2. **Check Server Logs**:
   - Look for SSR errors
   - Check if URL detection is working

3. **Check Builder.io**:
   - Verify content exists for the specific URLs
   - Check API key permissions

4. **Check Vercel Logs**:
   - Look for function timeouts
   - Check for memory issues

## Expected Behavior

### Location Pages (`/locations/[slug]`):
- Should fetch content from Builder.io using `urlPath: /locations/[slug]`
- Should render location-specific content
- Should not redirect to homepage

### Blog Pages (`/blog/[slug]`):
- Should fetch content from Builder.io using `urlPath: /blog/[slug]`
- Should render blog-specific content
- Should not redirect to homepage

### Dynamic Pages (`/careers`, `/extra-mile`, etc.):
- Should fetch content from Builder.io using `urlPath: /[page-name]`
- Should render page-specific content
- Should not redirect to homepage

## Quick Verification Script

Run this to quickly check if the fixes are working:

```bash
# Test a few key pages
curl -s http://localhost:4000/locations/alabama | grep -i "alabama\|location" || echo "❌ Alabama page not working"
curl -s http://localhost:4000/careers | grep -i "career\|job" || echo "❌ Careers page not working"
curl -s http://localhost:4000/ | grep -i "home\|welcome" || echo "❌ Homepage not working"
```

const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

// Configuration - Easily modifiable constants
const CONFIG = {
  API_URL: process.env.BUILDER_API_URL,
  API_KEY: process.env.BUILDER_API_KEY,
  SITE_URL: process.env.SITE_URL,
  OUTPUT_FILE: path.join(__dirname, '../sitemap.xml'),
  CONTENT_TYPES: {
    PAGES: { name: 'pages', priority: 0.8, changefreq: 'monthly' },
    LOCATIONS: { name: 'single-location', priority: 0.7, changefreq: 'monthly' },
    BLOG_LISTING: { name: 'blogs', priority: 0.8, changefreq: 'monthly' }
  },
  BLOG_POSTS: {
    name: 'blog-post',
    priority: 0.9,
    changefreq: 'monthly',
    limit: 100, // Builder.io max per request
    maxRequests: 5, // 500 max posts (5 requests × 100)
    basePath: '/blog' // URL base path for blog posts
  },
  CACHE_BUSTER: `?t=${new Date().getTime()}`
};

// Helper function to format dates consistently
function formatDate(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return formatDate(new Date()); // Fallback to current date if invalid
  
  return [
    d.getFullYear(),
    (d.getMonth() + 1).toString().padStart(2, '0'),
    d.getDate().toString().padStart(2, '0')
  ].join('-');
}

// Ensures clean URL paths without duplicate slashes
function normalizeUrlPath(urlPath) {
  if (!urlPath) return '';
  return urlPath
    .toString()
    .trim()
    .replace(/^\/+|\/+$/g, '') // Trim slashes
    .replace(/\/+/g, '/'); // Remove duplicate slashes
}

// Fetches paginated blog posts with error handling
async function fetchAllBlogPosts() {
  const { name, limit, maxRequests, basePath } = CONFIG.BLOG_POSTS;
  let allPosts = [];
  let offset = 0;
  let hasMore = true;
  let attempts = 0;

  while (hasMore && attempts < maxRequests) {
    try {
      const url = `${CONFIG.API_URL}${name}?apiKey=${CONFIG.API_KEY}&limit=${limit}&offset=${offset}${CONFIG.CACHE_BUSTER}`;
      
      const { data } = await axios.get(url, { timeout: 10000 });
      const posts = data?.results || [];
      
      allPosts = [
        ...allPosts,
        ...posts.map(post => ({
          ...post,
          modelName: name,
          modelConfig: CONFIG.BLOG_POSTS,
          data: {
            ...post.data,
            url: `${basePath}/${normalizeUrlPath(post.data?.slug || post.id)}`
          }
        }))
      ];

      hasMore = posts.length >= limit;
      offset += limit;
      attempts++;
    } catch (error) {
      hasMore = false;
    }
  }

  // Sort by date (newest first)
  return allPosts.sort((a, b) => {
    const dateA = new Date(a.data?.date || a.updatedAt).getTime();
    const dateB = new Date(b.data?.date || b.updatedAt).getTime();
    return dateB - dateA;
  });
}

// Fetches content for a single model type
async function fetchModelContent(model) {
  try {
    const url = `${CONFIG.API_URL}${model.name}?apiKey=${CONFIG.API_KEY}&limit=100${CONFIG.CACHE_BUSTER}`;
    
    const { data } = await axios.get(url, { timeout: 10000 });
    return (data?.results || []).map(item => ({
      ...item,
      modelName: model.name,
      modelConfig: model
    }));
  } catch (error) {
    console.log(`Failed to fetch ${model.name}:`, error.message);
    return [];
  }
}

// Generates a single sitemap URL entry
function generateUrlEntry(item) {
  // Special handling for homepage
  if (item.isHomepage) {
    return `
  <url>
    <loc>${CONFIG.SITE_URL}/</loc>
    <lastmod>${formatDate(new Date())}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`;
  }

  const path = normalizeUrlPath(item.data?.url);
  if (!path) return null;

  const isHomepage = path === '';
  const { priority, changefreq } = item.modelConfig;
  const lastmod = formatDate(item.data?.date || item.updatedAt || item.createdAt);

  return `
  <url>
    <loc>${CONFIG.SITE_URL}${isHomepage ? '' : `/${path}/`}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${isHomepage ? '1.0' : priority}</priority>
  </url>`;
}

// Main execution
(async () => {
  try {
    console.log('Starting sitemap generation...');
    
    // Fetch all content in parallel
    const [pages, locations, blogListing, blogPosts] = await Promise.all([
      fetchModelContent(CONFIG.CONTENT_TYPES.PAGES),
      fetchModelContent(CONFIG.CONTENT_TYPES.LOCATIONS),
      fetchModelContent(CONFIG.CONTENT_TYPES.BLOG_LISTING),
      fetchAllBlogPosts()
    ]);

    // Create homepage entry
    const homepageEntry = { isHomepage: true };
    const allContent = [homepageEntry, ...pages, ...locations, ...blogListing, ...blogPosts];
    let urlCount = 0;

    // Generate XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    allContent.forEach(item => {
      const entry = generateUrlEntry(item);
      if (entry) {
        xml += entry;
        urlCount++;
      }
    });

    xml += `\n</urlset>`;

    // Write to file
    fs.writeFileSync(CONFIG.OUTPUT_FILE, xml);
    
    // Success output
    console.log(`
  - Sitemap generated successfully!
  - Total URLs: ${urlCount}
  - Homepage: 1
  - Pages: ${pages.length}
  - Locations: ${locations.length}
  - Blog: ${blogListing.length}
  - Blog Posts: ${blogPosts.length}
`);

  } catch (error) {
    console.log('Sitemap generation failed:', error.message);
    process.exit(1);
  }
})();
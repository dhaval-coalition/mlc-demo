const http = require('http');
const https = require('https');

// Configuration
const BASE_URL = process.env.TEST_URL || 'http://localhost:4000';
const TIMEOUT = 10000; // 10 seconds

// Test cases for the problematic pages
const testPageUrls = [
  // Location detail pages (using correct URLs from navigation)
  '/locations/alabama-personal-loans',
  '/locations/delaware-personal-loans',
  '/locations/kansas-personal-loans',
  '/locations/louisiana-personal-loans',
  
  // Blog detail pages (you'll need to replace with actual blog slugs)
  '/blog/test-blog-post',
  '/blog/another-blog-post',
  
  // Dynamic pages that were loading from DynamicPageComponent
  '/careers',
  '/extra-mile',
  '/installment-loans',
  '/about-us',
  '/contact-us',
  '/privacy-policy',
  '/terms-of-service'
];

// Helper function to make HTTP requests
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { timeout: TIMEOUT }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Function to check if page is rendering homepage content
function isHomepageContent(body) {
  const homepageIndicators = [
    'welcome to minute loan center',
    'main page',
    'index',
    // Add more indicators based on your homepage content
  ];
  
  const lowerBody = body.toLowerCase();
  return homepageIndicators.some(indicator => lowerBody.includes(indicator));
}

// Function to check if page has proper content
function hasProperContent(body, expectedPath) {
  // Check if the page has some content (not just a blank page or error)
  if (!body || body.length < 100) {
    return false;
  }
  
  // Check if it's not showing homepage content
  if (isHomepageContent(body)) {
    return false;
  }
  
  // Check for location-specific content
  if (expectedPath.includes('/locations/')) {
    const locationName = expectedPath.split('/').pop().replace('-personal-loans', '');
    const hasLocationContent = body.toLowerCase().includes(locationName.toLowerCase()) ||
                              body.toLowerCase().includes('personal loans') ||
                              body.toLowerCase().includes('line of credit') ||
                              body.toLowerCase().includes('installment loan');
    return hasLocationContent;
  }
  
  // Check for blog-specific content
  if (expectedPath.includes('/blog/')) {
    const hasBlogContent = body.toLowerCase().includes('blog') ||
                          body.toLowerCase().includes('post') ||
                          body.toLowerCase().includes('article');
    return hasBlogContent;
  }
  
  // Check for dynamic page content
  if (expectedPath.includes('/careers') || expectedPath.includes('/extra-mile') || expectedPath.includes('/installment-loans')) {
    const hasDynamicContent = body.includes('<title>') || 
                             body.includes('<meta') || 
                             body.includes('<div') ||
                             body.includes('content');
    return hasDynamicContent;
  }
  
  // Check if it has some dynamic content indicators
  const hasContent = body.includes('<title>') || 
                    body.includes('<meta') || 
                    body.includes('<div') ||
                    body.includes('content');
  
  return hasContent;
}

// Main testing function
async function testPages() {
  console.log(`🚀 Testing pages on: ${BASE_URL}`);
  console.log('=' .repeat(50));
  
  const results = [];
  
  for (const page of testPageUrls) {
    const url = `${BASE_URL}${page}`;
    console.log(`\n📄 Testing: ${page}`);
    
    try {
      const response = await makeRequest(url);
      
      const isSuccess = response.statusCode === 200;
      const hasContent = hasProperContent(response.body, page);
      const isHomepage = isHomepageContent(response.body);
      
      let status = '❌ FAIL';
      let details = '';
      
      if (!isSuccess) {
        details = `HTTP ${response.statusCode}`;
      } else if (isHomepage) {
        details = 'Rendering homepage content';
      } else if (!hasContent) {
        details = 'No proper content found';
      } else {
        status = '✅ PASS';
        details = 'Rendering correctly';
      }
      
      console.log(`   ${status} - ${details}`);
      
      results.push({
        page,
        url,
        status: isSuccess && hasContent && !isHomepage ? 'PASS' : 'FAIL',
        statusCode: response.statusCode,
        isHomepage,
        hasContent,
        details
      });
      
    } catch (error) {
      console.log(`   ❌ ERROR - ${error.message}`);
      results.push({
        page,
        url,
        status: 'ERROR',
        error: error.message,
        details: 'Request failed'
      });
    }
  }
  
  // Summary
  console.log('\n' + '=' .repeat(50));
  console.log('📊 TEST SUMMARY');
  console.log('=' .repeat(50));
  
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const errors = results.filter(r => r.status === 'ERROR').length;
  
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⚠️  Errors: ${errors}`);
  console.log(`📄 Total: ${results.length}`);
  
  // Show failed tests
  if (failed > 0 || errors > 0) {
    console.log('\n🔍 FAILED TESTS:');
    results.filter(r => r.status !== 'PASS').forEach(result => {
      console.log(`   ${result.page}: ${result.details}`);
    });
  }
  
  return results;
}

// Run tests
if (require.main === module) {
  testPages().catch(console.error);
}

module.exports = { testPages, makeRequest, hasProperContent, isHomepageContent };

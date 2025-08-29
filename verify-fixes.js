const http = require('http');
const https = require('https');

const BASE_URL = process.env.TEST_URL || 'http://localhost:4000';

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { timeout: 10000 }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
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

async function verifyFixes() {
  console.log('🔍 Verifying SSR/SSG Fixes');
  console.log('=' .repeat(50));
  
  const tests = [
    {
      name: 'Alabama Location Page',
      url: '/locations/alabama-personal-loans',
      expectedContent: ['alabama', 'personal loans', 'line of credit']
    },
    {
      name: 'Careers Page',
      url: '/careers',
      expectedContent: ['career', 'job', 'employment']
    },
    {
      name: 'Extra Mile Page',
      url: '/extra-mile',
      expectedContent: ['extra mile', 'community', 'giving']
    },
    {
      name: 'Installment Loans Page',
      url: '/installment-loans',
      expectedContent: ['installment', 'loan', 'credit']
    }
  ];
  
  for (const test of tests) {
    console.log(`\n📄 Testing: ${test.name}`);
    console.log(`   URL: ${test.url}`);
    
    try {
      const response = await makeRequest(`${BASE_URL}${test.url}`);
      
      if (response.statusCode !== 200) {
        console.log(`   ❌ FAIL - HTTP ${response.statusCode}`);
        continue;
      }
      
      const body = response.body.toLowerCase();
      const hasExpectedContent = test.expectedContent.some(content => 
        body.includes(content.toLowerCase())
      );
      
      // Check if it's not showing homepage content
      const isHomepage = body.includes('welcome to minute loan center') || 
                        body.includes('main page') ||
                        body.includes('index');
      
      if (isHomepage) {
        console.log(`   ❌ FAIL - Rendering homepage content`);
      } else if (hasExpectedContent) {
        console.log(`   ✅ PASS - Rendering correct content`);
      } else {
        console.log(`   ⚠️  PARTIAL - Content found but may need verification`);
      }
      
    } catch (error) {
      console.log(`   ❌ ERROR - ${error.message}`);
    }
  }
  
  console.log('\n' + '=' .repeat(50));
  console.log('✅ Verification Complete!');
  console.log('\n📋 Summary:');
  console.log('- If you see ✅ PASS, the page is working correctly');
  console.log('- If you see ❌ FAIL, the page is still showing homepage content');
  console.log('- If you see ⚠️  PARTIAL, check the content manually');
}

verifyFixes().catch(console.error);

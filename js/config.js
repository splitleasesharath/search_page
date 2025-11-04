// Configuration with environment variables
// This file will be generated during build for production
// For local development, copy config.local.js.example to config.local.js

// IMPORTANT: If you see YOUR_API_KEY in production, the build script didn't run
// Make sure Cloudflare Pages is configured with:
// Build command: node build-cloudflare.js
// Environment variables: GOOGLE_MAPS_API_KEY, BUBBLE_API_KEY, BUBBLE_API_BASE_URL

// Only set defaults if ENV doesn't exist or has placeholder values
console.log('🔧 Loading config.js');
console.log('  window.ENV exists before:', !!window.ENV);
if (window.ENV) {
    console.log('  Current GOOGLE_MAPS_API_KEY:', window.ENV.GOOGLE_MAPS_API_KEY ? window.ENV.GOOGLE_MAPS_API_KEY.substring(0, 20) + '...' : 'NOT SET');
}

// Check if ENV doesn't exist or has placeholder values
if (!window.ENV || window.ENV.GOOGLE_MAPS_API_KEY === 'YOUR_API_KEY') {
    console.log('⚠️ window.ENV not found or has placeholders, using local API keys');
    window.ENV = {
        GOOGLE_MAPS_API_KEY: 'AIzaSyCFcO3jCTvR69iA4UAxPi-sWHJ7zWPMJWo',
        BUBBLE_API_KEY: '05a7a0d1d2400a0b574acd99748e07a0',
        BUBBLE_API_BASE_URL: 'https://upgradefromstr.bubbleapps.io/version-test/api/1.1',
        BUBBLE_MESSAGING_ENDPOINT: 'https://app.split.lease/api/1.1/wf/core-contact-host-send-message',
        SUPABASE_URL: 'https://qcfifybkaddcoimjroca.supabase.co',
        SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZmlmeWJrYWRkY29pbWpyb2NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0NzU0MDUsImV4cCI6MjA3NTA1MTQwNX0.glGwHxds0PzVLF1Y8VBGX0jYz3zrLsgE9KAWWwkYms8'
    };
} else {
    console.log('✅ window.ENV already exists with valid keys, not overwriting');
    // Ensure missing keys are set if not already
    if (!window.ENV.BUBBLE_MESSAGING_ENDPOINT) {
        window.ENV.BUBBLE_MESSAGING_ENDPOINT = 'https://app.split.lease/api/1.1/wf/core-contact-host-send-message';
    }
    if (!window.ENV.SUPABASE_URL) {
        window.ENV.SUPABASE_URL = 'https://qcfifybkaddcoimjroca.supabase.co';
    }
    if (!window.ENV.SUPABASE_ANON_KEY) {
        window.ENV.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZmlmeWJrYWRkY29pbWpyb2NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0NzU0MDUsImV4cCI6MjA3NTA1MTQwNX0.glGwHxds0PzVLF1Y8VBGX0jYz3zrLsgE9KAWWwkYms8';
    }
}

console.log('  window.ENV exists after:', !!window.ENV);
console.log('  Final GOOGLE_MAPS_API_KEY:', window.ENV.GOOGLE_MAPS_API_KEY ? window.ENV.GOOGLE_MAPS_API_KEY.substring(0, 20) + '...' : 'NOT SET');
console.log('  BUBBLE_MESSAGING_ENDPOINT:', window.ENV.BUBBLE_MESSAGING_ENDPOINT ? window.ENV.BUBBLE_MESSAGING_ENDPOINT : 'NOT SET');
console.log('  SUPABASE_URL:', window.ENV.SUPABASE_URL ? window.ENV.SUPABASE_URL : 'NOT SET');
console.log('  SUPABASE_ANON_KEY:', window.ENV.SUPABASE_ANON_KEY ? window.ENV.SUPABASE_ANON_KEY.substring(0, 20) + '...' : 'NOT SET');
console.log('  Config loaded at:', new Date().toISOString());
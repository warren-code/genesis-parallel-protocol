#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Setting up Netlify environment variables for Supabase...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local file not found!');
  console.log('Please create a .env.local file with your Supabase credentials.');
  console.log('You can use .env.local.example as a template.');
  process.exit(1);
}

// Read .env.local file
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

// Parse environment variables
envContent.split('\n').forEach(line => {
  const trimmedLine = line.trim();
  if (trimmedLine && !trimmedLine.startsWith('#')) {
    const [key, ...valueParts] = trimmedLine.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
      envVars[key.trim()] = value;
    }
  }
});

// Required Supabase variables
const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

// Check if all required variables are present
const missingVars = requiredVars.filter(varName => !envVars[varName]);
if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingVars.forEach(varName => console.error(`  - ${varName}`));
  process.exit(1);
}

console.log('Found the following Supabase environment variables:');
requiredVars.forEach(varName => {
  if (envVars[varName]) {
    console.log(`✅ ${varName}`);
  }
});

console.log('\nTo set these variables in Netlify, run the following commands:\n');

// Generate netlify env:set commands
requiredVars.forEach(varName => {
  if (envVars[varName]) {
    console.log('netlify env:set ' + varName + ' "' + envVars[varName] + '"');
  }
});

// Optional: Add site URL if present
if (envVars.NEXT_PUBLIC_SITE_URL) {
  console.log('netlify env:set NEXT_PUBLIC_SITE_URL "' + envVars.NEXT_PUBLIC_SITE_URL + '"');
}

console.log('\nAlternatively, you can set these in the Netlify UI:');
console.log('1. Go to your Netlify dashboard');
console.log('2. Select your site');
console.log('3. Go to Site settings > Environment variables');
console.log('4. Add each variable listed above');

console.log('\n✨ Done! After setting the environment variables, redeploy your site.');

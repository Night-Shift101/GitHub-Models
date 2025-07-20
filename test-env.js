/**
 * Environment test utility for debugging GitHub token issues
 * Run this in terminal with: node test-env.js
 */

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

console.log('🔍 Environment Test Results:');
console.log('================================');

// Check environment
console.log('Node.js environment:', process.env.NODE_ENV || 'undefined');
console.log('Current working directory:', process.cwd());

// Check for GitHub token
const token = process.env.GITHUB_TOKEN;
console.log('GitHub token found:', !!token);

if (token) {
  console.log('Token length:', token.length);
  console.log('Token prefix:', token.substring(0, 20) + '...');
  console.log('Token type:', token.startsWith('github_pat_') ? 'Fine-grained PAT' : token.startsWith('ghp_') ? 'Classic PAT' : 'Unknown format');
} else {
  console.log('❌ GITHUB_TOKEN not found in environment');
  
  // Check if .env.local file exists
  const envPath = path.join(process.cwd(), '.env.local');
  
  if (fs.existsSync(envPath)) {
    console.log('✅ .env.local file exists');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const hasGithubToken = envContent.includes('GITHUB_TOKEN=') && !envContent.includes('GITHUB_TOKEN=your_github_token_here');
    console.log('✅ .env.local contains GITHUB_TOKEN:', hasGithubToken);
    
    // Show first few lines of .env.local (for debugging)
    const lines = envContent.split('\n').slice(0, 10);
    console.log('First few lines of .env.local:');
    lines.forEach((line, i) => {
      if (line.startsWith('GITHUB_TOKEN=')) {
        console.log(`  ${i + 1}: GITHUB_TOKEN=${line.includes('your_github_token_here') ? 'your_github_token_here' : '[TOKEN_SET]'}`);
      } else if (line.trim() && !line.startsWith('#')) {
        console.log(`  ${i + 1}: ${line}`);
      }
    });
  } else {
    console.log('❌ .env.local file not found');
  }
}

// Test OpenAI import
try {
  const { default: OpenAI } = await import('openai');
  console.log('✅ OpenAI SDK import successful');
  
  if (token) {
    const client = new OpenAI({ 
      baseURL: "https://models.github.ai/inference", 
      apiKey: token 
    });
    console.log('✅ GitHub Models client created successfully');
  }
} catch (error) {
  console.log('❌ OpenAI SDK error:', error.message);
}

console.log('================================');

#!/usr/bin/env node

/**
 * Netlify Build Script
 * This script ensures proper build setup for Netlify deployments
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Starting Netlify build process...');

try {
  // Clean install to ensure all dependencies are fresh
  console.log('📦 Installing dependencies with npm ci...');
  execSync('npm ci --legacy-peer-deps', { stdio: 'inherit' });

  // Verify vite is installed
  const vitePath = path.join(process.cwd(), 'node_modules', '.bin', 'vite');
  if (!fs.existsSync(vitePath)) {
    throw new Error('❌ Vite not found after npm ci. Build environment is incomplete.');
  }
  console.log('✅ Vite verified');

  // Run the build
  console.log('🏗️  Running vite build...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('✅ Build completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

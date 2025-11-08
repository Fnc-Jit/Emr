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
  // Force devDependencies to be installed even in production
  console.log('📦 Installing dependencies with npm ci --include=dev...');
  execSync('npm ci --include=dev --legacy-peer-deps', { stdio: 'inherit' });

  // Fix for missing native bindings on Netlify (Linux)
  // Netlify uses Linux but npm sometimes doesn't install native bindings for Linux
  console.log('🔧 Installing native bindings for Linux...');
  const nativePackages = [
    '@rollup/rollup-linux-x64-gnu',
    '@swc/core-linux-x64-gnu',
  ];
  
  for (const pkg of nativePackages) {
    try {
      console.log(`  Installing ${pkg}...`);
      execSync(`npm install --no-save ${pkg}`, { stdio: 'pipe' });
    } catch (e) {
      // Continue even if installation fails - these are optional
      console.log(`  ⚠️  Could not install ${pkg}, continuing...`);
    }
  }

  // Verify vite is installed
  const vitePath = path.join(process.cwd(), 'node_modules', '.bin', 'vite');
  if (!fs.existsSync(vitePath)) {
    throw new Error('❌ Vite not found after npm ci. Build environment is incomplete.');
  }
  console.log('✅ Build dependencies verified');

  // Run the build
  console.log('🏗️  Running vite build...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('✅ Build completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

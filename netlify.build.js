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

  // Fix for missing @rollup/rollup-linux-x64-gnu on Netlify
  // This is a known npm issue with optional dependencies
  console.log('🔧 Installing rollup native bindings for Linux...');
  try {
    execSync('npm install --no-save @rollup/rollup-linux-x64-gnu', { stdio: 'pipe' });
  } catch (e) {
    // Continue even if this fails - it's optional
    console.log('⚠️  Warning: Could not install rollup native bindings, will try without');
  }

  // Verify vite is installed
  const vitePath = path.join(process.cwd(), 'node_modules', '.bin', 'vite');
  if (!fs.existsSync(vitePath)) {
    console.log('Searching for vite in node_modules...');
    const nodeModulesPath = path.join(process.cwd(), 'node_modules');
    const files = fs.readdirSync(nodeModulesPath);
    console.log('Found files in node_modules:', files.slice(0, 10));
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

# Netlify Deployment Guide

## Setup for Netlify Deployment

This project is now configured for seamless Netlify deployments. Follow these steps:

### 1. **Prerequisites**
- Git repository pushed to GitHub
- Netlify account (https://app.netlify.com)
- Node.js 22+ environment

### 2. **Connect to Netlify**

#### Option A: Connect via Netlify UI (Recommended)
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Select GitHub and choose the Fnc-Jit/Emr repository
4. Netlify will auto-detect build settings from `netlify.toml`
5. Click "Deploy site"

#### Option B: Deploy via Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### 3. **Configuration Files**

The following files are configured for Netlify:

#### `netlify.toml`
- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Node version: 22
- Environment: production
- Includes SPA redirect rules
- Includes cache and security headers

#### `vite.config.ts`
- Output directory: `dist` (Netlify standard)
- Optimized build with code splitting
- Production-ready configuration

#### `.netlifyignore`
- Excludes unnecessary files from build
- Reduces deployment time and size

### 4. **Build Environment Variables**

Set these in Netlify UI (Settings → Build & Deploy → Environment):

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
NODE_VERSION=22
NODE_ENV=production
```

### 5. **Expected Build Process**

When you push to GitHub, Netlify will:
1. Clone the repository
2. Install Node.js 22
3. Run `npm ci` to install dependencies
4. Run `npm run build` to build the application
5. Deploy the `dist` directory

### 6. **Build Status**

Monitor your builds at: https://app.netlify.com/sites/[your-site-name]/deploys

### 7. **Troubleshooting**

#### Build fails with "Cannot find module @rollup/rollup-linux-x64-gnu"
- ✅ **Fixed** - Using `npm ci` instead of `npm install` in netlify.toml
- This ensures clean, reproducible installs

#### Build takes too long
- ✅ **Optimized** - Code splitting configured in vite.config.ts
- Dependencies split into vendor chunks for better caching

#### 404 on page refresh
- ✅ **Fixed** - SPA redirect rules in netlify.toml
- All routes redirect to index.html

### 8. **Performance Tips**

1. **Caching Strategy**
   - Static assets cached for 1 year (immutable)
   - HTML cached with must-revalidate
   - Optimized for fast page loads

2. **Security Headers**
   - X-Content-Type-Options: nosniff
   - X-Frame-Options: DENY
   - X-XSS-Protection enabled
   - Referrer-Policy: strict-origin-when-cross-origin

3. **Code Splitting**
   - Vendor libraries in separate chunk
   - Supabase in separate chunk
   - Improves initial load time

### 9. **Deployment URL**

After deployment, your site will be available at:
```
https://[your-site-name].netlify.app
```

### 10. **Custom Domain**

To add a custom domain:
1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records as instructed

---

## Files Modified for Netlify

| File | Changes |
|------|---------|
| `netlify.toml` | NEW - Netlify configuration |
| `vite.config.ts` | Updated build settings (outDir: dist) |
| `.netlifyignore` | NEW - Build ignore file |
| `build.sh` | NEW - Build script (optional) |

## Environment Setup

### Local Testing

Test the build locally before pushing:
```bash
npm run build
npm install -g netlify-cli
netlify deploy
```

### Production Build

```bash
npm ci
npm run build
```

The `dist` directory will contain the production-ready application.

---

**Status:** ✅ Ready for Netlify deployment

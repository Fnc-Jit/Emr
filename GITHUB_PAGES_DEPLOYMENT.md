# GitHub Pages Deployment

This project is configured to deploy to GitHub Pages automatically on every push to the `main` branch.

## Setup Instructions

### 1. GitHub Repository Settings

1. Go to your repository settings: `https://github.com/Fnc-Jit/Emr/settings`
2. Navigate to **Settings → Pages**
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - This will automatically use the workflow defined in `.github/workflows/deploy.yml`

### 2. How It Works

- Every push to the `main` branch triggers the GitHub Actions workflow
- The workflow:
  1. Installs dependencies with `npm ci`
  2. Installs Linux native bindings for SWC and Rollup
  3. Builds the app with `npm run build`
  4. Uploads the `dist` folder to GitHub Pages
  5. Deploys the site

### 3. Access Your Site

Once deployed, your site will be available at:
- **URL**: `https://Fnc-Jit.github.io/Emr`

## Configuration

### Vite Base Path
The `vite.config.ts` is configured with `base: '/'` for GitHub Pages. If you want to use a subdomain instead of a subpath, you may need to adjust this.

### Environment Variables

If your app uses environment variables (like Supabase keys), add them to GitHub Secrets:

1. Go to **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Add your secrets (e.g., `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)

Then update the workflow to pass them:
```yaml
env:
  VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
  VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
```

## Troubleshooting

### Deployment Failed
- Check the workflow run in **Actions** tab
- Look for error messages in the logs
- Common issues:
  - Missing environment variables
  - Build errors (check build output in logs)
  - Insufficient permissions (check Pages settings)

### Site Not Updating
- Ensure you pushed to the `main` branch
- Check the Actions tab to see if the workflow ran
- Clear your browser cache or use incognito mode

### Build Issues
If the build fails with native binding errors:
- The workflow automatically installs Linux bindings for SWC and Rollup
- If issues persist, check the workflow logs for specific errors

## Disabling Netlify

Since you're now using GitHub Pages, you can:
1. Remove the `netlify.toml` file
2. Optionally delete the `netlify.build.js` file
3. Disconnect your repository from Netlify in the Netlify dashboard

## Next Steps

1. Commit these changes to GitHub
2. Go to your repository settings
3. Configure GitHub Pages to use GitHub Actions as the source
4. Your site will be live at `https://Fnc-Jit.github.io/Emr`

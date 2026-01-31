# GitHub Pages Deployment Workflow

## Workflow Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Push to Main Branch                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              GitHub Actions Workflow Triggers                │
│                  (.github/workflows/deploy.yml)              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      BUILD JOB                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 1. Checkout code (actions/checkout@v4)                 │ │
│  │ 2. Setup Node.js 20 (actions/setup-node@v4)            │ │
│  │ 3. Install dependencies (npm ci)                       │ │
│  │ 4. Build project (npm run build)                       │ │
│  │ 5. Configure Pages (actions/configure-pages@v4)        │ │
│  │ 6. Upload artifact (actions/upload-pages-artifact@v3)  │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      DEPLOY JOB                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 1. Wait for build job to complete                      │ │
│  │ 2. Deploy to GitHub Pages (actions/deploy-pages@v4)    │ │
│  │ 3. Site published at:                                  │ │
│  │    https://ulfendk.github.io/signal-web/               │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Configuration Details

### Vite Base Path
The `vite.config.ts` includes:
```typescript
base: '/signal-web/'
```

This ensures all assets are served from the correct subdirectory on GitHub Pages.

### Permissions
The workflow requires:
- `contents: read` - To checkout the repository
- `pages: write` - To deploy to GitHub Pages
- `id-token: write` - For GitHub Pages authentication

### Concurrency Control
```yaml
concurrency:
  group: "pages"
  cancel-in-progress: false
```

This prevents multiple deployments from running simultaneously while allowing queued deployments to complete.

## Build Output

The build process generates:
- `dist/index.html` - Main HTML with `/signal-web/` prefixed assets
- `dist/assets/` - Bundled JavaScript and CSS
- `dist/manifest.webmanifest` - PWA manifest
- `dist/sw.js` - Service worker
- `dist/*.png`, `dist/*.svg` - Icons and images

All asset references in the HTML use the `/signal-web/` base path.

## Deployment Triggers

The workflow triggers on:
```yaml
on:
  push:
    branches:
      - main
```

**Note**: This means deployments happen automatically on every merge to the main branch. For manual deployments, you can also trigger the workflow via the GitHub Actions UI.

## First-Time Setup

When this PR is merged, the first deployment will:
1. Create the `gh-pages` branch (if it doesn't exist)
2. Configure GitHub Pages to serve from GitHub Actions
3. Deploy the site

Subsequent merges to main will automatically update the deployed site.

## Monitoring Deployments

To monitor deployments:
1. Go to the repository on GitHub
2. Click the "Actions" tab
3. View the "Deploy to GitHub Pages" workflow runs
4. Each run shows build and deploy progress

## Rollback Process

If a deployment introduces issues:
1. Revert the problematic commit on main
2. Push the revert commit
3. The workflow will automatically deploy the previous version

Alternatively, you can manually deploy a specific commit by:
1. Checking out the desired commit locally
2. Running `npm run build`
3. Manually deploying the `dist/` directory (requires additional setup)

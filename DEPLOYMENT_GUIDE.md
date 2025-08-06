# BlockWill Deployment Guide

This guide explains how to deploy your BlockWill landing page to www.blockwill.io using GitHub Pages.

## Automatic Deployment Setup

The repository is configured with GitHub Actions to automatically build and deploy your site whenever you push to the main branch.

### Files Added for Deployment:

1. **CNAME** - Configures the custom domain (www.blockwill.io)
2. **.github/workflows/deploy.yml** - GitHub Actions workflow for automatic deployment
3. **DEPLOYMENT_GUIDE.md** - This guide

## Step-by-Step Deployment Process:

### 1. Enable GitHub Pages in Repository Settings

1. Go to your repository: https://github.com/deepaksainixlri/blockwill_landing_page
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically detect your setup

### 2. Configure DNS Settings for www.blockwill.io

You'll need to configure your domain's DNS settings with your domain registrar:

#### DNS Records to Add:

```
Type: CNAME
Name: www
Value: deepaksainixlri.github.io

Type: A (for apex domain blockwill.io)
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

### 3. Verify Domain Configuration

After setting up DNS records:

1. Go to repository Settings > Pages
2. Under "Custom domain", enter: `www.blockwill.io`
3. Click Save
4. Wait for DNS propagation (can take up to 24 hours)
5. Enable "Enforce HTTPS" once domain verification is complete

### 4. Automatic Deployment

Once configured, every push to the main branch will:

1. Install npm dependencies
2. Build Tailwind CSS
3. Deploy to GitHub Pages
4. Make your site live at www.blockwill.io

## Build Process

The deployment workflow:

- Runs on Ubuntu latest
- Uses Node.js 18
- Installs dependencies with `npm install`
- Builds CSS with `npm run build:css`
- Deploys to GitHub Pages

## Troubleshooting

### Common Issues:

1. **DNS not propagating**: Wait up to 24 hours for DNS changes to take effect
2. **HTTPS not available**: Enable after domain verification is complete
3. **Build failing**: Check GitHub Actions tab for error logs
4. **404 errors**: Ensure index.html is in the root directory

### Checking Deployment Status:

1. Go to **Actions** tab in your GitHub repository
2. Check the status of recent workflow runs
3. Click on a run to see detailed logs

## Alternative Deployment Methods

If GitHub Pages doesn't meet your needs, consider:

1. **Vercel**: Connect your GitHub repo to Vercel for automatic deployments
2. **Netlify**: Similar to Vercel with form handling and serverless functions
3. **AWS S3 + CloudFront**: For enterprise-scale deployment
4. **Firebase Hosting**: Google's hosting platform with global CDN

## Security Considerations

- The site will be served over HTTPS once domain verification is complete
- No server-side code is executed (static site only)
- All form submissions should be handled via external services

## Monitoring

Monitor your deployment:
- GitHub Actions for build status
- Domain registrar for DNS status
- Browser developer tools for any loading issues

Your site will be live at **www.blockwill.io** once DNS propagation is complete!
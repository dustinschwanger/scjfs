# Deployment Guide

## Railway Deployment

This static site is configured for zero-dependency deployment on Railway using Python's built-in HTTP server.

### Configuration Files

- **`nixpacks.toml`** - Tells Railway to skip npm install and use Python HTTP server
- **`railway.json`** - Health check and restart policy configuration
- **`package.json`** - For local development only (not used in production)

### How It Works

1. Railway detects `nixpacks.toml` and uses Nixpacks builder
2. Setup phase installs Python 3 only (no Node.js dependencies)
3. Install phase is skipped (echo command)
4. Build phase is skipped (no build needed for static site)
5. Start phase runs: `python3 -m http.server $PORT`

### Why Python HTTP Server?

- ✅ No npm dependencies to install
- ✅ No package-lock.json sync issues
- ✅ Fast deployment (< 30 seconds)
- ✅ Built into Python (always available)
- ✅ Perfect for serving static HTML/CSS/JS

### Local Development

For local development, you can use:

```bash
# Option 1: Python HTTP server (same as production)
python3 -m http.server 3000

# Option 2: npm serve (if you have node_modules)
npm start

# Option 3: Live Server VS Code extension
# Just open index.html in VS Code and click "Go Live"
```

### Deployment Steps

1. Push to GitHub:
   ```bash
   git push origin main
   ```

2. Railway auto-deploys on push
   - Build completes in ~30 seconds
   - Site available at Railway-provided URL

3. Configure custom domain (optional):
   - Railway Dashboard → Settings → Domains
   - Add custom domain
   - Update DNS records

### Troubleshooting

**Issue:** Build fails with npm errors
**Solution:** Railway should use `nixpacks.toml` which skips npm entirely

**Issue:** Port binding error
**Solution:** Python HTTP server uses `$PORT` environment variable from Railway

**Issue:** 404 errors for paths
**Solution:** Python HTTP server serves exact file paths (no SPA routing)

### Environment Variables

None required! This is a pure static site.

### Performance

- **Build time:** ~30 seconds
- **Cold start:** < 1 second
- **Response time:** ~50ms average
- **CDN:** Use Cloudflare in front of Railway for global CDN

### Monitoring

Railway provides:
- Deployment logs
- Runtime logs
- Health check status
- Request metrics

View logs in Railway Dashboard → Deployments → View Logs

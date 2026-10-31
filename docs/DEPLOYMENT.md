# Static SPA deployment

Run bun install --frozen-lockfile and bun run build. Publish dist/ to a static host. No Node/Bun server is required in production. Application assets and fonts are local.

## History fallback

Requests for /about, /contact and /services/ai must return index.html, allowing Vue Router to render the dialog. Unknown routes also need index.html so the application can render its 404 view. Assets should return actual 404s, not HTML.

Example Nginx rules inside an existing server block:

```nginx
root /path/to/dist;
location /assets/ { try_files $uri =404; }
location / { try_files $uri $uri/ /index.html; }
```

For other hosts, configure the equivalent rewrite for non-asset routes. A hosting-level rewrite is essential; GitHub Pages does not provide it by default. The app assumes domain-root deployment; configure Vite base and asset URLs before deploying into a subdirectory.

Preview locally with bun run preview after build. The server binds to 0.0.0.0 and serves history fallback; browser-facing application code never requests localhost. The PREVIEW_URL used in the test script is a test runner address, not an application API.

Contact/cooperation forms are intentionally demo-only. Integrating delivery requires an explicit backend/API and new validation/security/privacy decisions.

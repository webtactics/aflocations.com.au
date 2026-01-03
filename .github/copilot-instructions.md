# Copilot Instructions for aflocations.com.au

## Project Overview
This is a **James Taylor Bathurst Solicitor website** built with **Eleventy (11ty)** static site generator and deployed on **Netlify**. The site showcases legal services (Criminal Law, Family Law, Property & Conveyancing, Traffic Offences, Wills & Estate Planning) through a content-driven architecture with Netlify CMS integration.

## Core Architecture

### Static Site Generation with Eleventy
- **Framework**: Eleventy v3.0.0 (`@11ty/eleventy`)
- **Configuration**: `.eleventy.js` - defines collections, filters, transforms, and plugins
- **Build Output**: `_site/` directory (published by Netlify)
- **Dev Commands**:
  - `npm run build` - compile once
  - `npm run watch` - rebuild on file changes
  - `npm run serve` - local dev server with watch
  - `npm run debug` - debug mode with `DEBUG=*`

### Directory Structure
```
_includes/          # Templates and components (reusable)
  ├── layouts/      # Page templates (base.njk, home.njk, post.njk, detail.njk)
  ├── components/   # Reusable UI components (nav, hero, footer, forms)
  └── assets/       # Inline CSS/JS (minified via filters)
pages/              # Core pages (about.md, contact.md, home.md, services.md)
legal-services/     # Service detail pages (criminal-law.md, family-law.md, etc.)
posts/              # Blog posts (optional, collection-enabled)
admin/              # Netlify CMS config and templates
static/             # Static assets (favicon, images, manifests)
_data/              # Global data (metadata.json with site title, description, URL)
```

### Data & Collections
- **Global data**: `_data/metadata.json` contains site title, description, URL, OG image
- **Collections**:
  - `authors` - blog authors extracted from post metadata
  - `services` - legal services pages (auto-generated from `legal-services/` folder)
- **Data merging**: `eleventyConfig.setDataDeepMerge(true)` enables cascading data through directory structure

## Template System (Nunjucks)

### Layout Hierarchy
1. **Base Layout** (`layouts/base.njk`) - HTML structure, header, footer, nav
   - Includes: `components/head.njk`, `components/top-nav.njk`, `components/nav.njk`, `components/footer.njk`
2. **Default Layout** (`layouts/grid-default.njk`) - aliased as "default" - extends base
3. **Specific Layouts**:
   - `home.njk` - home page (displays 3-column service grid via `postslist-3wide.njk`)
   - `post.njk` - blog posts
   - `detail.njk` - service detail pages

### Content Structure
- **Front Matter**: YAML metadata (layout, title, date, permalink, eleventyNavigation)
- **eleventyNavigation**: Auto-generates site navigation; `key` = nav label, `order` = position
- **Example** (pages/home.md):
  ```yaml
  layout: layouts/home.njk
  title: AFLocations
  permalink: /
  eleventyNavigation:
    key: Home
    order: 0
  ```

### Key Filters & Transforms
- `readableDate` / `machineDate` - date formatting via Luxon
- `cssmin` / `jsmin` - inline CSS/JS minification
- `limit` - array slicing for post listings
- `htmlmin` transform - minifies all HTML output

## Content Management

### Netlify CMS Integration
- **Config**: `admin/config.yml`
- **Backend**: Git Gateway (git-gateway) on master branch
- **Access**: `/admin/` on deployed site or local dev server
- **Package**: `netlify-cms-app` installed (dev dependency)
- **Collections**:
  - **Posts** (`posts/` folder) - blog content with title, date, author, summary, tags
  - **Pages** (`pages/` folder) - static pages with eleventyNavigation support
- **Media**: Uploads to `static/img/`
- **Authentication**: Netlify Identity required (configure in Netlify dashboard)

### Directory Data Files
- `legal-services/legal-services.json` - applies default layout and class to all services
- `pages/pages.json` - applies layout to all pages (if needed)
- Allows DRY front matter across page types

## Build & Deployment

### Netlify Configuration (`netlify.toml`)
- **Publish dir**: `_site`
- **Build command**: `eleventy`
- **Plugins**:
  - `@netlify/plugin-sitemap` - auto-generates XML sitemap
  - `eleventy-plugin-metagen` - generates meta tags for OG, Twitter, etc.
  - `eleventy-plugin-redirects` - handles 301/302 redirects

### Redirects & Headers
- Example: `/home/` → `/` (301 redirect defined in `netlify.toml`)
- Sitemap excludes: 404, admin pages, email templates (configured in `netlify.toml`)

## Development Patterns

### Adding a New Service Page
1. Create markdown file in `legal-services/` (e.g., `new-service.md`)
2. Front matter applies default layout from `legal-services.json`:
   - Permalink auto-generates: `/legal-services/new-service/`
   - Layout: `layouts/post.njk` (detail layout)
3. Content renders through `post.njk` → `detail.njk` → `base.njk`

### Adding Navigation Items
1. Update `eleventyNavigation` in front matter (key, order)
2. Include `components/nav.njk` to auto-render (uses `@11ty/eleventy-navigation` plugin)
3. Links: `{{ item.url | url }}` (Eleventy's URL filter handles relative paths)

### Styling Approach
- Inline critical CSS in `components/head.njk` (from `_includes/assets/css/`)
- Grid system: `jts-grid.css` (custom grid, not Bootstrap/Tailwind)
- Print styles: `print.css`
- Lightbox & slider: `lightbox.js`, `slick.min.js` (passthrough copied)

## Dependencies & Plugins
- **Core**: `@11ty/eleventy` v3.0.0
- **Navigation**: `@11ty/eleventy-navigation` - auto-generates nav from front matter
- **Metadata**: `eleventy-plugin-metagen` - OG/Twitter meta tags
- **Redirects**: `eleventy-plugin-redirects` - redirect management
- **File minifier**: `@sherby/eleventy-plugin-files-minifier`
- **Utilities**: `luxon` (date), `markdown-it-anchor`, `clean-css`, `uglify-js`, `html-minifier`

## Important Notes

### URL Handling
- Always use Eleventy's `| url` filter for links: `{{ path | url }}`
- Permalinks: Use trailing slash `/path/` format for clean URLs
- Redirects managed via `netlify.toml`, not code

### Markdown Files
- Place in correct folder (`pages/`, `legal-services/`, or `posts/`)
- Directory data file (`.json`) in same folder applies defaults to all `.md` files
- Metadata from `_data/metadata.json` available globally via `metadata.title`, etc.

### Common Issues
- **Layouts not applying**: Verify layout path exists in `_includes/layouts/`
- **Nav items missing**: Check `eleventyNavigation` front matter + `order` value
- **Static assets not found**: Add to `eleventyConfig.addPassthroughCopy()` in `.eleventy.js`
- **CMS changes not showing**: Rebuild triggered on Netlify automatically; check git push succeeded

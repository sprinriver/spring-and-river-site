# Spring & River — Company Website

Static website for Spring & River, deployed automatically to GitHub Pages.

## How deployment works

Every push to the default branch runs the GitHub Actions workflow in
`.github/workflows/deploy-pages.yml`, which publishes the repository's
contents (all HTML pages and assets) to GitHub Pages. No build step is
required — files are served as-is.

## Adding or updating pages

1. Add or edit HTML files and assets (CSS, JS, images) in the repository root.
2. Commit and push (or merge a pull request) to the default branch.
3. The site redeploys automatically within a minute or two.

`index.html` is the site's home page. The current `index.html` is a
placeholder awaiting the real site content.

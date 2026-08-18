# Spring & River — Company Website

Static marketing site for **Sprinriver Technology Private Limited** (trading as
Spring & River), deployed automatically to GitHub Pages.

No build step, no framework, no dependencies — plain HTML, one stylesheet and
one small script. Edit a file, push, and it is live.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, AI Solutions Framework, services, industries, differentiators |
| `services.html` | Five services, each with its use cases (`#data-unification`, `#data-engineering`, `#business-intelligence`, `#ai-ml`, `#agentic-ai`) |
| `industries.html` | Six industries, each with four use cases (`#metal`, `#furnace`, `#molding`, `#pharma`, `#automobile`, `#biomass`) |
| `approach.html` | Three-phase engagement approach |
| `about.html` | Differentiators and leadership team |
| `products.html` | Texplicit |
| `contact.html` | Enquiry form and company details |
| `privacy-policy.html` | Privacy policy |

## Assets

```
assets/css/styles.css   design system — all colours live in :root custom properties
assets/js/main.js       mobile nav, scroll reveal, contact-form mailto handoff
assets/img/             logo and favicon (SVG)
```

## Editing

**Colours and type** are CSS custom properties at the top of
`assets/css/styles.css`. Changing `--blue-600` or `--amber` re-themes the whole
site.

**Navigation and footer** are duplicated in the `<header>` / `<footer>` of each
page. If you add a page, update those blocks in all eight files.

**Adding a use case** — copy an existing `.uc-card` block (industries) or
`.usecase` block (services) and edit the text. The ID prefixes (`MM-01`,
`UC-13`) are labels only; nothing depends on them.

## Contact form

The site is static, so there is no backend to receive form posts. Submitting the
form composes a message in the visitor's own email client addressed to
`info@springandriver.com`. Nothing is sent to a third-party form service. To
switch to a hosted form handler later, replace the `data-mailto-form` handler in
`assets/js/main.js`.

## Deployment

`.github/workflows/deploy-pages.yml` publishes the repository root to GitHub
Pages on every push to the default branch. The workflow calls
`actions/configure-pages` with `enablement: true`, so Pages switches itself on
at the first successful run — no manual setting required.

If Pages does not appear, check **Settings → Pages** and confirm the source is
set to **GitHub Actions**.

### Custom domain

To serve this at `springandriver.com`, add a file named `CNAME` at the
repository root containing just the domain, then point DNS at GitHub Pages.
Do not add the `CNAME` file before the DNS records exist, or the site will 404.

## Notes

- Client names are deliberately absent. Use cases are described generically
  because client engagements are under NDA.
- Web fonts (Inter, JetBrains Mono) load from Google Fonts with system-font
  fallbacks, so the site still renders correctly if that request is blocked.
- The privacy policy is a reasonable starting point, not legal advice — have it
  reviewed before relying on it.

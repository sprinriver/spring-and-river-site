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

## Running it locally (Windows)

### Quickest look — no tools needed

Open the project folder in File Explorer and double-click `index.html`. It opens
in your default browser and the whole site works: navigation, styling, fonts and
anchor links. Nothing needs installing.

This works because the site is plain files with no server-side code. The address
bar will show `file:///C:/...` rather than `http://`, which is the one difference
from how it behaves once published.

### Proper local server — recommended while editing

A local server matches how GitHub Pages actually serves the site. Use it if you
are making real changes.

Open **PowerShell** in the project folder — in File Explorer, hold **Shift**,
right-click empty space in the folder, and choose *Open PowerShell window here*.
(On Windows 11 choose *Open in Terminal*.)

**If you have Python** (check with `python --version`):

```powershell
python -m http.server 8000
```

If `python` opens the Microsoft Store instead, use the Python launcher:

```powershell
py -m http.server 8000
```

**If you have Node.js instead** (check with `node --version`):

```powershell
npx serve .
```

Then open <http://localhost:8000/> in your browser. Press **Ctrl+C** in
PowerShell to stop the server.

If port 8000 is already in use, pick another — `python -m http.server 8080` —
and browse to `http://localhost:8080/`.

Neither Python nor Node installed? Get Python from
<https://www.python.org/downloads/windows/> and tick **"Add python.exe to PATH"**
during setup, or just use the double-click method above.

### With live reload — nicest for design work

Install [Visual Studio Code](https://code.visualstudio.com/), then the
**Live Server** extension (by Ritwick Dey). Open the project folder in VS Code,
right-click `index.html` in the sidebar and choose **Open with Live Server**.
The browser now refreshes itself every time you save a file.

### Seeing your CSS changes

Browsers cache stylesheets aggressively. If an edit to `assets/css/styles.css`
does not show up, hard-refresh with **Ctrl+F5** (or **Ctrl+Shift+R**).

### Checking the mobile layout

Press **F12** to open DevTools, then **Ctrl+Shift+M** to toggle the device
toolbar and pick a phone size. Worth doing after any layout change — the page
should never scroll sideways.

### Publishing your changes

```powershell
git add -A
git commit -m "Describe what you changed"
git push
```

The GitHub Actions workflow redeploys the site automatically within a minute or
two. Watch it under the repository's **Actions** tab.

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

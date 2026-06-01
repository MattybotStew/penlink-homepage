# Penlink Homepage — May 2026

A high-performance, component-driven marketing site for Penlink CoAnalyst 360. Features glassmorphic design, video backgrounds, animated sequences, and responsive layouts.

## Project Structure

```
penlink/
├── public/
│   ├── index.html              # Main app (all content)
│   ├── assets/                 # SVGs, images, JavaScript
│   ├── fonts/                  # Web fonts (JetBrains Mono, Plus Jakarta Sans)
│   └── images/                 # Logos, hero images
├── app/
│   ├── components/             # Reusable component markup
│   ├── styles/                 # Extracted stylesheets
│   └── scripts/                # Extracted JavaScript modules
├── package.json                # Dependencies & build scripts
├── assetMap.json               # Asset UUID mapping
├── gemini-code-*.md            # Design specifications
└── README.md                   # This file
```

## Current Sections

### 1. **Hero Section** (`.plhp-hero`)
- Full-bleed video background layer
- Glassmorphic overlay with 2-column flex layout
- Left column: Pill tag + H1 headline with gradient text
- Right column: CTA button + feature badges
- **Existing elements:**
  - Video background: `ca3c8c3a-6326-4956-a29d-be70aaef602f.jpg`
  - Animations: Fade-in, text reveal

### 2. **CoAnalyst 360 Feature Block** (`.plhp-co360`)
- Animated message console simulation
- Shows agent coordination workflow
- Multi-step animation sequence with typing effect
- Tools displayed: CDR search, OSINT scanning, graph clustering, geotime timeline
- Insights card with chip badges
- **Existing elements:**
  - JavaScript animation controller: `70b2cd97-3339-4383-9e03-6cb1bd22fd36.js`
  - Frame chrome with dots, status, restart button

### 3. **Mission Section** (`.plhp-mission`)
- CEO/leadership letter or company mission statement
- 6 adaptive color background states for cards:
  - `cream` (#fbf9f4)
  - `gray` (#f4f5f7)
  - `blue` (#eef3fc)
  - `lime` (#f6fad9)
  - `cyan-mint` (#e6faf6)
  - `white` (#ffffff)
- Typography: Plus Jakarta Sans with letter-spacing adjustments

## Design Tokens

### Color System
- **Primary Dark:** `#0a1838` → `#04102a` gradient
- **Brand Accent 1 (Blue):** `#3472f4` (18% opacity glow)
- **Brand Accent 2 (Teal):** `#00dcc3` (14% opacity glow)
- **Text Gradient:** `#00dcc3` → `#daf355`
- **Ink Scale:** 050–900 variants

### Typography
- **Headers:** Plus Jakarta Sans, Bold/ExtraBold, -2% tracking
- **Labels:** Plus Jakarta Sans, Uppercase, +6% tracking
- **Monospace:** JetBrains Mono (400, 500 weights)

### Responsive Breakpoints
- Desktop base: 1440px
- Mobile-first approach with safe text wrapping
- Flexible container layouts (no hard-coded dimensions)

## Running Locally

```bash
# Install dependencies (optional, for local server)
npm install

# Start development server
npm start

# Serve without auto-open
npm run serve
```

Visit `http://localhost:8080` in your browser.

## Editing & Customization

### Edit Content
All HTML content is in `public/index.html`. Modify sections by class:
- `.plhp-hero` — Hero section markup
- `.plhp-co360` — Feature animation block
- `.plhp-mission` — Mission/CEO section

### Edit Styles
Styles are embedded in `<style>` tags in `public/index.html`. Look for:
```
.plhp-hero { ... }
.plhp-co360 { ... }
.plhp-mission { ... }
```

### Edit Scripts
JavaScript is in `<script>` tags and the file `public/assets/70b2cd97-3339-4383-9e03-6cb1bd22fd36.js`. The animation controller uses:
- `STATE_SELECTOR` — Target element for message injection
- `STEPS` array — Animation sequence (messages, delays, thinking states)

### Replace Assets
Update paths in `public/index.html`:
- **Logo:** Replace `logoWhite.png`, `logoColor.png`
- **Hero image:** Replace `ca3c8c3a-6326-4956-a29d-be70aaef602f.jpg`
- **SVG icons:** Replace numbered `.svg` files in `public/assets/`

### Add New Sections
1. Add markup below `.plhp-mission` in `public/index.html`
2. Create CSS class like `.plhp-newsection`
3. Add styles in the `<style>` block using the color token system
4. Ensure responsive design with flexbox/grid

## Font Loading

Fonts are self-hosted in `public/fonts/`:
- **JetBrains Mono:** Multiple unicode ranges (Cyrillic, Greek, Vietnamese, Latin)
- **Plus Jakarta Sans:** Weights 400, 500, 600, 700

All fonts use `font-display: swap` for fast rendering.

## Build & Deployment

### Development
```bash
npm run serve
```

### Production
The `public/` folder is production-ready. Deploy directly to any static host:
- **Netlify:** Connect to the repo, deploy `public/`
- **Vercel:** Same as above
- **AWS S3 + CloudFront:** Sync `public/` folder

### Asset Optimization
For production:
1. Compress images in `public/images/`
2. Minify CSS in `public/index.html` `<style>` block
3. Minify JavaScript in `public/assets/*.js` and `<script>` blocks

## Git Workflow

```bash
# Initialize (if not already done)
git init
git add .
git commit -m "feat: extract bundled app to source structure"

# Create branches for new features
git checkout -b feature/new-section
# ... make changes ...
git commit -m "feat: add testimonials section"
git push origin feature/new-section
```

## FAQ

**Q: How do I add a new section?**
A: Add markup and CSS to `public/index.html`. Use classes prefixed with `.plhp-` to avoid conflicts. Follow the color token system for consistency.

**Q: Can I use a framework like React?**
A: Yes. This is vanilla HTML/CSS/JS for simplicity, but you can migrate to React by creating a build step. Create `app/` folder with components and build to `public/`.

**Q: Where are the video assets?**
A: The video `20260515-1319-35.8159791.mp4` is in the root. Reference it in CSS/HTML as `../20260515-1319-35.8159791.mp4` from the `public/` folder, or move it to `public/assets/` and update paths.

**Q: How do I customize colors?**
A: Edit the CSS variables in the `<style>` block:
```css
.plhp-block {
  --c-paper: #ffffff;
  --c-blue-700: #1b3fb8;
  /* ... etc */
}
```

## Next Steps

1. ✅ Extract bundled app to source
2. ⬜ Design and implement new sections (teams, testimonials, pricing, etc.)
3. ⬜ Optimize images and fonts
4. ⬜ Set up CI/CD pipeline
5. ⬜ Deploy to production

## Contact

For design specs and architecture details, see `gemini-code-*.md`.

# Development Guide — Penlink Homepage

## Quick Start

```bash
# Navigate to project
cd /Users/mattstewart/penlink

# Start local server (optional)
npm install
npm run serve

# Open in browser
open http://localhost:8080
```

---

## Project Files Overview

### Core Files
- **`public/index.html`** — Complete app (edit here for content/styles)
- **`README.md`** — Project overview & deployment guide
- **`SECTIONS.md`** — Detailed guide to each section (3 blocks + templates)
- **`package.json`** — Dependencies & npm scripts
- **`.gitignore`** — Git ignore rules

### Assets
- **`public/assets/`** — SVGs, images, JavaScript
- **`public/fonts/`** — Self-hosted web fonts (JetBrains Mono, Plus Jakarta Sans)
- **`public/images/`** — Logos (logoWhite.png, logoColor.png)

### Root-level Assets
- **`20260515-1319-35.8159791.mp4`** — Hero video background
- **`gemini-code-*.md`** — Design architecture specs
- **`index.html`** — Old bundled version (keep for reference)

---

## Editing Workflow

### 1. Open `public/index.html`
This is your main file. It contains:
- All HTML markup (3 sections + footer/nav)
- All CSS styles (`<style>` tag)
- All JavaScript (`<script>` tags)

### 2. Find Your Section
Search by class name:
- **Hero:** `plhp-hero`
- **CoAnalyst 360:** `plhp-co360`
- **Mission:** `plhp-mission`

See [SECTIONS.md](SECTIONS.md) for line numbers and detailed guides.

### 3. Make Changes
- **Content:** Edit text directly in HTML
- **Styling:** Modify `<style>` block
- **Animations:** Edit `<script>` blocks
- **Images:** Update file paths (relative to `public/`)

### 4. Save & Test
```bash
npm run serve  # Start server
# Refresh browser to see changes
```

### 5. Commit to Git
```bash
git add public/index.html
git commit -m "feat: update hero headline"
git push origin main
```

---

## Working with the Hero Video

The hero background uses `20260515-1319-35.8159791.mp4`. 

### Current Setup (in `public/index.html`):
```html
<div class="plhp-hero__video-fallback" 
     style="background: url('../20260515-1319-35.8159791.mp4'); 
            background-size: cover;
            background-position: center;">
</div>
```

### To use video natively:
1. Move video to `public/assets/`: `cp 20260515-1319-35.8159791.mp4 public/assets/`
2. Update the markup in `public/index.html`:
```html
<div class="plhp-hero__video-wrapper">
  <video autoplay muted loop playsinline>
    <source src="assets/20260515-1319-35.8159791.mp4" type="video/mp4">
  </video>
</div>
```
3. Update CSS:
```css
.plhp-hero__video-wrapper {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.plhp-hero__video-wrapper video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

---

## Common Tasks

### Change Hero Headline
Find line ~1890 in `public/index.html`:
```html
<!-- BEFORE -->
<h1>Safeguarding communities, nations and <span class="plhp-accent">enterprises.</span></h1>

<!-- AFTER -->
<h1>Your new headline here with <span class="plhp-accent">highlighted text.</span></h1>
```

### Change Primary CTA Button
Find line ~1900:
```html
<!-- BEFORE -->
<a href="#" class="plhp-btn plhp-btn--primary">Get a Demo →</a>

<!-- AFTER -->
<a href="/contact" class="plhp-btn plhp-btn--primary">Schedule Call →</a>
```

### Change Mission Section Color
Find line ~2050:
```html
<!-- BEFORE -->
<section class="plhp-mission" data-color="cream">

<!-- AFTER (pick one) -->
<section class="plhp-mission" data-color="gray">
<section class="plhp-mission" data-color="blue">
<section class="plhp-mission" data-color="lime">
<section class="plhp-mission" data-color="cyan-mint">
<section class="plhp-mission" data-color="white">
```

### Add New Animation Step to CoAnalyst 360
Find the `<script>` block with `var STEPS = [...]` and add:
```javascript
{
  kind: 'msg',
  role: 'agent',
  delay: 2500,
  thinking: 'Analyzing results...',
  thinkingDuration: 1500,
  html: 'Key finding: <strong>4 high-confidence clusters</strong> identified in the CDR data.'
}
```

### Add a New Section
1. Find the closing `</section>` of `.plhp-mission` (line ~2100)
2. Add after it:
```html
<section class="plhp-block plhp-testimonials" id="testimonials">
  <div class="plhp-container">
    <h2>What Customers Say</h2>
    <div class="plhp-testimonials__grid">
      <div class="plhp-testimonial-card" data-color="blue">
        <p>"CoAnalyst 360 changed how we investigate."</p>
        <strong>— Jane Doe, Security Director</strong>
      </div>
    </div>
  </div>
</section>
```

3. Add CSS in the `<style>` block:
```css
.plhp-testimonials {
  padding: 80px 40px;
  background: linear-gradient(135deg, #f6fad9 0%, #fbf9f4 100%);
}

.plhp-testimonials h2 {
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -2%;
  margin-bottom: 40px;
  text-align: center;
}

.plhp-testimonials__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.plhp-testimonial-card {
  padding: 24px;
  border-radius: 12px;
  background-color: var(--c-paper);
  border: 1px solid #e2e7f0;
}
```

---

## Git Workflow for Features

```bash
# Create a feature branch
git checkout -b feature/add-testimonials

# Make edits to public/index.html, etc.

# Commit changes
git add public/index.html
git commit -m "feat: add testimonials section with 3 cards"

# Push to GitHub (or origin)
git push origin feature/add-testimonials

# Create pull request or merge
git checkout main
git merge feature/add-testimonials
git push origin main
```

---

## Styling Conventions

### Use CSS Variables (defined in `<style>`):
```css
.plhp-block {
  --c-paper: #ffffff;
  --c-blue-700: #1b3fb8;
  --c-ink-900: #0a1838;
}

.my-element {
  background: var(--c-paper);
  color: var(--c-ink-900);
}
```

### Responsive Breakpoints:
```css
/* Desktop (base) */
.my-section { padding: 80px 40px; }

/* Tablet */
@media (max-width: 768px) {
  .my-section { padding: 60px 24px; }
}

/* Mobile */
@media (max-width: 480px) {
  .my-section { padding: 40px 16px; }
}
```

### Typography Patterns:
```css
/* Heading with tight tracking */
h1 {
  font-family: 'Plus Jakarta Sans';
  font-size: 56px;
  font-weight: 700;
  letter-spacing: -2%;
}

/* Label with expanded tracking */
label {
  font-family: 'Plus Jakarta Sans';
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 6%;
  text-transform: uppercase;
}

/* Code/monospace */
code {
  font-family: 'JetBrains Mono';
  font-size: 14px;
}
```

---

## Performance Tips

### Images
- Compress hero image with `imagemin` or similar
- Use WebP with fallbacks for newer browsers:
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="...">
</picture>
```

### Fonts
- Self-hosted fonts already use `font-display: swap`
- Consider limiting font weights to what's used
- Preload critical fonts:
```html
<link rel="preload" as="font" href="/fonts/Plus-Jakarta-Sans-700.woff2" type="font/woff2" crossorigin>
```

### JavaScript
- Animation script is small & vanilla (no dependencies)
- Minify before deployment

### CSS
- Scoped to `.plhp-` prefix to avoid conflicts
- Use CSS containment for performance:
```css
.plhp-section {
  contain: layout style paint;
}
```

---

## Browser Support

- **Modern browsers:** Chrome 90+, Safari 15+, Firefox 88+
- **CSS features used:** Flexbox, Grid, CSS Custom Properties, `backdrop-filter`
- **JavaScript:** ES5+ (no IE11 support)

If you need older browser support:
- Remove `backdrop-filter` (fallback to solid colors)
- Use Babel to transpile ES6+ down to ES5
- Use `@supports` for feature detection

---

## Troubleshooting

### Styles not applying?
- Clear browser cache (Cmd+Shift+R)
- Check CSS specificity (`.plhp-` prefix should be specific enough)
- Open DevTools (F12) and inspect element

### Images not loading?
- Check file paths are relative to `public/` folder
- Ensure files exist in `public/assets/`, `public/images/`, or `public/fonts/`
- Use absolute paths `/assets/image.jpg` when serving from root

### JavaScript errors?
- Open browser console (F12 > Console tab)
- Check for typos in variable names
- Ensure inline `<script>` is not inside a template tag

### Video not playing?
- Check video format is supported (MP4 with H.264 codec)
- Add `crossorigin="anonymous"` if serving from different domain
- Test with `<video controls autoplay muted loop>` directly

---

## Next Steps

1. **Read [SECTIONS.md](SECTIONS.md)** for detailed editing guides
2. **Read [README.md](README.md)** for deployment & build info
3. **Edit `public/index.html`** to customize content
4. **Test with `npm run serve`**
5. **Commit & push to GitHub**

Happy editing! 🚀

# Penlink Homepage — Available Sections

## Current Page Structure

Your site has **3 main sections** ready to edit. All markup is in `public/index.html`, organized by CSS class prefixes.

---

## 1️⃣ Hero Section
**Class:** `.plhp-hero`  
**Location:** Line ~1872 in `public/index.html`

### What it includes:
- Full-bleed video background
- Glassmorphic overlay scrim
- Left column (40%):
  - Pill tag: `"NEW | INTRODUCING COANALYST 360 · AGENTIC AI FOR INVESTIGATIONS"`
  - H1 headline: `"Safeguarding communities, nations and enterprises."`
  - Lead paragraph with benefit copy
  - CTA button: "Get a Demo" (with arrow icon)
  - Secondary CTA: "NEW" badge + video play link
  - Trust indicators (dots + tagline)
- Right column (60%):
  - Reserved for video/animation

### How to edit:
Find `<section class="plhp-hero">` and modify:
- Headline text: `<span class="plhp-accent">enterprises.</span>`
- Button text: `Get a Demo`
- Trust text: Customize the dots and tagline
- Background: Replace video in `.plhp-hero__video-fallback`

### Styling:
```css
.plhp-hero {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to right, rgba(10, 24, 56, 0.8), rgba(27, 63, 184, 0.4));
}
```

---

## 2️⃣ CoAnalyst 360 Feature Block
**Class:** `.plhp-co360`  
**Location:** Line ~1920+ in `public/index.html`

### What it includes:
- Animated message console (chat-like interface)
- Multi-step animation sequence showing:
  1. User query about communication patterns
  2. Agent thinking state ("Coordinating agents...")
  3. Tools being used (CDR search, OSINT, graph clustering, geotime)
  4. Agent response with findings
  5. Insight cards with metric chips
  6. Follow-up messages
- Frame chrome with:
  - Dot indicators (3 dots for status)
  - Title: "CoAnalyst 360"
  - Status badge: "Live"
  - Restart button (↻)

### How to edit:
Find `<div class="plhp-co360">` and modify:
- **Animation steps:** Edit the `STEPS` array in `<script>` section
- **Message content:** Change `text:` and `html:` properties
- **Tools list:** Update tool names in `<span class="plhp-tool">`
- **Colors & timing:** Adjust CSS + JavaScript delays

### Animation structure (in JavaScript):
```javascript
var STEPS = [
  { kind: 'msg', role: 'user', delay: 300, text: '...' },
  { kind: 'msg', role: 'agent', delay: 900, thinking: '...', html: '...' },
  // ... more steps
];
```

### Styling:
```css
.plhp-co360 {
  background: var(--c-ink-900);
  border-radius: 16px;
  padding: 24px;
  max-width: 600px;
}
```

---

## 3️⃣ Mission Section
**Class:** `.plhp-mission`  
**Location:** Line ~2050+ in `public/index.html`

### What it includes:
- Background color selection (6 variants available)
- Heading: "Our Mission"
- Descriptive paragraph
- Call-to-action button
- Optional: Feature cards with color backgrounds

### Available color backgrounds:
1. `cream` — `#fbf9f4` (warm paper)
2. `gray` — `#f4f5f7` (light gray)
3. `blue` — `#eef3fc` (pale blue)
4. `lime` — `#f6fad9` (pale lime)
5. `cyan-mint` — `#e6faf6` (cyan mint)
6. `white` — `#ffffff` (pure white)

### How to edit:
Find `<section class="plhp-mission">` and modify:
- Heading: `<h2>Our Mission</h2>`
- Copy: Paragraph text
- Button: `<a class="plhp-btn">` element
- Color: Change `data-color="cream"` to any of the 6 options

### Styling:
```css
.plhp-mission {
  padding: 80px 40px;
  border-radius: 24px;
  background-color: var(--c-paper-warm);
}

.plhp-mission[data-color="blue"] {
  background-color: #eef3fc;
}
```

---

## Global Styles & Components

### Buttons
- **Primary:** `.plhp-btn.plhp-btn--primary` (dark background with accent)
- **Secondary:** `.plhp-btn.plhp-btn--secondary` (transparent with border)

```css
.plhp-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
}
```

### Containers
- `.plhp-container` — Max-width wrapper (1200px default)
- `.plhp-block` — Section wrapper with token scoping

### Typography
- `Plus Jakarta Sans` — Primary font (headers, body)
- `JetBrains Mono` — Code/monospace blocks
- **Heading tracking:** `-2%` for tight headers
- **Label tracking:** `+6%` for uppercase labels

---

## Next Steps: Adding New Sections

### Template for a new section:
```html
<section class="plhp-block plhp-newsection" id="newsection">
  <div class="plhp-container">
    <h2>Section Title</h2>
    <p>Section description...</p>
    <a href="#" class="plhp-btn plhp-btn--primary">
      CTA Text
    </a>
  </div>
</section>
```

### Add corresponding CSS:
```css
.plhp-newsection {
  padding: 80px 40px;
  background: linear-gradient(135deg, var(--c-paper) 0%, var(--c-cream) 100%);
}

.plhp-newsection h2 {
  font-family: 'Plus Jakarta Sans';
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -2%;
  margin-bottom: 24px;
}
```

---

## File Locations Quick Reference

| Item | Path |
|------|------|
| Main markup & styles | `public/index.html` |
| Animation script | `public/assets/70b2cd97-3339-4383-9e03-6cb1bd22fd36.js` |
| Logos | `public/images/{logoWhite,logoColor}.png` |
| Hero image | `public/assets/ca3c8c3a-6326-4956-a29d-be70aaef602f.jpg` |
| SVG icons | `public/assets/*.svg` |
| Web fonts | `public/fonts/*.woff2` |
| Design specs | `gemini-code-*.md` |

---

## Common Edits

### Change hero headline
Line ~1890:
```html
<h1>Safeguarding communities, nations and <span class="plhp-accent">enterprises.</span></h1>
```

### Change hero CTA button text
Line ~1900:
```html
<a href="#" class="plhp-btn plhp-btn--primary">
  YOUR TEXT HERE
</a>
```

### Change mission section color
Line ~2050 (approx):
```html
<section class="plhp-mission" data-color="lime">
  <!-- change "lime" to: cream, gray, blue, cyan-mint, white -->
</section>
```

### Add new animation step to CoAnalyst 360
Find the JavaScript `STEPS` array and add:
```javascript
{
  kind: 'msg',
  role: 'agent',
  delay: 2000,
  thinking: 'Processing...',
  thinkingDuration: 1200,
  html: 'Your response here with <strong>formatting</strong>'
}
```

---

## Ready to build? 🚀

All sections are editable directly in `public/index.html`. When done:

```bash
# Test locally
npm run serve

# View at http://localhost:8080
```

For major redesigns, branch it:
```bash
git checkout -b feature/new-design
# make changes...
git commit -m "feat: redesign hero section"
git push origin feature/new-design
```

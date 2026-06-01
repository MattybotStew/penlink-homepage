# Design Reference — Penlink Homepage

## Design Language

The Penlink homepage uses a **dark-mode-first, glassmorphic** aesthetic that signals trust, precision, and technological depth. The palette is anchored in deep navy with electric teal and lime accent pairing — aggressive enough to read as modern AI software, grounded enough for an enterprise security audience.

---

## Color System

### Core Palette

| Token | Hex | Usage |
|---|---|---|
| `--c-ink-900` | `#0a1838` | Page background, section fills |
| `--c-ink-850` | `#04102a` | Gradient terminus, card backgrounds |
| `--c-blue-accent` | `#3472f4` | Interactive elements, glows |
| `--c-teal-accent` | `#00dcc3` | Gradient text start, highlights |
| `--c-lime-accent` | `#daf355` | Gradient text end, badge fills |

### Glow Overlays
Blue and teal accents are used as radial glows at reduced opacity:
- Blue glow: `rgba(52, 114, 244, 0.18)`
- Teal glow: `rgba(0, 220, 195, 0.14)`

### Light Section Backgrounds (Mission / content blocks)
| Name | Hex |
|---|---|
| `cream` | `#fbf9f4` |
| `gray` | `#f4f5f7` |
| `blue` | `#eef3fc` |
| `lime` | `#f6fad9` |
| `cyan-mint` | `#e6faf6` |
| `white` | `#ffffff` |

### Gradient Text
Headline accents use a left-to-right CSS gradient:
```css
background: linear-gradient(90deg, #00dcc3, #daf355);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

---

## Typography

### Typefaces
- **Plus Jakarta Sans** — All headings, labels, body copy
- **JetBrains Mono** — Console UI, code blocks, monospace data

### Scale

| Role | Size | Weight | Tracking |
|---|---|---|---|
| H1 hero | 56px | 700 | -2% |
| H2 section | 48px | 700 | -2% |
| H3 subsection | 32px | 600 | -1% |
| Body | 16–18px | 400 | 0 |
| Label / overline | 12px | 600 | +6%, uppercase |
| Console text | 14px (JetBrains Mono) | 400–500 | 0 |

### Rules
- Tight tracking (`-2%`) on all display headings
- Uppercase labels always have expanded tracking (`+6%`)
- Monospace only in the CoAnalyst console, code snippets, and data readouts — never for body copy

---

## Spacing & Layout

### Container
- Max-width: `1200px`, centered
- Side padding: `40px` desktop / `24px` tablet / `16px` mobile

### Section Padding
- Full-bleed sections (Hero, dark blocks): `0` — content manages its own inset
- Content sections: `80px 40px` desktop → `60px 24px` tablet → `40px 16px` mobile

### Grid
- Hero: 2-column flex — left 40% / right 60%
- Feature cards: `auto-fit` grid, `minmax(300px, 1fr)`
- Collapses to single column at `768px`

### Border Radius
| Component | Radius |
|---|---|
| Page sections | `24px` |
| Cards / panels | `16px` |
| Buttons | `8px` |
| Pill tags / badges | `999px` (fully rounded) |

---

## Glassmorphism

Used in the hero overlay and any card that sits over a dark or image background.

```css
background: rgba(255, 255, 255, 0.04);
backdrop-filter: blur(12px) saturate(1.4);
border: 1px solid rgba(255, 255, 255, 0.08);
```

For more opaque surfaces (e.g., console frame):
```css
background: rgba(10, 24, 56, 0.72);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

---

## Components

### Buttons

**Primary** — dark fill with teal/lime gradient hover or accent border
```css
.plhp-btn--primary {
  background: #0a1838;
  color: #ffffff;
  border: 1px solid #3472f4;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
}
```

**Secondary** — transparent with border
```css
.plhp-btn--secondary {
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255,255,255,0.24);
}
```

### Pill / Badge
Small, fully-rounded label used for status indicators, overlines, and NEW tags:
```css
.plhp-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 6%;
  text-transform: uppercase;
}
```

### Feature Badge
Icon + label chips used in the hero right column:
- Background: tinted glass (`rgba(255,255,255,0.06)`)
- Border: `1px solid rgba(255,255,255,0.1)`
- Icon: SVG inline, `20px`

### CoAnalyst Console
Dark panel simulating a multi-agent coordination interface:
- Frame chrome: three-dot status row + title + "Live" badge + restart button
- Message bubbles: user (right-aligned) vs. agent (left-aligned)
- Tool chips: `<span class="plhp-tool">` — pill-style with a distinct fill color
- Thinking state: animated ellipsis or spinner during `thinkingDuration`
- Insight card: structured output card embedded in agent message

### Navigation
- Logo left, links right
- Transparent over hero, can shift to a frosted glass bar on scroll
- CTA button in nav mirrors the hero primary button style

---

## Animation Principles

- **Entrance:** Fade-in + 8–12px upward translate, `400ms ease-out`, staggered by 80ms per element
- **Console typing:** Characters revealed progressively; thinking state shows before full message
- **Hover:** `200ms ease` on all interactive elements — no jarring snap
- **Glow pulse:** Subtle radial glow behind accent elements, `3s ease-in-out infinite alternate`
- **No autoplay video with sound** — all video is muted and loops silently

---

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| `> 1024px` | Two-column hero, full nav |
| `768px – 1024px` | Narrow two-column or stacked, nav collapses |
| `< 768px` | Single-column, hamburger nav, reduced font sizes |
| `< 480px` | Mobile-optimized padding, button stacks vertically |

---

## Brand Rules

- **Never** stretch or recolor the Penlink logo
- Logo on dark: `logoWhite.png`
- Logo on light: `logoColor.png`
- The teal–lime gradient is the primary brand expression — use it on accents, not backgrounds
- Enterprise tone: no consumer-style emojis in body copy or headings

---

## Planned Sections (not yet built)

| Section | Purpose |
|---|---|
| Social proof / customers | Logos of law enforcement / government customers |
| How it works | 3-step explainer with numbered cards |
| Testimonials | Quotes with attribution and light card backgrounds |
| Pricing / plans | Tier comparison or "contact for pricing" CTA |
| Footer | Links, legal, logo, social |

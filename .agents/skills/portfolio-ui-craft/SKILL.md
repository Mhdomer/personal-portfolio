---
name: portfolio-ui-craft
description: UI craft and frontend design engineering standards for Mohamed Makhlouf's Tech Superpower Portfolio. Use when styling, adding, or modifying React components, tweaking Tailwind tokens, adjusting Sakura canvas physics, or building new interactive engine cylinders without generic AI templates.
---

# Portfolio UI Craft & Design Engineering

This skill defines the visual language, design constraints, CSS utilities, and component modification recipes for the portfolio.

---

## 1. Design System & Aesthetics

The design fuses two core concepts:
1. **The Mechanical Engine:** High-contrast telemetry, clean monospace badges (`JetBrains Mono`), dark charcoal backgrounds (`#0b0f17`), and engine cyan (`#38bdf8`) accents.
2. **Japanese Sakura & Kaizen:** Gentle pink accents (`#f472b6`, `#fb7185`), glassmorphic panels, falling petal animations (`SakuraCanvas.jsx`), and disciplined whitespace.

### Color Tokens (Tailwind)
- **Background Deep Charcoal:** `bg-charcoal-900` (`#0b0f17`), cards `bg-charcoal-800` (`#161d2b`), headers `bg-charcoal-950` (`#06090e`).
- **Sakura Accents:** `text-sakura-300` (`#f9a8d4`), `bg-sakura-500` (`#ec4899`), borders `border-sakura-500/30`.
- **Engine Accents:** `text-engine-cyan` (`#38bdf8`), `bg-engine-cyan/20`, borders `border-engine-cyan/30`.
- **Typography:**
  - Body & Headlines: `Plus Jakarta Sans`, sans-serif.
  - Telemetry, Badges, Metrics: `JetBrains Mono`, monospace.

---

## 2. Reusable CSS Utilities & Glassmorphism Recipes

Defined in `src/index.css`:

```css
/* Glass panel container */
.glass-panel {
  background: rgba(22, 29, 43, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Compact glass card */
.glass-card {
  background: rgba(22, 29, 43, 0.5);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
```

---

## 3. Component Modification Recipes

### How to Add a New Project Card to `src/components/Projects.jsx`
1. Locate the `projects` array in `Projects.jsx`.
2. Append a new object following the standard schema:
```javascript
{
  id: 'project-slug',
  title: 'Project Title: Subtitle',
  tagline: 'Grounded single-sentence technical claim',
  category: 'cloud-security' | 'ai-security' | 'education',
  featured: false,
  github: 'https://github.com/Mhdomer/repo-name',
  badge: 'Category Badge',
  stats: { metricA: 'p99 120ms', metricB: '100% test pass', metricC: 'Scale to Zero' },
  description: 'Technical explanation of what was built, what broke, and how it was resolved.',
  tags: ['Tech1', 'Tech2', 'AWS Service'],
  awsServices: ['AWS Service 1', 'AWS Service 2'],
}
```

### How to Add or Modify an Interactive Cylinder in `CreativeEngineModal.jsx`
1. Increment the cylinder count or modify one of the existing 4 cylinders.
2. In the top cylinder navigation bar, add the button with a corresponding Lucide icon.
3. In the modal body, add the condition:
```jsx
{activeCylinder === N && (
  <div className="space-y-6">
    {/* Clean, interactive station content */}
  </div>
)}
```
4. Ensure interactive feedback: tactile click response, real state updates, and clean fallback if audio/confetti is blocked.

### How to Tune Sakura Canvas Physics in `src/components/SakuraCanvas.jsx`
- **Petal Count:** Governed by `petalCount = Math.floor(canvas.width / 55)`. Keeps CPU usage under 2% on mobile.
- **Wind & Sway:** Governed by `Math.sin(p.sway)`. Do not make petals jittery or move at high velocity. The motion should be slow, serene, and relaxing.

---

## 4. Anti-AI Slop Checklist for Any Component Edit

Before finishing a component change, verify:
- [ ] No generic corporate marketing text ("fast-paced world", "empowering", "cutting-edge").
- [ ] No em dashes (`—`, `–`, `--`) used as sentence pauses.
- [ ] Contrast ratio is readable against `#0b0f17` (text is `text-white` or `text-slate-300`).
- [ ] All metrics, latency numbers, and AWS services render in `font-mono`.
- [ ] The `[ Superpower Engine ]` visible hint button is present in `Navbar.jsx`.
- [ ] `npm run build` compiles in under 2.5 seconds with zero Rollup warnings.

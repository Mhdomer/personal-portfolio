---
trigger: always_on
description: Design craft and frontend engineering standards for Mohamed Makhlouf's portfolio. Enforces color discipline, monospace telemetry, 60fps animations, and mobile ergonomics.
---

# UI Craft & Design Engineering Standards

This project combines the calm aesthetics of Japanese Sakura with the mechanical precision of high-performance engines. When modifying or creating frontend components, adhere to these standards.

---

## 1. Color Palette & Thematic Discipline

Do not invent random hex codes. Stick to the curated Tailwind design system defined in `tailwind.config.js`:

| Token | Hex Value | Intended Usage |
| :--- | :--- | :--- |
| `charcoal-950` | `#06090e` | Deepest background (footer, terminal consoles) |
| `charcoal-900` | `#0b0f17` | Primary page canvas background |
| `charcoal-800` | `#161d2b` | Card bodies, dropdowns, modal shells |
| `charcoal-700` | `#222d42` | Hover states, active tabs, secondary button fills |
| `sakura-300` | `#f9a8d4` | Highlight text, subtle glow accents, badge borders |
| `sakura-400` | `#f472b6` | Primary sakura accent, icons, interactive hover states |
| `sakura-500` | `#ec4899` | Primary CTA buttons, gradient endpoints |
| `engine-cyan` | `#38bdf8` | Telemetry readouts, latency values, AWS tags, code links |
| `slate-100` | `#f1f5f9` | Primary readable headline and body text |
| `slate-400` | `#94a3b8` | Secondary body text, subheadings, unselected tabs |
| `slate-500` | `#64748b` | Metadata labels, timestamps, border dividers |

---

## 2. Typography Rules

1. **Body & Headlines:** Render in `Plus Jakarta Sans`. Use clean weights: `font-normal` (400) for long text, `font-semibold` (600) for subheads, and `font-bold` / `font-extrabold` (700/800) for section titles.
2. **Telemetry, Benchmarks & Code:** MUST ALWAYS render in `font-mono` (`JetBrains Mono`). This includes:
   - Latency figures (e.g. `115ms p99`)
   - RPM counters (e.g. `1200 RPM`, `8800 RPM`)
   - Section numbers (e.g. `01 // THE STORY & ROOTS`)
   - AWS service names and tech tags
   - Academic codes and dates

---

## 3. Micro-Interactions & Usability

1. **Visible Hint Invariant:** The `[ Superpower Engine ]` button with its pulsing badge in `Navbar.jsx` and `Hero.jsx` is an AWS Hackathon rubric requirement. It must NEVER be removed, hidden, or obscured.
2. **Keyboard Accessibility:** Any modal or overlay (like `CreativeEngineModal.jsx`) must close when the user presses `ESC`, and must trap or restore focus cleanly.
3. **Smooth State Transitions:** Use `transition-all duration-200 ease-out` on buttons and cards. Avoid abrupt or jarring layout shifts.
4. **Canvas Performance:** `SakuraCanvas.jsx` must always stay behind interactive elements (`z-0` or `z-10` with `pointer-events-none`). Its loop must use `requestAnimationFrame` and cleanly call `cancelAnimationFrame` in the `useEffect` cleanup return.

---

## 4. Mobile Ergonomics & Breakpoints

- Ensure zero horizontal scrolling (`overflow-x-hidden` on outer shell).
- Mobile navigation drawer in `Navbar.jsx` must support one-tap closing on any link click.
- Modal panels must have `max-h-[90vh]` or `overflow-y-auto` with clean padding on mobile screens down to 360px.

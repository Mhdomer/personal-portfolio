# CLAUDE.md: Development & Contribution Guide

## Project Overview
Personal portfolio website and interactive cloud security workbench built by Mohamed Makhlouf (Omar / Mhdomar), Cloud Security & DevSecOps Engineer and final-year Computer Science student at Universiti Teknologi Malaysia (UTM).

- **Live URL:** https://mhdomar.pages.dev
- **Repository:** https://github.com/Mhdomer/personal-portfolio
- **Hosting:** Cloudflare Pages Edge CDN (auto-deployed from `main` on GitHub; `amplify.yml` retained for AWS Amplify compatibility).

## Tech Stack
- Framework: React 19 + Vite 6
- Styling: Tailwind CSS 3.4 (warm editorial paper, charcoal, and terracotta tokens)
- Motion: Framer Motion 14 + native View Transitions API
- Icons: Lucide React + custom SVG icons (`src/components/Icons.jsx`)
- Interactive Workbench: 6-node SVG architecture traces (`InteractiveArchitectureTrace.jsx`), syntax-highlighted HCL/Python/YAML specs with 12 trade-off pins (`AnnotatedCodeSpec.jsx`), and 18 proof-linked skill pills (`Superpowers.jsx`)

## Invariants & Rules
1. **Strictly Zero Em Dashes:** Never use em dashes (`—`, `–`, or `--` used as an em dash). Use commas, periods, colons, parentheses, or clean bullet points.
2. **Commit Messages:** Short, conventional, human commit messages without emojis or AI boilerplate (e.g., `feat: ...`, `fix: ...`, `docs: ...`).
3. **No Shell `cd` Commands:** Run commands directly in `/mnt/data/Projects/personal-portfolio`.
4. **Tone:** Grounded, authentic human student engineer voice (senior CS student at UTM / IT operations at Al-Ameen Medical Complex in Riyadh).
5. **Cross-Browser & Mobile Safety:** Avoid ES2018+ variable-length regex lookbehinds that break Safari `< 16.4`, preserve mobile `.webp` resume fallback in `AtsResumeModal.jsx`, and maintain `0px` horizontal overflow down to `360px`.

## Key Commands
- Dev Server: `npm run dev`
- Production Build: `npm run build`
- Preview Build: `npm run preview`

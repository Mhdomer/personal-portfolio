# CLAUDE.md - Development & Contribution Guide

## Project Overview
Personal portfolio website and interactive cloud security defense workbench built by Mohamed Makhlouf (Omar / Mhdomar), Cloud DevSecOps & AI Security Engineer and Computer Science student at Universiti Teknologi Malaysia (UTM).

Deployed live via **AWS Amplify Hosting** with global CloudFront distribution.

## Tech Stack
- Framework: React 19 + Vite 6
- Styling: Tailwind CSS 3.4 (custom charcoal, terracotta, and cyber color tokens)
- Icons: Lucide React + custom SVG icons (`src/components/Icons.jsx`)
- Effects: Canvas Confetti + HTML5 2D Canvas + Interactive Katana Slice
- Hosting: AWS Amplify Hosting (`amplify.yml`)

## Invariants & Rules
1. **Strictly Zero Em Dashes:** Never use em dashes (`—`, `–`, or `--` used as an em dash). Use commas, periods, colons, parentheses, or clean bullet points.
2. **Commit Messages:** Short, conventional, human commit messages without emojis or AI boilerplate (e.g., `feat: ...`, `fix: ...`, `docs: ...`).
3. **No Shell `cd` Commands:** Antigravity runs commands directly in the specified working directory.
4. **Tone:** Grounded, authentic human student engineer voice (senior CS student at UTM / intern at Al-Ameen IT).

## Key Commands
- Dev Server: `npm run dev`
- Production Build: `npm run build`
- Preview Build: `npm run preview`

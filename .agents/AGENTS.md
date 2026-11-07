# AGENTS.md: Mohamed Makhlouf Personal Portfolio & DevSecOps Workspace
*Engineer: Mohamed Makhlouf (Omar / Mhdomar) | Cloud DevSecOps & AI Security*

---

## 👤 1. Candidate Profile & Identity Context
- **Full Name:** Mohamed Makhlouf (also known as Omar / Mhdomar).
- **Primary Role:** Cloud DevSecOps & AI Security Engineer.
- **Academic Standing:** Fourth-year (Senior) Computer Science student specializing in Networks & Security at **Universiti Teknologi Malaysia (UTM)**, Johor Bahru. Dean's List (3.43 GPA).
- **Industrial Placement:** Currently undergoing Industrial Training at the **Al-Ameen Medical Complex IT Department, Riyadh** (21/09/2026 to 05/02/2027) under IT Supervisor Ammar Mohammed Nassar.
- **Identity & Legal Status:** Egyptian citizen on Malaysian student visa, holding an active Saudi Iqama (immediate placement in Saudi Arabia with no sponsorship required). Actively scouting roles in Saudi Arabia, Malaysia, Singapore, UAE, and Global Remote.
- **Public Profiles & Contacts:**
  - Live Portfolio: https://mhdomar.pages.dev (`https://github.com/Mhdomer/personal-portfolio`)
  - Technical Blog: https://mhdomer.github.io
  - GitHub: https://github.com/Mhdomer
  - LinkedIn: https://www.linkedin.com/in/mhd3omar/
  - Primary / Work Email: `muhamedomar.g@gmail.com`
  - University Email: `omarmohamed.m@graduate.utm.my`
  - Saudi Phone: `0533741162` (`+966 53 374 1162`)
  - Malaysian Phone: `+601111383171` (`+60 11-1138 3171`)
  - YouTube Channel: "Omar Documents" (Bilingual Linux setups, cloud architectures, and systems walkthroughs).

---

## 💻 2. Operating Environment & Dual-Boot Architecture
- **Dual-Boot Workstation:** CachyOS Linux (Kernel 6.13+, Niri Wayland Compositor) and Windows 11.
- **Physical Shared Drive (D:):** High-speed NVMe NTFS partition (`/dev/nvme1n1p2`), mounted at `/mnt/data/` on Linux and `D:\` on Windows.
- **Workspace Location Rule:** Always edit files directly inside `/mnt/data/Projects/personal-portfolio` (mapped to `D:\Projects\personal-portfolio` in Windows). Ensures 100% bi-directional sync across OS boots.
- **Command Working Directory:** Antigravity runs commands directly in this folder. Never suggest or execute shell `cd` commands.

---

## 🎯 3. Project Purpose & Engineering Standards

Main personal portfolio and interactive cloud security workbench for Mohamed Makhlouf, hosted live on Cloudflare Pages at https://mhdomar.pages.dev.

Core engineering tenets:
1. **Interactive Architecture & Code Inspection:** 6-node SVG architecture traces (`Normal` vs `Attack / Drift`), annotated Terraform/Python/YAML specs with 12 trade-off pins, and 18 proof-linked skill badges.
2. **Production Cloud Architecture:** 4 live systems (SECRH 3-tier AWS PDMS, A2 EventBridge remediation, Aegis-2B Bedrock/Lambda guardrails, MindCraft Trivy CI/CD security gate).
3. **High-Craft Design Engineering:** Warm editorial paper and dark slate palettes, pixel-art katana boot cleave, circular View Transition theme wave, and GPU-light ambient sakura physics.
4. **Complete Experience & Evidence:** Grounded journey (Egypt to UTM to Al-Ameen IT), verified telemetry metrics, and 1-page ATS-compliant LaTeX resume preview (PDF + mobile WebP sheet).

---

## 🏛️ 4. Codebase Anatomy & Component Sitemap

```
personal-portfolio/
├── amplify.yml                # Optional AWS Amplify CI/CD build specification
├── index.html                 # Zero-FOUC theme script, OpenGraph card, font preloads
├── package.json               # React 19, Vite 6, Tailwind 3.4, Framer Motion, Lucide React
├── tailwind.config.js         # Editorial palette (charcoal, terracotta, amber, brand coral)
├── vite.config.js             # Vite build config with vendor chunk splitting
├── public/
│   ├── og-card.png            # 1200x630 OpenGraph preview card
│   └── assets/                # WebP diagrams, showcase MP4s, pixel katana sprites, ATS PDF
├── src/
│   ├── main.jsx               # React DOM entry point
│   ├── App.jsx                # Layout orchestrator, proof-link router, and lazy modal state
│   ├── index.css              # Editorial theme variables, paper grain, reduced-motion rules
│   └── components/
│       ├── Navbar.jsx         # Sticky header with navigation links, theme toggle, and resume CTA
│       ├── Hero.jsx           # Value proposition, credentials, snapshot tiles, photo, and CTAs
│       ├── Projects.jsx       # 4 unified production systems with video, SVG trace, and code tabs
│       ├── InteractiveArchitectureTrace.jsx # 6-node SVG Normal vs Attack/Drift topology trace
│       ├── AnnotatedCodeSpec.jsx # HCL/Python/YAML code viewer with 12 trade-off pins
│       ├── About.jsx          # Journey, systems craft, CTF/cert records, and proof highlights
│       ├── Superpowers.jsx    # 4 core engineering pillars + 18 proof-linked skill badges
│       ├── AtsResumeModal.jsx # 1-page LaTeX PDF + mobile WebP resume sheet inspector
│       ├── InteractiveTourGuide.jsx # Virtual mouse animated site tour guide
│       ├── ImageModal.jsx     # High-resolution lightbox for diagrams and screenshots
│       ├── DecorativeBranches.jsx # Parallax Japanese ink sakura decorative branch SVGs
│       ├── FallingSakuraLeaves.jsx # 14-leaf ambient CSS animation
│       ├── CursorSwordSlash.jsx # Mouse movement katana slash effect
│       ├── LinuxBootKatanaIntro.jsx # Terminal boot sequence and pixel katana cleave intro
│       ├── ThemeToggle.jsx    # Circular View Transition dark/light theme toggle
│       ├── Icons.jsx          # Clean custom SVG components for GitHub and YouTube
│       └── Footer.jsx         # Contact links, UTM email, replay intro, and Cloudflare credit
├── .agents/
│   ├── AGENTS.md              # Master workspace instruction and context router (this file)
│   └── rules/
│       ├── non_ai_slop.md     # Zero corporate filler, human commits, no em dashes
│       ├── personal_portfolio_standards.md # Core deployment, architecture, and QA invariants
│       └── ui_craft_and_design_standards.md # Precision design rules and monospace standards
├── README.md                  # Comprehensive, human-written project overview
├── CLAUDE.md                  # Dual Antigravity / Claude reference guide
└── LICENSE                    # MIT License
```

---

## 🛡️ 5. Non-Negotiable Invariants

1. **Strictly Zero Em Dashes:** NEVER use em dashes (`—`, `–`, or `--` used as an em dash). Use commas, periods, colons, parentheses, or clean bullet points instead.
2. **Natural Human Git Commits:** Mohamed Makhlouf is the sole human developer. Use short, lowercase, conventional messages (e.g. `feat: ...`, `fix: ...`, `docs: ...`). Never use AI commit boilerplate, emojis, or co-author trailers.
3. **No Shell `cd` Commands:** Antigravity runs commands directly in the specified working directory.
4. **Authentic Student Engineer Voice:** Grounded, technical, and direct. Zero corporate buzzwords, zero marketing fluff, and zero robotic enthusiasm.

---

## ⚡ 6. Specialist Skills Dispatch Table

Antigravity loads specialized instructions from `.agents/skills/`:

| Command / Topic | Dedicated Skill | Specialized Scope & Instructions |
| :--- | :--- | :--- |
| **UI Design & Aesthetic Taste** | `taste` (`/taste`) | High-craft design decisions from 247 studied sites, type systems, automated browser visual critique, zero generic model defaults. |
| **Interactive Architecture Maps** | `archify` (`/archify`) | Standalone interactive architecture diagrams, explainer boards, and flow maps with SVG/PNG/WebM export. |
| **Portfolio UI Component Craft** | `portfolio-ui-craft` | Component modification recipes, Sakura physics tuning, and Tailwind glassmorphism tokens. |
| **AWS Amplify Hosting (Optional)** | `aws-amplify-deploy` | Optional `amplify.yml` CI/CD fallback specification (primary production site deploys via Cloudflare Pages at `https://mhdomar.pages.dev`). |

---

## 🚀 7. Routine Commands & Workflows

```bash
# Start local development server
npm run dev

# Run production build and verify bundle sizes
npm run build

# Preview production build locally
npm run preview

# Verify git status cleanly
git status -s
```

# AGENTS.md: Tech Superpower Portfolio & AWS Challenge Workspace
*Candidate: Mohamed Makhlouf (Omar / Mhdomar) | AWS Student Builder Challenge 2026*

---

## 👤 1. Candidate Profile & Identity Context
- **Full Name:** Mohamed Makhlouf (also known as Omar / Mhdomar).
- **Primary Role:** Cloud DevSecOps & AI Security Engineer.
- **Academic Standing:** Fourth-year (Senior) Computer Science student specializing in Networks & Security at **Universiti Teknologi Malaysia (UTM)**, Johor Bahru. Dean's List (3.43 GPA).
- **Industrial Placement:** Currently undergoing Industrial Training at the **Al-Ameen Medical Complex IT Department, Riyadh** (21/09/2026 to 05/02/2027) under IT Supervisor Ammar Mohammed Nassar.
- **Identity & Legal Status:** Egyptian citizen on Malaysian student visa, holding an active Saudi Iqama (immediate placement in Saudi Arabia with no sponsorship required). Actively scouting roles in Saudi Arabia, Malaysia, Singapore, UAE, and Global Remote.
- **Public Profiles & Contacts:**
  - GitHub: https://github.com/Mhdomer
  - Primary / Work Email: `muhamedomar.g@gmail.com`
  - University Email: `omarmohamed.m@graduate.utm.my`
  - Saudi Phone: `0533741162` (`+966 53 374 1162`)
  - Malaysian Phone: `+601111383171` (`+60 11-1138 3171`)
  - YouTube Channel: "Omar Documents" (Bilingual Linux setups, cloud architectures, and systems walkthroughs).

---

## 💻 2. Operating Environment & Dual-Boot Architecture
- **Dual-Boot Workstation:** CachyOS Linux (Kernel 6.13+, Niri Wayland Compositor) and Windows 11.
- **Physical Shared Drive (D:):** High-speed NVMe NTFS partition (`/dev/nvme1n1p2`), mounted at `/mnt/data/` on Linux and `D:\` on Windows.
- **Workspace Location Rule:** Always edit files directly inside `/mnt/data/Projects/tech-superpower-portfolio` (mapped to `D:\Projects\tech-superpower-portfolio` in Windows). Ensures 100% bi-directional sync across OS boots.
- **Command Working Directory:** Antigravity runs commands directly in this folder. Never suggest or execute shell `cd` commands.

---

## 🎯 3. Project Purpose & Hackathon Rubric Gates

Built specifically for the **AWS Student Builder Challenge: Build Your Tech Superpower** (October 27 – November 6, 2026).

Submissions are scored on a strict 4-tier rubric:
1. **Creativity & Memorability (30%):** The **Superpower Engine (V4 Console)** with 4 interactive cylinders + a visible hint button (`[ Superpower Engine (Hint!) ]`) in the navbar.
2. **Working AWS Implementation (25%):** Deployed live on AWS Amplify Hosting + Amazon CloudFront + Amazon S3 via `amplify.yml`.
3. **Communication Quality (25%):** Plain-spoken, human documentation, architecture flowcharts, and genuine learnings.
4. **Portfolio Completeness & Usability (20%):** Full 3 sections (About Me, Skills/Superpowers, Projects/Achievements) with mobile and desktop responsiveness.

---

## 🏛️ 4. Codebase Anatomy & Component Sitemap

```
tech-superpower-portfolio/
├── amplify.yml                # AWS Amplify CI/CD build specification
├── index.html                 # Font preloads (JetBrains Mono & Plus Jakarta Sans)
├── package.json               # React 19, Vite 6, Tailwind 3.4, Lucide React, Canvas-Confetti
├── tailwind.config.js         # Charcoal (#0b0f17), Sakura (#f472b6), and Engine (#38bdf8) palette
├── vite.config.js             # Vite build config with dist output
├── src/
│   ├── main.jsx               # React DOM entry point
│   ├── App.jsx                # Layout orchestrator and global state (modal & sakura toggles)
│   ├── index.css              # Custom scrollbars, glassmorphism panel styles
│   └── components/
│       ├── Navbar.jsx         # Sticky header with the required Visible Hint button and Sakura toggle
│       ├── Hero.jsx           # Value proposition, credentials, live status badge, and CTAs
│       ├── About.jsx          # Section 1: Journey, engine precision philosophy, green tech, peer tutoring
│       ├── Superpowers.jsx    # Section 2: 4 core superpower cards with verified telemetry metrics
│       ├── Projects.jsx       # Section 3: Filterable project showcase (Aegis-2B, A2, MindCraft, SECRH)
│       ├── CreativeEngineModal.jsx  # The 4-Cylinder interactive engine dashboard (The 30% feature)
│       ├── SakuraCanvas.jsx   # 60fps falling sakura petals background with gentle physics
│       ├── Icons.jsx          # Clean custom SVG components for GitHub and YouTube
│       └── Footer.jsx         # Contact links, UTM email, social handles, and AWS Amplify credit
├── .agents/
│   ├── AGENTS.md              # Master workspace instruction and context router (this file)
│   ├── rules/
│   │   ├── non_ai_slop.md     # Zero corporate filler, human commits, no em dashes
│   │   ├── ui_craft_and_design_standards.md  # Precision design rules and monospace standards
│   │   └── hackathon_rubric_invariants.md    # 4 rubric scoring gates and non-negotiables
│   └── skills/
│       ├── taste/SKILL.md                    # Curated design directions, typography, browser juror
│       ├── archify/SKILL.md                  # Interactive architecture and system flow maps
│       ├── portfolio-ui-craft/SKILL.md       # UI implementation guide and component craft
│       ├── aws-amplify-deploy/SKILL.md       # AWS Amplify CI/CD hosting deployment guide
│       └── hackathon-submission/SKILL.md     # Builder Center project write-up template
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
5. **Preserve The Visible Hint:** The `[ Superpower Engine ]` button with its hint badge must remain clearly discoverable in the navigation bar.

---

## ⚡ 6. Specialist Skills Dispatch Table

Antigravity loads specialized instructions from `.agents/skills/`:

| Command / Topic | Dedicated Skill | Specialized Scope & Instructions |
| :--- | :--- | :--- |
| **UI Design & Aesthetic Taste** | `taste` (`/taste`) | High-craft design decisions from 247 studied sites, type systems, automated browser visual critique, zero generic model defaults. |
| **Interactive Architecture Maps** | `archify` (`/archify`) | Standalone interactive architecture diagrams, explainer boards, and flow maps with SVG/PNG/WebM export. |
| **Portfolio UI Component Craft** | `portfolio-ui-craft` | Component modification recipes, Sakura physics tuning, Engine modal cylinders, and Tailwind glassmorphism tokens. |
| **AWS Amplify Hosting** | `aws-amplify-deploy` | `amplify.yml` CI/CD build specification, GitHub integration, CloudFront edge caching, and Free Tier safeguards. |
| **Hackathon Submission** | `hackathon-submission` | AWS Builder Center project entry template, screenshot checklist, and rubric score alignment. |

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

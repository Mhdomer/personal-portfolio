# Mohamed Makhlouf (Mhdomar) | Personal Portfolio & Cloud Security Workbench

Personal portfolio and interactive AWS cloud security workbench of **Mohamed Makhlouf (Omar / Mhdomar)**, Cloud Security & DevSecOps Engineer and final-year Computer Science (Networks & Security) student at Universiti Teknologi Malaysia (UTM), currently running clinic IT infrastructure operations at Al-Ameen Medical Complex in Riyadh.

- **Live Portfolio:** [https://mhdomar.pages.dev](https://mhdomar.pages.dev)
- **Technical Blog:** [https://mhdomer.github.io](https://mhdomer.github.io)
- **GitHub:** [https://github.com/Mhdomer](https://github.com/Mhdomer)

---

## 1. What Is Inside This Workbench

Instead of static project screenshots, every featured system on the site includes interactive architecture inspection, real production code specs, and deep-linked skill verification:

1. **Interactive 6-Node SVG Architecture Traces (`InteractiveArchitectureTrace.jsx`):**
   - Switch any of the 4 systems between **Normal Flow** and **Attack / Drift Flow** to inspect live packet paths, security controls, and failure isolation boundaries:
     - **SECRH Secure Cloud PDMS:** 3-tier AWS healthcare architecture (`110` Terraform resources, `0` drift, WAF + ALB + private ECS/EC2 + Multi-AZ RDS PostgreSQL with Row-Level Security and KMS CMK).
     - **A2 Autonomous Compliance & Remediation Engine:** CloudTrail -> EventBridge -> Python 3.12 Lambda remediation (`< 2.4s` p99 response, `325` pytest + `25` Terraform tests, AST-verified read-only MCP audit server).
     - **Aegis-2B AI Safety Circuit Breaker:** Sub-`115ms` p99 dual-tier prompt-injection and tool-call guardrail pairing local quantized SLM verification with Amazon Bedrock (`16.1x` faster than cloud LLM roundtrips).
     - **MindCraft AWS Migration & DevSecOps Gate:** Self-managed 3-tier AWS deployment (`47` Terraform resources) gated by GitHub Actions OIDC, Trivy Critical/High CVE blocking (`exit code 1`), and zero-SSH SSM deployments.
2. **Syntax-Highlighted Code Specs With Trade-Off Pins (`AnnotatedCodeSpec.jsx`):**
   - Real Terraform HCL, Python Boto3, and GitHub Actions YAML excerpts with `12` interactive architecture pins explaining the engineering trade-offs behind KMS key policies, botocore adaptive retries, circuit-breaker timeouts, and non-root container builds.
3. **Proof-Linked Technical Arsenal (`Superpowers.jsx`):**
   - All `18` skill badges in the Technical Arsenal act as deep links: clicking a skill (such as `Terraform (HCL)`, `AWS EventBridge`, `Trivy`, or `AWS Systems Manager (SSM)`) scrolls directly to the system workbench or achievement record where that tool runs in production and highlights the exact node or code line.
4. **Editorial Craft & Cross-Device Engineering:**
   - Two-piece pixel-art katana boot cleave (`LinuxBootKatanaIntro.jsx`) with `sessionStorage` repeat-visit bypass and a footer `Replay Intro` trigger.
   - Circular View Transition API dark/light theme wave (`ThemeToggle.jsx`) paired with a pre-paint `<head>` script for zero flash of unstyled theme.
   - Lazy-loaded 1-page LaTeX ATS resume modal (`AtsResumeModal.jsx`) that renders native PDF on desktop and automatically switches to a sharp, pinch-zoomable `.webp` sheet on mobile and LinkedIn/Slack in-app browsers.
   - `IntersectionObserver` video playback (`ViewportVideo`), ES2018 Safari-safe code tokenization, `prefers-reduced-motion` compliance, and a pre-baked `96x96` tileable paper grain texture for smooth scrolling on integrated laptop GPUs.

---

## 2. Hosting & Deployment Architecture

```text
[ Visitor Browser ]
        │
        ▼  (HTTPS / HTTP/2 & HTTP/3 QUIC)
[ Cloudflare Global Edge Network (mhdomar.pages.dev) ]
        │
        ├─► [ Static SPA Assets (dist/) ] (WebP imagery, code-split modal chunks, PDF resume)
        └─► [ GitHub CI/CD Integration ]  (Auto-builds main on every git push via npm run build)
```

- **Primary Production Host:** **Cloudflare Pages** ([https://mhdomar.pages.dev](https://mhdomar.pages.dev)) connected directly to `Mhdomer/personal-portfolio` (`main` branch).
- **AWS Amplify Compatibility:** Root [`amplify.yml`](amplify.yml) is retained for one-click deployment on AWS Amplify Hosting + CloudFront if needed.

---

## 3. Tech Stack

- **Frontend:** React 19, Vite 6, Tailwind CSS 3.4
- **Motion & Transitions:** Framer Motion 14, native View Transitions API, CSS keyframe physics
- **Icons & Graphics:** Lucide React, custom inline SVGs, WebP architecture diagrams
- **Hosting:** Cloudflare Pages Edge CDN (`mhdomar.pages.dev`)

---

## 4. Local Development

Prerequisites: Node.js 20+ and npm.

```bash
# 1. Clone repository
git clone https://github.com/Mhdomer/personal-portfolio.git

# 2. Install dependencies
npm install

# 3. Start local Vite dev server (http://localhost:5173)
npm run dev

# 4. Build production static bundle into dist/
npm run build

# 5. Preview production bundle locally
npm run preview
```

---

## 5. Repository Structure

```text
personal-portfolio/
├── amplify.yml                       # Optional AWS Amplify CI/CD build specification
├── index.html                        # Zero-FOUC theme init, OpenGraph/Twitter cards, font preloads
├── package.json                      # React 19, Vite 6, Tailwind 3.4, Framer Motion, Lucide React
├── postcss.config.js                 # PostCSS configuration
├── tailwind.config.js                # Warm editorial paper, charcoal, and terracotta tokens
├── vite.config.js                    # Vendor chunk splitting (react, motion, icons)
├── public/
│   ├── og-card.png                   # 1200x630 OpenGraph social preview card
│   └── assets/                       # WebP diagrams, showcase MP4s, pixel katana sprites, ATS PDF
├── src/
│   ├── main.jsx                      # React DOM entry point
│   ├── App.jsx                       # Global layout, lazy modals, proof-link router, boot state
│   ├── index.css                     # Editorial theme variables, paper grain, reduced-motion rules
│   └── components/
│       ├── Navbar.jsx                # Sticky header, mobile drawer, tour trigger, resume modal CTA
│       ├── Hero.jsx                  # Credentials, recruiter snapshot tiles, portrait, primary CTAs
│       ├── Projects.jsx              # 4-system workbench (Video Preview, Architecture Trace, Code Spec)
│       ├── InteractiveArchitectureTrace.jsx # Interactive 6-node SVG Normal vs Attack/Drift diagrams
│       ├── AnnotatedCodeSpec.jsx     # Theme-aware HCL/Python/YAML viewer with 12 trade-off pins
│       ├── About.jsx                 # Dual-region journey, Al-Ameen IT ops, CTF & cert achievements
│       ├── Superpowers.jsx           # 4 core engineering pillars + 18 proof-linked skill pills
│       ├── AtsResumeModal.jsx        # 1-page LaTeX PDF + mobile WebP resume sheet inspector
│       ├── ImageModal.jsx            # High-resolution diagram lightbox with ESC & scroll lock
│       ├── InteractiveTourGuide.jsx  # Guided virtual-cursor walkthrough of key portfolio sections
│       ├── LinuxBootKatanaIntro.jsx  # Terminal boot sequence and two-piece pixel katana cleave
│       ├── ThemeToggle.jsx           # Circular View Transition dark/light mode toggle
│       ├── DecorativeBranches.jsx    # Parallax Japanese ink sakura branch SVGs
│       ├── FallingSakuraLeaves.jsx   # Ambient CSS falling sakura petals
│       ├── CursorSwordSlash.jsx      # Subtle mouse-velocity slash trail
│       ├── Icons.jsx                 # Custom GitHub and YouTube SVG icons
│       └── Footer.jsx                # Contact details, replay intro trigger, and repo links
└── LICENSE                           # MIT License
```

---

## 6. License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

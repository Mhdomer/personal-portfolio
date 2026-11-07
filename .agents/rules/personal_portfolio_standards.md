---
trigger: always_on
description: Core portfolio quality standards and non-negotiable invariants for Mohamed Makhlouf's personal portfolio.
---

# Personal Portfolio Engineering Standards

Every modification made to this repository must preserve the engineering craft, performance, and authenticity of Mohamed Makhlouf's personal portfolio. Adhere to these four pillars:

---

## 1. Verified Architecture & Systems Craft
- **Production Cloud Architectures:** Interactive inspection of real cloud systems (Aegis-2B Bedrock/Lambda guardrails, A2 EventBridge remediation, Trivy CI/CD security gate, Al-Ameen Healthcare network topology) with clickable high-res diagrams and copyable code specs.
- **Interactivity & Tactile Feedback:** All interactive elements (virtual cursor tour, theme toggle, katana slash, screenshot lightboxes) must be responsive, keyboard accessible (ESC to close), and performant.
- **Zero AI Gimmicks:** Every metric, diagram, and code spec is grounded in real benchmarks and production implementations.

---

## 2. Production Static Deployment
- **Deployment Platform:** Cloudflare Pages (`https://mhdomar.pages.dev`) auto-building `main` from GitHub (`Mhdomer/personal-portfolio`), with root `amplify.yml` preserved for optional AWS Amplify compatibility.
- **Static Artifacts:** Build output must stay within `dist/` and remain 100% static client-side single page application (SPA). Never introduce Express/Node server runtime dependencies inside `src/`.
- **Edge Caching:** Assets must be compatible with Cloudflare global edge caching (`HTTP/2` + `HTTP/3`) and root-relative `/assets/*` paths.
- **Availability:** Ensure the production build has zero build warnings, missing imports, Safari `< 16.4` regex lookbehind crashes, or runtime errors.

---

## 3. Communication Quality & Authentic Tone
- **Human Voice:** Communication must be written in an authentic, student engineer voice (senior CS student at UTM specializing in networks & security, currently running clinic IT operations at Al-Ameen Medical Complex in Riyadh).
- **Strictly Zero Em Dashes:** Never use em dashes (`—`, `–`, or `--` used as an em dash). Use commas, periods, colons, parentheses, or clean bullet points instead.
- **Grounded Technical Depth:** State benchmarks, Linux flags, and architectural patterns directly without corporate filler.

---

## 4. Completeness & Usability
- The site retains its core sections:
  1. **About Me:** The dual-region journey (Egypt to UTM to Al-Ameen IT), systems philosophy, and peer mentoring.
  2. **Skills & Superpowers:** Cloud DevSecOps, AI Security Guardrails, and Linux systems engineering.
  3. **Cloud Architecture:** Production architectures (Aegis-2B Bedrock/Lambda guardrails, A2 EventBridge remediation, Trivy CI/CD security gate, Al-Ameen Healthcare multi-site topology).
  4. **Projects & Achievements:** Aegis-2B, A2 Remediation Engine, MindCraft, SECRH healthcare IT, ASEAN Cyber Race CTF, and YouTube tutorials.
  5. **Engineering Culture & Homelab:** DevSecOps reality snapshots and workstation setups.
- Desktop and mobile layouts must render cleanly without clipping or text overlap.

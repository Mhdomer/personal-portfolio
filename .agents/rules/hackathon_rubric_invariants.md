---
trigger: always_on
description: Core judging rubric criteria and non-negotiable invariants for the AWS Student Builder Challenge.
---

# AWS Student Builder Challenge: Rubric Invariants

Every modification made to this repository must align with the official hackathon scoring gates. Do not introduce changes that violate any of these four criteria:

---

## 1. Creativity and Memorability (30% Weight)
- **The Creative Feature:** The **Superpower Engine (V4 Console)** is the primary creative feature. It reflects Mohamed's passion for mechanical engines, AI security, green cloud compute, and peer mentorship.
- **The Visible Hint:** A visible hint button (`[ Superpower Engine (Hint!) ]`) MUST remain prominently featured in the top navigation bar and hero section. Visitors must be able to discover the creative feature naturally.
- **Interactivity:** The feature must actually function. It provides real-time latency simulation (Cylinder 1), live slider calculations (Cylinder 2), interactive quiz logic (Cylinder 3), and rev gauge audio/confetti feedback (Cylinder 4).

---

## 2. Working AWS Implementation (25% Weight)
- **Deployment Platform:** AWS Amplify Hosting via root `amplify.yml`.
- **Static Artifacts:** Build output must stay within `dist/` and remain 100% static client-side single page application (SPA). Never introduce Express/Node server runtime dependencies inside `src/`.
- **Edge Caching:** Assets must be compatible with Amazon CloudFront distribution and S3 storage headers.
- **Availability:** Ensure the production build has zero build warnings, missing imports, or runtime crashes so the live site remains 100% accessible throughout the judging window.

---

## 3. Communication Quality (25% Weight)
- **Documentation:** `README.md` must clearly document all AWS services used, how to run locally, architecture flow, and the creative feature.
- **Human Voice:** Communication must be written in an authentic, student engineer voice. No vague marketing fluff.
- **AWS Services Documented:** AWS Amplify Hosting, Amazon CloudFront, Amazon S3, AWS Lambda (contextual), Amazon Bedrock (contextual).

---

## 4. Portfolio Completeness & Usability (20% Weight)
- The site MUST retain its three core sections:
  1. **About Me:** The dual-region journey (Egypt to UTM to Al-Ameen IT), engine philosophy, green cloud values, and peer mentoring.
  2. **Skills or Tech Superpowers:** Cloud DevSecOps, AI Security Guardrails, Green FinOps, Linux systems.
  3. **Projects or Achievements:** Aegis-2B, A2 Remediation Engine, MindCraft, SECRH healthcare IT, and YouTube tutorial hub.
- The creative feature must open as a modal without disrupting page scrolling or navigation when closed.
- Desktop and mobile layouts must render cleanly without clipping or text overlap.

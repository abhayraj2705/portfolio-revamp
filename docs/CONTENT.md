# Content: Abhayraj B portfolio

The single source of truth for every word on the site. Components should read from `src/data/*.ts`, generated from this file. They should not hardcode copy.

> **Source status**
> - ✅ = taken from the current site, which you already published.
> - 🐙 = taken from your public GitHub (`api.github.com/users/abhayraj2705`, pulled 2026-10-17).
> - ⚠️ = **needs confirmation from your LinkedIn.** LinkedIn blocks automated access (HTTP 999 authwall), so I could not read the profile. Copy the matching LinkedIn sections into the `⚠️` blocks below. Paste Experience, Education, Certifications, Honors, Volunteering and the About text.

---

## 1. Identity

| Field | Value | Src |
|---|---|---|
| Name | Abhayraj B | ✅ |
| Domain | https://abhayrajb.in (from résumé; used for canonical URLs, sitemap, OG) | ✅ |
| Name (Devanagari) | अभयराज | ✅ |
| Role line | Full-stack engineer · AI systems | ✅ (derived) |
| Location | Pune, India · पुणे · IST (GMT+5:30) | ✅ |
| Status | Open to opportunities (internships / SDE roles, 2026–27) | ✅ / ⚠️ confirm target |
| Email | `abhayraj27052005@gmail.com` | ✅ confirmed |
| GitHub | https://github.com/abhayraj2705 | ✅ |
| LinkedIn | https://www.linkedin.com/in/abhayraj-b-474890293/ | ✅ |
| Phone | **Remove from the public site.** The current footer shows it. Scrapers harvest it and recruiters will email anyway. | — |
| Résumé | `public/resume.pdf` (from `AbhayrajB.pdf`). Linked from the nav, hero, ⌘K palette, mobile menu and Contact. Downloads as `Abhayraj-B-Resume.pdf`. The résumé is the source of truth for project facts. | ✅ |
| Portrait | `public/me/portrait.webp` (full, 960px) · `public/me/portrait-pixel-48.png` (pixelated) · `portrait-pixel-32.png` (chunkier option) · `portrait.png` is the 2 MB original, source only, never referenced | ✅ |

### Headline copy

- **Kicker:** `FULL-STACK ENGINEER · AI SYSTEMS · PUNE, IN`
- **H1:** I build *products* people actually use.
  - Rotating italic word: `products` → `AI tools` → `payment flows` → `platforms` → `anything.`
- **Sub:** CS undergrad at MIT ADT University. I ship full-stack products, from GenAI app builders to payment platforms, with React, Next.js, Node and MongoDB.
- **CTAs:** `See selected work ↘` · `Start a conversation ↗`

### Stats strip (Stefano-style `[01]` labels)

| Label | Value | Src |
|---|---|---|
| Internship | Full Stack Intern @ HackoSquad | ✅ |
| Production apps shipped | 4+ | ✅ |
| REST endpoints designed | 10+ (per project; 25+ total across IDEA + Uniconnect) | ✅ |
| Fewer invalid AI outputs | ~40% | ✅ |
| CGPA | 8.96 | ✅ |
| Public repos | 36 | 🐙 |

---

## 2. About

**Section title:** The person behind the commits.

**Statement:** This is the large scroll-revealed paragraph.
> I'm a computer science undergrad in Pune who likes the unglamorous parts of building: auth flows, payment webhooks, retry pipelines. Those parts make an idea actually work. Lately I've been wiring models like GPT-4o and Claude into real products and finding out where they break.

**Three things I believe** (Jackie-style list):
1. Ship it, then make it beautiful. Then ship it again.
2. The boring backend is the product.
3. AI is a component, not a feature. Validate everything it hands you.

**What I'm looking for:** Teams that ship weekly · Hard backend / AI-infra problems · People who review code kindly.

> ⚠️ Replace or extend with your LinkedIn **About** section.

---

## 3. Capabilities ("How I work")

Three tabs, each with a skill list:

| Tab | Skills |
|---|---|
| **Product engineering** | React 19, Next.js, TypeScript, Tailwind, Framer Motion / GSAP, responsive & accessible UI |
| **AI integration** | GPT-4o, Claude, Gemini, Hugging Face; prompt pipelines, output validation & retry loops, Sandpack live previews |
| **Backend & infra** | Node.js, Express, FastAPI, MongoDB, REST design, JWT / NextAuth / RBAC, Razorpay + webhooks, Vercel / Render, Git, basic DevOps |

**Process (3 steps):** `01 Understand the problem` → `02 Model the data & flows` → `03 Ship, measure, iterate`

**Also exploring:** cybersecurity (HackoSquad, Bug-Bounters hackathon, AI scam detection) 🐙

---

## 4. Selected work

**Featured (4):** large index rows with hover previews, each with a case-study page at `/work/[slug]`.

### 01 · IDEA: AI app builder · 2026 · Beta, in active development ✅
- **One-liner:** Describe the app. Get the whole codebase.
- **Story:** IDEA plans a project, generates it file by file, then compiles, validates and heals what it finds before you see it. The output isn't a demo. It's a full-stack repository you can clone. Automated validate-and-retry pipelines cut invalid outputs by ~40%.
- **Product details (from the live site):** a prompt box with Templates / Stacks / Database pickers · bring your own provider key or use the built-in one · export or clone the repo at any time · free during beta
- **Stack:** Next.js, Node.js, GPT-4o, Claude, Sandpack
- **Highlights:** plan → generate → compile → self-heal pipeline · 10+ API endpoints · JWT auth · live preview
- **Link:** https://ideabuilders.live/
- **Media:** `public/work/idea-hero.webp` (landing-page screenshot). ⚠️ For the case study, add a 10s screen recording of a generation run (prompt → files streaming → preview).
- **Hover line:** "the one I'm most proud of."

### 02 · HackoSquad: cybersecurity learning platform · Internship · 2026 ✅
- **One-liner:** Labs, challenges and learning paths for security learners, without the noise of scattered resources.
- **Stack:** React, Node.js, Express, MongoDB, JWT
- **Highlights:** Role-based access · lab modules · progress tracking
- **Link:** https://www.hackosquad.com
- **Media:** `public/work/hackosquad-hero.webp` (landing page: "Learn Cybersecurity with Hands-On Training")
- **Hover line:** "security made simple."

### 03 · Edisip: e-commerce for edible cups & cutlery · 2025 ✅
- **One-liner:** An online store for VMAC's edible cups and cutlery ("Edisip, made to munch"), from listing to checkout with cart, order tracking and payments.
- **Stack:** Next.js, Node.js, Express, MongoDB, Razorpay
- **Highlights:** Cart & checkout · order management · payment gateway
- **Link:** https://www.edisip.com
- **Media:** `public/work/edisip-hero.webp`
- **Hover line:** "real payments, real users."

### 04 · Uniconnect: university event platform · 2025 ✅
- **One-liner:** End-to-end event management for campus clubs.
- **Stack:** React, Node.js, Express, MongoDB
- **Highlights:** 15+ endpoints · user → admin → super-admin RBAC · CSV exports
- **Link:** https://uniconnect-qs2s.onrender.com/
- **Media:** `public/work/uniconnect-hero.webp` (featured clubs: AWS Cloud, GDSC, Cinemaniacs…)
- **Hover line:** "built for my campus."

### More work (compact list under the featured four)
A three-column mono list: `name · one-liner · stack · year ↗`. Each row has a hover line but no case-study page.

| Project | What | Stack | Year | Link | Hover line |
|---|---|---|---|---|---|
| GetMeAChai | Buy-me-a-coffee for developers, with Razorpay webhooks and NextAuth OAuth | Next.js, MongoDB, Razorpay, NextAuth | 2024 | https://github.com/abhayraj2705/GetmeAchai | "where I learned payments." |
| SmartKeep | Google Keep clone with voice input, Hugging Face auto-categorisation and summaries | React, Hugging Face | 2025 | https://google-keep-clone-sepia.vercel.app | "notes that sort themselves." |
| File Manager | One-stop file management app | MERN | 2025 | https://filemanager-frontend-he7r.onrender.com/ | "everything in its place." |

Then `All repos on GitHub ↗`. Not shown: NutriAuto, Interview Prep, Videogen, hackathon repos.

### Case-study template (`/work/[slug]`)
`Hero (title, year, role, stack, links)` → `The problem` → `What I built` (2–3 annotated screenshots / a 10s loop video) → `Hard part` (one technical deep-dive, e.g. the retry pipeline) → `Outcome` (numbers) → `Next project ↘`

---

## 5. Experience

### Full Stack Developer Intern · HackoSquad · Mar 2026 – Aug 2026 ✅ (LinkedIn, via you)
- Shipped 8 production full-stack features (React, Node, Express, MongoDB, REST) across 3 delivery milestones.
- Found and fixed 15 bugs through structured testing and root-cause analysis, improving app stability.
- Link: https://www.hackosquad.com
- In Selected work, HackoSquad is the featured *internship* case study (`Internship · 2026`).

### Technical Team Member · ACES Club, MIT ADT University · Jan 2025 – Present ✅
- Built internal tools and websites with a 5-person team, used by 200+ students.
- Shipped technical solutions for 3+ university events, improving the registration flow and engagement.
- Built the ACES syntax-debugging game for a club event. 🐙 ⚠️ confirm

> ⚠️ **Paste any LinkedIn roles here** (internships, freelance work such as the GEC WordPress child theme 🐙, hackathons). Format: `Role · Org · Start – End · 2 bullets with a number in each`.

## 6. Education ✅

**MIT ADT University, Pune.** B.Tech, Computer Science & Engineering · 2023 – 2027 · CGPA 8.96
- Hover lines: "where the foundation was laid." / "LeetCode at 2am, lectures at 9am."

> ⚠️ Add schooling, honors and hackathon placements from LinkedIn.

## 6b. Certifications (LinkedIn shows 9; 2 received so far)

| Certification | Issuer | Issued | Credential |
|---|---|---|---|
| AWS Academy Graduate: Cloud Foundations (Training Badge) | Amazon Web Services | Oct 2025 | ⚠️ add the credential URL |
| Cyber Job Simulation (Deloitte Australia) | Forage | Jul 2025 | ID `zy2ci5i42tPPzPQEN` ⚠️ add the URL |
| ⚠️ 7 more: paste "Show all 9 licenses" | | | |

**Display:** compact mono list inside the Experience/Education section (`CERT · ISSUER · MM/YY ↗`), with no logos. Show the strongest 4–5 and put the rest behind a "+N more" toggle. These certifications back the *Backend & infra* (AWS) and *cybersecurity* threads in How I work.

## 7. Timeline ("Still becoming")

| When | Beat |
|---|---|
| 2023 | Started B.Tech CSE at MIT ADT. First C++ and JS repos. |
| 2024 | First full-stack product with real payments (GetMeAChai). |
| 2025 | Joined ACES. Shipped Uniconnect and Edisip. AWS Cloud Foundations + Deloitte Cyber simulation. |
| 2026 | Full Stack Developer Intern at HackoSquad (Mar–Aug). Built IDEA, a GenAI app builder. |
| Next | ⚠️ e.g. "SDE internship → graduate 2027." |

---

## 8. Contact

- **Headline:** Something good starts with a hello.
- **Body:** Building something interesting? I reply within a day.
- **Primary:** email (click copies to clipboard and shows a "copied ✓" toast; a modifier-click opens mail)
- **Secondary:** LinkedIn · GitHub · Résumé
- **Footer:** `© 2026 Abhayraj B` · `Built with intent in Pune` · live IST clock · `Back to top ↑`

## 9. SEO / meta

- `title`: Abhayraj B: Full-stack engineer, Pune
- `description`: Full-stack & AI engineer in Pune building production apps with React, Next.js, Node and LLMs.
- OG image: dynamic (`next/og`), with name, role and accent bar.
- JSON-LD: `Person` (name, jobTitle, alumniOf, sameAs: GitHub, LinkedIn).

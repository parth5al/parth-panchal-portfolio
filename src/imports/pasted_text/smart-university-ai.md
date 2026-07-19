# FIGMA MAKE — All Case Study Pages (Full Storytelling Content)

Use the case-study template from `figma-make-case-study-prompt.md` — same layout, same sidebar with Work lit red, same chapter nav, same card/panel patterns. For each project below, generate a **desktop frame (1440 or 1920)** and a **mobile frame (390)**. Everything is written out — paste and generate, one project at a time.

---

# CASE STUDY 01 — SUNOH.AI
*Already fully specified in figma-make-case-study-prompt.md. Skip this one here — use that file directly.*

---

# CASE STUDY 02 — SMART UNIVERSITY AI

## Hero
- Eyebrow: `CASE STUDY · 03/08`
- Title: `SMART UNIVERSITY AI`
- One-liner: "Turning a static course catalog into something you can just ask."
- Meta strip: `ROLE` Senior Designer — led 2 designers · `SCOPE` Conversational assistant in the portal · `TEAM` Usability, Business Analysts, Engineering · `FOCUS` Conversational UX, search & personalization
- Hero image placeholder

## Context
eCW University is eClinicalWorks' learning portal — a vast, growing library of modules and documentation where practices learn to use a large, robust EHR. It's where new users spend their first weeks and where experienced ones return whenever a feature changes. Smart University AI is the intelligence layer we built on top: instead of browsing the library, you ask it.

## The challenge
Great content, hard to find. To learn a feature, clinicians had to keyword-search and browse manually through a giant static catalog — slow, frustrating, and easy to give up on. The portal was built as a course library, not an interactive assistant; there was no conversational search, no contextual surfacing, and no personalization.

**At a glance:**
- `WHO` Clinicians and healthcare staff learning the EHR — plus training, product, and UX teams
- `GOAL` Quick, intuitive access to the right content, personalized courses, and timely feature updates
- `BLOCKER` Manual keyword search and extensive browsing; content abundant but never contextually surfaced
- `ROOT CAUSE` The portal was built as a static catalog, not an interactive learning assistant

**The bet:** If we could make the entire library feel like something you can simply ask — and get a trustworthy, cited answer back — clinicians would learn faster and come back more often.

## The journey

**Exploration: voice was the vision.**

Two cards:

Card 1 — `VOICE-FIRST · THE NORTH STAR` (grey, `EXPLORED · ON THE ROADMAP`): "The original vision — defined with our business analysts, the product team (I led design), and engineering — was voice-first. Users would simply speak, and the assistant would understand, answer aloud, and search across the entire EHR ecosystem. We prototyped both voice and chat interactions in Figma. The model was smart enough, and the experience was compelling."

Card 2 — `CHAT-ONLY MVP` (red-bordered, `SHIPPED`): "With the national conference deadline closing in, we couldn't ship voice in time. So I scoped to a disciplined chat-only MVP — the highest-value slice. Text in, best answer out: the assistant finds the content, summarizes it, and presents it with cited sources. We also shipped a dark theme for the launch, since new users spend hours in the portal and needed something easier on the eyes."

**`THE CALL:`** "I chose to scope the full voice vision down to a chat-first MVP — shipping the highest-value slice on time for the national conference rather than the complete vision late. It was a bet that getting it into hands quickly would validate the concept and earn the runway to build voice next. It did. Voice is now on the roadmap, funded by the adoption the chat MVP drove."

## Highlights
Four image placeholders with captions:
- *The conversational panel — ask in plain language, inside the portal*
- *Cited answers — every response backed by its source*
- *Curated courses — personalized, generated on request*
- *Dark theme — easier on the eyes for hours of learning*

## Outcome
- **4,891** Users — 75% external, 25% internal
- **16,763** Chats initiated
- **31,620** Questions answered
- **2,267** Client practices in the first two weeks

**Reflection:** "Meeting users inside a tool they already knew — instead of sending them somewhere new — drove adoption fast. A disciplined chat-first MVP, shipped on time for the national conference, got it into hands quickly: thousands of clinicians in the first two weeks, with strongly positive feedback (57 likes to 10 dislikes). That validated the bet enough to now build toward the original voice vision."

## Next case
`NEXT →` **eClinicalMobile** — "A 2011 app, rebuilt for how care actually moves."

---

# CASE STUDY 03 — ECLINICALMOBILE

## Hero
- Eyebrow: `CASE STUDY · 04/08`
- Title: `ECLINICALMOBILE`
- One-liner: "Rebuilding a legacy clinical mobile app around real workflows — and one consistent design system."
- Meta strip: `ROLE` Senior Designer — led 2 designers · `SCOPE` Legacy mobile app redesign · `TEAM` Design, Product, Engineering, BA · `FOCUS` Workflow UX, consistency, design system
- Hero image placeholder

## Context
eClinicalMobile is the EHR's mobile companion — built around 2011, when smartphones first reached the clinic, and barely updated since. It supports providers during active patient care: rounds between rooms, quick patient checks, urgent updates. Sessions are short. Clarity is everything. But the interface stayed frozen in time — legacy patterns, weak hierarchy, and Android and iOS experiences that don't even match each other.

## The challenge
Years of incremental, feature-led changes had left the app inconsistent and heavy. The clearest symptom: tapping an input field could do three entirely different things — a standard dropdown, a below-the-fold dropdown that forced scrolling, or a bottom sheet. Filters behaved differently on every screen. Navigation was confusing. Too many taps for the simplest actions. And the average user of this app is a 55-year-old clinician mid-visit, not a power user with patience for inconsistency.

**At a glance:**
- `WHO` Providers and clinical staff — front desk and medical assistants — using mobile in daily care; average user ~55
- `GOAL` Access patient data on the go, complete common tasks in fewer steps, rely on mobile for real clinical workflows
- `BLOCKER` Confusing navigation, inconsistent flows, too many taps — and mobile drifting out of sync with the web platform
- `ROOT CAUSE` Feature-first design instead of workflow-first; UX debt from incremental changes; legacy implementations never governed by a unified system

**The bet:** If we could give one 55-year-old clinician a mobile app where every tap behaves the same way, they'd trust it enough to leave the desktop behind.

## The journey

**Exploration: three behaviors became one.**

This wasn't a choice between two competing designs — it was a consolidation. The legacy app had accumulated three different input behaviors (dropdown, below-fold scroll, bottom sheet) and inconsistent filter implementations across screens. Instead of trying to "fix" each one individually, I standardized every option-picking interaction on the **bottom sheet** — the most natural mobile pattern — and applied the same discipline to filters on every screen where they appear.

Two cards:

Card 1 — `LEGACY · 3 BEHAVIORS` (grey, `REPLACED`): "The inherited state: standard dropdowns, below-the-fold dropdowns that forced scrolling (bad on mobile), and bottom sheets — depending on which screen you were on. Filters varied per screen. No governing pattern, no hierarchy, and a 12px minimum font that was simply too small for the user base."

Card 2 — `ONE PATTERN · BOTTOM SHEETS` (red-bordered, `SHIPPED`): "Every option-picking input unified on bottom sheets. Every filter standardized. The minimum font raised across every screen. Real typographic hierarchy established. All of it governed by a newly created design system — one system for web and mobile. Validated whole screens with users, who called it 'intuitive, and lighter on the eyes.'"

**`THE CALL:`** "I chose one pattern everywhere over per-case optimization. A dropdown is occasionally quicker for two options, but predictability is what a 55-year-old clinician on a phone actually needs. Consistency won."

**Bonus exploration: the AI pipeline.**

Card 3 — `THE INITIATIVE · FIGMA → REPLIT` (red-bordered, `BUILT & LIVE`): "Midway through the redesign, an AI wave swept the company — and we had management's buy-in to use Replit AI for mobile designs. Rather than wait for a playbook, I built one: migrated our designs from Figma to Replit over MCP, defined the whole process, and installed reusable skills. I coached the junior designers through the learning curve. Today every single design change ships governed by a single prompt."

**`THE CALL:`** "I took the initiative to create a repeatable process rather than waiting for one — accepting a learning curve for the team in exchange for a pipeline that now makes every design change a one-prompt operation."

## Highlights
Four image placeholders with captions:
- *Bottom sheet pattern — one behavior, every input*
- *Typography hierarchy — raised minimum, real visual order*
- *Android = iOS — one system, consistent across platforms*
- *The Figma→Replit pipeline — the process I built*

## Outcome
- **3 → 1** Input behaviors, unified on bottom sheets
- **12px ↑** Minimum font raised for a 55+ user base
- **1 system** Design system governing web and mobile
- **1 prompt** Ships every design change via Figma → Replit

**Reflection:** "On a legacy product, consistency is a feature. Collapsing three input behaviors into one bottom-sheet pattern — and designing for our real user, a 55-year-old clinician — did more for trust than any single screen. Users called the result intuitive and lighter on the eyes; the design system and the Figma→Replit pipeline are what make it stay consistent."

## Next case
`NEXT →` **Wound Care** — "Wound documentation finally got a home."

---

# CASE STUDY 04 — WOUND CARE

## Hero
- Eyebrow: `CASE STUDY · 05/08`
- Title: `WOUND CARE`
- One-liner: "A specialty module that gave wounds a home — desktop to point-of-care."
- Meta strip: `ROLE` Individual Contributor — sole designer · `SCOPE` New specialty module, desktop + mobile · `TEAM` With a Product Analyst · `FOCUS` Clinical documentation, tracking, capture
- Hero image placeholder

## Context
Wound care is its own clinical discipline. Nurse practitioners assess a wound, measure its dimensions, photograph it, and track how it heals visit after visit — across clinics, patient homes, and long-term care facilities where connectivity varies. It's meticulous, longitudinal work. And eClinicalWorks' EHR had no dedicated place for any of it. Wound documentation was improvised across generic screens never designed for the job.

## The challenge
Documenting a single wound took roughly 12 steps, bouncing between the HPI and Examination sections of the EHR. Create the wound in one screen, then jump to the exam window. Document details there. Calculate surface area and volume by hand with an external calculator — in the middle of patient care. Follow-ups were manual too, with no way to see previous wound measurements while recording new ones. There was no reusable wound numbering, no in-context history, and no way to capture an image at the bedside and link it to the right wound.

**At a glance:**
- `WHO` Nurse practitioners and wound care providers — across clinics, patient homes, and long-term care
- `GOAL` Document, calculate, track, and review wounds in one place — at the point of care
- `BLOCKER` Multi-screen navigation, manual calculations, no reusable wound numbering, no history in-context
- `ROOT CAUSE` No purpose-built module; wound documentation stitched together from generic EHR screens

**The bet:** A single, purpose-built wound workflow — where everything lives together — would improve documentation quality and clinical decision-making, and meet providers where care actually happens.

## The journey

**Exploration: two paths, tested with clinicians.**

I worked with a product analyst to define the module. We identified two viable approaches and built both in parallel:

Card 1 — `OPTION A · MODAL ON THE NOTE` (grey, `EXPLORED`): "Reused the platform's existing modal framework — a window that opens over the progress note when you click a link. It was consistent with how the rest of the EHR works, and faster to build since the framework already existed. But the entry point was buried: users had to know to click a specific link to find it."

Card 2 — `OPTION B · A 'WOUND CARE' TAB` (red-bordered, `SHIPPED`): "A flatter design that surfaces the entire module as a visible tab at the top of the progress screen. It's a new pattern — more to build, and it breaks with the existing modal convention — but the entry point is immediately visible. Users see 'Wound Care' as a tab and just navigate to it."

"We tested both directions with 5 clinicians. The modal approach was hard to discover — users didn't know it was there until told. The tab was found instantly."

**`THE CALL:`** "I chose the tab over reusing the modal framework — accepting a new pattern and extra build effort to win discoverability. The clinician test made the tradeoff concrete rather than a matter of opinion. A modal is safer (it reuses the platform's convention), but a specialty workflow this important deserved a front door you can actually see."

**What the module delivered:** the tab opens into a one-stop workflow: document the wound, auto-calculate surface area and volume in-flow (no external tools), assign reusable wound numbering, view full measurement history in-context, and capture wound images on the eCW mobile app at the point of care — linked to the right wound instantly.

## Highlights
Four image placeholders with captions:
- *The Wound Care tab — discoverable entry point*
- *In-flow calculation — surface area and volume, no external tools*
- *Wound history and tracking — reusable numbering, prior measurements in view*
- *Point-of-care capture — snap on mobile, linked to the right wound*

## Outcome
- **12 → 1** Steps across two sections, now one module
- **4–5** Clicks saved per wound
- **5** Clinicians validated discoverability
- **Shipped** Live in the latest production release

**Reflection:** "As the sole designer, I owned a specialty workflow end to end. The lever wasn't a prettier screen — it was collapsing a 12-step, two-section chore into one discoverable module, and proving the discoverability win with clinicians before we shipped. The 5-clinician test was the smallest study you can run, but it turned a subjective pattern debate into a clear, defensible call."

## Next case
`NEXT →` **SatyaNetra** — "An intelligence platform for verifying what's real."

---

# CASE STUDY 05 — SATYANETRA

## Hero
- Eyebrow: `CASE STUDY · 06/08`
- Title: `SATYANETRA`
- One-liner: "An intelligence platform for verifying what's real — designed from zero."
- Meta strip: `ROLE` Product Designer — full MVP · `CLIENT` Hackelite · `USERS` Government analysis teams · `FOCUS` Complex data UX, intelligence workflows
- Hero image placeholder

## Context
SatyaNetra is an intelligence and verification platform built for government analysis teams. In an era of misinformation, deepfakes, and coordinated manipulation across platforms, these teams need one place to cut through the noise — checking what's real, what's fake, and where a narrative is spreading. The product was entirely new: no existing codebase, no prior design, no established patterns.

## The challenge
Five very different capabilities had to feel like one coherent product: fake-news and sentiment analysis across social platforms (Twitter, Instagram, Snapchat, Reddit), deepfake detection with authenticity scoring, WhatsApp fact-checking across groups and chats, dark-web keyword monitoring with reach and sentiment scores, and OSINT lookup from a single identifier (phone number, email, username, or address). The users — government analysts — are domain experts but not necessarily tech-savvy. Dense, high-stakes intelligence data had to feel legible and trustworthy at a glance.

**At a glance:**
- `WHO` Government analysis teams — domain experts, not power-users
- `GOAL` Verify authenticity across platforms, detect manipulation, monitor narrative spread
- `MODULES` Fake-news & sentiment · Deepfake detection · WhatsApp fact-check · Dark web monitoring · OSINT lookup
- `CONSTRAINT` Five capabilities, one product — legible to non-technical users

**The bet:** If every module shared the same entry pattern, the same scoring language, and the same dashboard structure, analysts could move between capabilities without re-learning the interface — and trust the results.

## The journey

**The design approach: one language, five dialects.**

Rather than designing five separate tools, I built one unified design language and adapted it per module:

Card 1 — `SEARCH-FIRST ENTRY` (red-bordered, `THE PATTERN`): "Every module starts the same way: a search field. Enter a keyword (dark web), a URL (fake news), a file (deepfake), a phone number (WhatsApp), or an identifier (OSINT) — and the platform does the work. No complex setup, no multi-step wizards. The analyst types, the system answers."

Card 2 — `CONSISTENT SCORING` (red-bordered, `THE PATTERN`): "Every module produces an authenticity/sentiment score — visualized the same way, with the same color logic and the same confidence indicators. An analyst reading a deepfake score and a dark-web sentiment score sees the same visual system, even though the underlying data is completely different."

Card 3 — `GLANCEABLE DASHBOARDS` (red-bordered, `THE PATTERN`): "Results render as dashboards optimized for scan-and-decide, not read-and-study. Key findings surface first; details are one click deeper. Designed for analysts who need answers in minutes, not hours."

**`THE CALL:`** "The cost of one unified language is that each module loses some bespoke optimization — a dark-web keyword map might benefit from a radically different layout than a WhatsApp chat scanner. I accepted that tradeoff because learnability across five modules mattered more than per-module perfection for a user base that would use all five."

## Highlights
Four image placeholders with captions:
- *Search-first entry — one input pattern across all modules*
- *The scoring dashboard — consistent authenticity visualization*
- *Deepfake detection — flagging manipulated content*
- *OSINT lookup — one identifier, linked accounts across platforms*

## Outcome
- **Complete MVP** Every module, every screen — designed end to end
- **1 scoring language** Consistent across five different capabilities
- **0 → 1** From blank canvas to a shipped product

**Reflection:** "The hardest part wasn't any single module — it was making five fundamentally different data types feel like one product. Designing a shared scoring language and a search-first entry point across all five was the lever: it meant an analyst could pick up any module without a tutorial, and trust the output because it looked and behaved like the module they already knew."

## Next case
`NEXT →` **Hackelite** — "Broken UX to conversion-first, designed and shipped solo."

---

# CASE STUDY 06 — HACKELITE

## Hero
- Eyebrow: `CASE STUDY · 07/08`
- Title: `HACKELITE`
- One-liner: "From primitive to persuasive — a full website revamp, designed and shipped solo."
- Meta strip: `ROLE` Freelance designer — end to end · `SCOPE` Full site revamp, including internal flows · `STACK` Figma (design) → Framer (build & hosting) · `FOCUS` Conversion UX, copy, SEO
- Hero image placeholder

## Context
Hackelite is a technology company that needed its website to work as hard as its products. The existing site was primitive — unclear flows, generic copy, pages that didn't guide anyone anywhere, and poor search visibility. It wasn't converting visitors into leads, and it wasn't being found in the first place.

## The challenge
This wasn't a visual refresh — it was a structural problem. The site's information architecture didn't match how visitors actually make decisions. Internal flows were broken or dead-ended. The copy was vague and feature-focused instead of benefit-driven. And the site had no meaningful SEO foundation — structure, content, and metadata all needed reworking.

**At a glance:**
- `WHO` Potential clients and partners visiting hackelite.com
- `GOAL` Convert visitors into enquiries and establish search presence
- `BLOCKER` Broken UX, unclear flows, weak copy, poor SEO
- `ROOT CAUSE` The site was built feature-first, not journey-first — no one had designed the path from landing to action

**The bet:** If every page led to a clear next step, the copy spoke to outcomes (not features), and the site was structured for search — conversions and visibility would follow without paid traffic.

## The journey

**The approach: own everything.**

Card 1 — `TRADITIONAL HANDOFF` (grey, `CONSIDERED`): "The standard approach: design in Figma, hand specs to a developer, review builds, iterate through rounds of feedback. It works, but every round introduces translation loss — what ships rarely matches what was designed, and iteration is slow."

Card 2 — `DESIGN + BUILD + HOST, SOLO` (red-bordered, `SHIPPED`): "I designed the full site in Figma, then built it myself on Framer — including deployment and hosting. Every page, every internal flow, every responsive breakpoint. I also rewrote all the copy to be sharp, scannable, and conversion-focused, and restructured the site's metadata and content for SEO."

**`THE CALL:`** "I chose to own build and hosting myself rather than hand off to a developer — accepting the extra workload because it meant zero translation loss, much faster iteration, and a shipped site that matched the design pixel-for-pixel. For a conversion-focused project, that precision matters: every misaligned CTA or broken flow is a lost lead."

## Highlights
Three image placeholders with captions:
- *Before → After — the homepage transformation*
- *Conversion flow — every page leads to a clear next step*
- *Mobile — responsive, built and tested by the same hand*

## Outcome
- **Full revamp** Every page and internal flow, redesigned
- **Live on Framer** Designed, built, deployed, and hosted end to end
- **Conversion + SEO** Copy and structure tuned to be found and to convert
- [PLACEHOLDER for any client-reported numbers — enquiries, traffic, ranking improvement]

**Reflection:** "Owning everything — UX, copy, SEO, build, and hosting — showed me how much sharper a product gets when design and delivery live in one pair of hands. There's no 'well, the developer interpreted it differently' — what I designed is what shipped. It's the same systems thinking I bring to clinical software, applied to conversion."

## Next case
`NEXT →` **XSpaces** — "An AI-powered real-estate SaaS, built from scratch."

---

# CASE STUDY 07 — XSPACES

## Hero
- Eyebrow: `CASE STUDY · 08/08 · ONGOING`
- Title: `XSPACES`
- One-liner: "An AI-powered real-estate SaaS, built from scratch — design system to product."
- Meta strip: `ROLE` Founder & Designer · `SCOPE` 0→1 SaaS product · `STATUS` Ongoing — active development · `FOCUS` Design systems, AI-powered lead management
- Hero image placeholder
- Small red badge: `LIVE WIP`

## Context
XSpaces is a side venture — an AI-powered real-estate lead management SaaS I'm building from scratch. It's the kind of project where every constraint is self-imposed and every decision is mine: product direction, design system, component architecture, and the eventual handoff to engineering. It exists because I wanted to build a production-grade product outside of healthcare, from zero, on my own terms.

## The challenge
Building a SaaS product solo means you can't cut corners on the system — there's no team to absorb inconsistency later. Every component, every color value, every spacing token has to be right the first time, because it compounds. The product covers lead management, property listings, AI-assisted workflows, and analytics — a wide surface that needs a tight foundation.

**At a glance:**
- `WHO` Real-estate professionals managing leads and listings
- `GOAL` AI-powered lead management that works from day one
- `CONSTRAINT` Solo build — the design system is the only safety net
- `STATUS` Active development; design system and core screens complete

**The approach:** Build the system first. Everything else follows.

## The journey

**The foundation: a full atomic design system.**

This isn't a case study about a shipped product — it's about building the machine that makes the product possible.

Card 1 — `THE DESIGN SYSTEM` (red-bordered, `BUILT`): "A complete atomic design system built from scratch: a 321-color Untitled UI-style palette, DM Sans typography on a strict 4px grid, and a component library that scales from atoms (buttons, inputs, badges) through molecules (form fields, search bars) to complex components — Status Chip, Table, Dropdown, Calendar, Left Navigation. Plus a 53-icon Lucide library customized for the product."

Card 2 — `CORE SCREENS` (red-bordered, `IN PROGRESS`): "Dashboard, lead management views, property listings, AI assistant panel, and analytics — all built on the system. Every screen is a composition of the library, not a one-off. When the product evolves, the system absorbs the change."

**`THE CALL:`** "I invested the time to build a production-grade design system before designing a single product screen — even though it's a side project and the temptation was to move fast and patch later. The bet: the system pays for itself by making every future screen faster, more consistent, and handoff-ready."

## Highlights
Three image placeholders with captions:
- *The component library — atoms to complex components*
- *A core screen — composed entirely from the system*
- *The 321-color palette + 53-icon set*

## Outcome
This is an ongoing project — framed as progress, not completion:
- **321** Colors in a structured palette
- **53** Custom icons
- **1 system** Atomic design system, atoms → complex components
- **Active build** Core screens complete; product in development

**Reflection:** "XSpaces is where I practice what I preach about systems over screens — except here, I own the consequences entirely. Building the design system first, solo, for a product no one is waiting on, is the purest test of whether I actually believe patterns outlast screens. So far, every new screen I add proves it."

## Next case
`NEXT →` **Sunoh.ai** — "The AI scribe that turns a patient conversation into a ready-to-sign note." *(loops back to the hero case study)*

---

# CASE STUDY 08 — RENAISSANCE ANARCHY (lightweight page)

## Hero
- Eyebrow: `CASE STUDY · BRAND`
- Title: `RENAISSANCE ANARCHY`
- One-liner: "Crafting the visual identity of underground motorcycle culture."
- Meta strip: `ROLE` Brand & Visual Designer · `CLIENT` Renaissance Anarchy MTB · `FOCUS` Identity, visual language, social media presence
- Hero image placeholder

## Context
Renaissance Anarchy is an underground motorcycle culture crew — documenting rides, building community, and living loud. They needed a visual identity that felt as raw and real as the culture itself: no polish, no corporate veneer — just an honest visual language that could stretch across social media, video, merch, and the crew's growing digital presence.

## The work
This was a brand project, not a product project — so the structure is simpler: no multi-step exploration with option cards, just the identity work and its application.

"I designed the brand identity from scratch — logo, visual system, color language, typography rules — and extended it into a complete file and social media language. The goal was a system flexible enough for Instagram grids, YouTube thumbnails, ride documentation, and eventual merch, while staying unmistakably Renaissance Anarchy in every context."

## Highlights
Three image placeholders with captions:
- *The identity — logo and visual language*
- *Social media system — flexible, consistent, unmistakable*
- *Applied — across content, community, and culture*

## Testimonial (in place of metrics — this is the outcome)
The red-hairline `THE CALL` panel style, but used as a testimonial:

> "Parth brought our vision to life like it was his own. The website he designed for Renaissance Anarchy perfectly captures our underground MTB culture-crew. His creativity, attention to detail, and genuine passion made the whole experience incredible."
> — **Derek Diaz** · Founder, Renaissance Anarchy

## Next case
`NEXT →` **Sunoh.ai** — "The AI scribe that turns a patient conversation into a ready-to-sign note." *(loops back)*

---

## HOW TO USE THIS FILE
1. Open your Figma Make case-study template (from the first prompt).
2. For each project above, replace the Sunoh content with this project's content.
3. Generate desktop + mobile frames.
4. You'll have 8 case-study pages (7 full + 1 brand/lightweight) plus the Sunoh hero already done.

Every word above is final, paste-ready copy. The only [PLACEHOLDER] markers are for image slots you'll fill with real screenshots. Never invent a metric, a testimonial, or a client quote that isn't written here.
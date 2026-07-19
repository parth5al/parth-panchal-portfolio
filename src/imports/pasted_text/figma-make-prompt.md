# FIGMA MAKE PROMPT — parth5al.work v2

Paste this into Figma Make as a single prompt. Attach the six approved artboard PNGs as reference images if the tool accepts uploads (`01-hero`, `02-about`, `03-work-reel-start`, `04-work-reel-map`, `05-vertical-tail`, `06-mobile`).

---

Design and prototype a single-page portfolio website for **Parth Panchal**, a Senior Product Designer in healthcare & AI. Style is **pixel-brutalist black and red** — inspired by units.gr's fixed-sidebar layout and spur.us's telemetry precision, but darker and sharper. Think "a vitals monitor for design work": black is the monitor, red is the live signal.

## Look & feel (match these exactly)
- Canvas `#0A0A0B` · Panels `#101013` · Cards `#141416` · Text `#F4F3F0` (Bone) · Secondary `#9A9CA1` (Ash) · Accent **Red `#ED1C24`** — used only for active nav, metric chips, links, pulses. Never body text.
- Type: **Press Start 2P** for headlines/wordmarks (pixel display); **JetBrains Mono** uppercase +letter-spacing for all labels, chips, chrome, counters; **Inter** sentence case for body.
- Layout uses large rounded panels (~22px radius) inset on the void canvas. Hairlines are Bone at 8–12% opacity.
- Live-chrome details throughout: a real time clock chip on each panel, mono `SEC.0N / NAME` labels, a date stamp reading `FEBRUARY 2026 · AHMEDABAD, INDIA`.

## Layout — desktop
**Fixed left sidebar (272px wide), never scrolls:**
- Logo `parth.` and sub-label `PRODUCT DESIGNER · HEALTHCARE AI`.
- Four numbered nav cards in scroll order: `01 About`, `02 Work`, `03 Archives`, `04 Contact`. Card shows number top-left, `↗` top-right, label bottom-left. Active card: **red fill, near-black text, red number becomes black**. Inactive: surface fill, bone label, red number. The active state moves down the sidebar as the user scrolls — driven by which section is on screen.
- Below the cards: `RESUME ↓` (surface, hairline border), `GET IN TOUCH` (bone fill, black text), three social chips (IG / IN / YT).

**Content area:** rounded panels inset to the right of the sidebar.

## The single-page narrative (top to bottom, then a sideways reel, then back to vertical)

**Section 1 — Hero.** A dark panel filling the viewport. Center it with a giant pixel wordmark **`NAMASTEY`** in bone, and a thin red horizontal heartbeat trace beneath it (flat line with one spike). Bottom left: a small chip with a red pulsing dot + `LISTENING…`. Bottom center: `SCROLL →` and a thin progress bar with counter `01 / 05`. Top-right of the panel: clock + `SEC.01 / HOME`. On the far right edge, hint the next section by letting a slim `02 WORK` panel peek in.

**Section 2 — About (two blocks side by side).** Left panel (surface fill): a chip labeled `ABOUT`, then a big three-line pixel headline "**THE PERSON / BEHIND THE / PIXELS.**" — with "PIXELS." in red. Below: a short bio paragraph in Ash, ending with a pill button `MORE ABOUT ME ↗`. Bottom-left stamp in red mono: `ETHICS BECOME AESTHETICS`. Right panel (darker fill): a placeholder for a **red wireframe/point-cloud hologram bust** — draw it as three concentric red ellipses (head shape) with horizontal red scan-lines through them, an elliptical base beneath, and mono labels `THREE.JS — HOLOGRAM OF PARTH` and `DRAG TO ROTATE`.

**Section 3 — Work: horizontal reel (this is the showpiece).** When the user reaches this section, the page pins and vertical scroll begins moving 8 blocks sideways. Sidebar shows `02 Work` lit red. Along the bottom of the pinned viewport: a **red ECG trace drawing left to right** with a heartbeat spike at each block boundary, plus a mono counter `01 / 08`. When the last block settles, the reel unpins and the page continues vertically.

The 8 blocks (each with a cover-image slot, pixel-type title, a red mono metric chip, and a `READ CASE STUDY →` link):
1. **ECW EHR PRODUCTS** — a giant intro slide; two-line title where "ECLINICALWORKS" is bone and "EHR PRODUCTS" is red; chip `4 CASE STUDIES INSIDE`
2. **SUNOH.AI** — surface style — chip `40% LESS DOCUMENTATION TIME`
3. **SMART UNIVERSITY** — surface — chip `4,891 USERS IN 2 WEEKS`
4. **ECLINICALMOBILE** — surface — chip `3 PATTERNS → 1`
5. **WOUND CARE** — surface — chip `12 STEPS → 1 MODULE`
6. **SATYANETRA** — different identity: void fill with a **2px red border**, title in **red**, chip `ENTIRE MVP, END TO END`
7. **HACKELITE** — different identity: **bone fill, black text**, deep-red chip `DESIGN → LIVE`
8. **XSPACES** — different identity: **dashed bone-hairline border**, small red `LIVE WIP` badge in the corner, chip `ONGOING · 0→1`

**Section 4 — Archives.** Back to vertical. Pixel `ARCHIVES` header, tagline "A repository of design stuff that never gets the light — even after that UX-worthy fight :)". Below: a 3-column grid of dark card thumbnails with a small red mono tag (`INTERACTION STUDY`, `UI EXPLORATION`, `MOTION`, `TYPE`, `COMPONENT`, `EXPERIMENT`) and a year in the corner.

**Section 5 — Contact.** Pixel `LET'S TALK` header, then `hello@parth5al.work` in red display type, mono row `LINKEDIN ↗ · INSTAGRAM ↗ · RESUME ↓`, then a red pill `GET IN TOUCH ↗`.

**Section 6 — Footer (full width, red).** A full-bleed red block. Two enormous pixel lines centered: `DESIGN IS LIFE` in black on top, `AND VICE VERSA` in bone below. Under them, mono `LET'S GET YOUR IDEA A LIFE`. A black pill button `GET IN TOUCH`. Very bottom, small mono: `© PARTH PANCHAL · FEBRUARY 2026 · AHMEDABAD, INDIA`.

## Motion & interaction (in the prototype)
- The sidebar's active card animates as scroll advances — smooth swap of red fill from one card to the next.
- Cards on hover: **invert to red fill / black text** with a tiny dither flicker.
- The horizontal reel: pinned scroll (vertical wheel → horizontal translate); slight lerp; ECG trace and counter update with progress.
- The `LISTENING…` chip is draggable.
- All pixel headlines "decode in" from scrambled glyphs to the final word when they enter view (~500ms, once per element).
- Section transitions are **hard cuts, not fades** — brutalism cuts like film.

## Mobile (design a second frame at 390px wide)
Sidebar becomes a top bar with `parth.` and a burger icon. Burger opens a full-screen black overlay with stacked pixel links (ABOUT / WORK / ARCHIVES / CONTACT + RESUME ↓ + copyright line). Everything else stacks vertically in the same narrative order — including the 8 work blocks (no horizontal reel on mobile, and each block keeps its unique identity treatment). Hologram becomes a small static wireframe.

## Copy to use verbatim (do not rewrite)
- Hero: **NAMASTEY** · sub `SENIOR PRODUCT DESIGNER · HEALTHCARE & AI`
- About headline: **THE PERSON / BEHIND THE / PIXELS.**
- About bio: "I'm Parth Panchal — a product designer who found his craft in the hardest room in software: healthcare. At eClinicalWorks I work on products used by hundreds of thousands of clinicians, lead designers, and build the AI pipelines that keep quality consistent after shipping."
- Work intro: **ECLINICALWORKS / EHR PRODUCTS** · "Four years shaping the future of healthcare — clinical AI, legacy modernization and specialty care, for a platform serving 850K+ healthcare professionals."
- Work one-liners:
  - Sunoh.ai — "The AI scribe that turns a patient conversation into a ready-to-sign note."
  - Smart University — "A giant learning library you can simply ask."
  - eClinicalMobile — "A 2011 app, rebuilt for how care actually moves."
  - Wound Care — "Wound documentation finally got a home — desktop to point-of-care."
  - SatyaNetra — "An intelligence platform for verifying what's real."
  - Hackelite — "Broken UX to conversion-first, designed and shipped solo."
  - XSpaces — "An AI-powered real-estate SaaS, built from scratch — ongoing."
- Archives tagline: "A repository of design stuff that never gets the light — even after that UX-worthy fight :)"
- Footer: **DESIGN IS LIFE / AND VICE VERSA** · "LET'S GET YOUR IDEA A LIFE"

## Deliverables
Produce a working interactive prototype with two frames — **Desktop (1440 or 1920 wide)** and **Mobile (390 wide)** — plus a color/type style set I can reuse. Every button and nav card should be clickable in the prototype and jump to its section.

Do not invent metrics, testimonials, or client details beyond what's above. Any missing content should appear as a clearly labeled placeholder block, not filler.
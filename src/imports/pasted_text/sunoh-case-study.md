# FIGMA MAKE PROMPT — Case Study Page (parth5al.work)

Paste into Figma Make. If you already generated the main site with the other Figma Make prompt, attach that output as a reference so the style matches exactly — same sidebar, same type, same colors.

---

Design and prototype a **case-study page** for Parth Panchal's portfolio, in the same **pixel-brutalist black and red** system as the main site: canvas `#0A0A0B`, panels `#101013`, cards `#141416`, text `#F4F3F0` (Bone), secondary `#9A9CA1` (Ash), accent **Red `#ED1C24`** used only for active states, tags, and key numbers. Headlines in **Press Start 2P** (pixel), labels/chips/chrome in **JetBrains Mono** uppercase with letterspacing, body in **Inter** sentence case. Large rounded panels (~22px radius) on the void canvas, hairlines at 8–12% opacity.

Build this page for **Sunoh.ai** — Parth's flagship case study — as the fully worked example. It doubles as the reusable template for the other seven projects (a swap-in content table is at the end).

## Layout

**Sidebar persists** exactly as on the main site: logo, the four numbered nav cards (About / Work / Archives / Contact) with **Work lit red** since this page lives under it, then Resume / Get in touch / socials. Above the content column, add a small mono link: `← BACK TO WORK`.

## The page, top to bottom

**1. Hero.** Mono red eyebrow `CASE STUDY · 02/08`. Giant pixel title `SUNOH.AI`. One line beneath in Inter: "Designing the ambient AI scribe clinicians reach for every visit." Below that, a **meta strip** — four mono columns, label in red, value in bone: `ROLE` Product Designer — UX & UI · `SCOPE` Desktop + mobile, end to end · `TEAM` Design, UX Research, Engineering · `FOCUS` Workflow UX, interface & new features. A large hero image placeholder panel.

**2. Chapter nav.** A slim sticky mono strip: `CONTEXT — CHALLENGE — JOURNEY — HIGHLIGHTS — OUTCOME`. The chapter currently in view is red; the rest are ash. Clicking one jumps to that section.

**3. Context.** Pixel sub-header `CONTEXT`. Paragraph: "Sunoh listens ambiently during the visit and drafts the clinical note in real time — freeing clinicians to stay present with the patient instead of the keyboard. It's one of eClinicalWorks' most widely used AI products."

**4. The challenge.** Pixel sub-header `THE CHALLENGE`. Paragraph: "When I joined, Sunoh was a capable ambient-scribe engine — but it lived inside engineering, with no real entry point for clinicians and a workflow never shaped for daily clinical use. The challenge: turn raw capability into something clinicians would reach for mid-visit, without breaking their flow or their trust." Beside it, a red-hairline-bordered **`AT A GLANCE`** panel with three rows (red label / bone value): `WHO` Providers, mid-visit · `TRUST` Output feeds the medical record — non-negotiable · `REACH` Desktop and mobile. Below both, a slightly larger italic-weight line as `THE BET`: "If Sunoh could disappear into the visit — capturing the note without asking for attention — clinicians would trust it and reach for it every time."

**5. The journey — build this carefully, it's the most important chapter.**

*5a. The widget.* Two cards side by side: **`V1 · MINIMAL`** (surface/grey fill, small `EXPLORED` tag) — "Just the essentials: patient name, a listening indicator, and the recording timer." **`V2 · MULTIPARTY`** (red-bordered fill, small `SHIPPED` tag) — "When visits needed multiple speakers (a child with a parent), engineering identified voices by context — so I expanded the widget with an identified-voices section: tappable accordions per speaker (patient, parent, provider)." Below both cards, a red-hairline **`THE CALL`** panel, larger type: "I chose a draggable widget over a docked panel — a dock would have compressed a data-rich view. Floating keeps it full and flexible; if it ever overlaps the note, the clinician simply moves it."

*5b. Fusion, three tries.* Three cards in a row: **`V1 · MODAL OVERLAY`** (grey, `EXPLORED`) — "A movable window over the note. It kept the note visible, but felt bolted-on and unintuitive." **`V2 · FLAT FUSION`** (grey, `EXPLORED`) — "Note and Sunoh side by side, everything flattened. Full visibility — but too much on screen; users got lost." **`V3 · PER-SECTION FUSION`** (red-bordered, `SHIPPED`) — "Sunoh's findings embedded inside each note section — right where the provider is already working. Accept, and it populates." Below, another `THE CALL` panel: "The unlock was matching how providers actually work — they complete note sections in order. So instead of showing everything at once, I surfaced Sunoh per section, right where they were already looking. The cost — restructuring the note around Sunoh — was worth ending the 'where do I look?' problem."

**6. Highlights.** Pixel sub-header `HIGHLIGHTS`. A 2×2 grid of image placeholders with captions: *The widget — draggable launch point* · *Fusion — per-section integration* · *Sunoh on mobile* · *Sunoh Cards — live spoken context*.

**7. Outcome.** Pixel sub-header `OUTCOME`. A row of big red numerals with bone captions underneath: **`40%`** Less documentation time · **`25 → 12 MIN`** Typical visit, documented · **`~80%`** Of subscribed providers benefit. Directly below, one reflection paragraph — not a floating stat: "The 40% time saving didn't come from faster typing — it came from removing context-switching. Embedding Sunoh's findings inside each note section, matching how providers already fill notes in order, let them accept instead of re-document. And designing for trust — visible, section-level control — is what made them rely on it."

**8. Next case.** A full-width card: `NEXT →` **Smart University AI** — "A giant learning library you can simply ask."

## Motion & interaction
Pixel sub-headers decode from scrambled glyphs on scroll-into-view (once each). Cards invert to red-fill/black-text on hover with a small dither flicker. Chapter nav highlight follows scroll position. Section transitions are hard cuts, no fades.

## Mobile frame (design a second frame, 390px wide)
Sidebar becomes a top bar + burger (same overlay menu as the main site). Chapter nav becomes a horizontal row of small chips, scrollable. All cards in "The journey" stack vertically instead of side by side — one at a time, full width. Everything else stacks in the same order.

## Reusing this template — swap-in content for the other projects
If you regenerate this prompt for a different case study, keep the exact structure above and swap in:

| Project | Meta (Role · Scope · Team · Focus) | One-liner | Journey note | Outcome |
|---|---|---|---|---|
| Smart University AI | Senior Designer, led 2 · Conversational assistant · Usability/BAs/Eng · Conversational UX | A giant learning library you can simply ask | Voice-first was the vision (explored/roadmap); scoped to a chat MVP (shipped) to hit the national conference deadline | 4,891 users · 16,763 chats · 31,620 questions · 2,267 practices in 2 weeks |
| eClinicalMobile | Senior Designer, led 2 · Legacy mobile redesign · Design/Product/Eng/BA · Consistency & systems | A 2011 app, rebuilt for how care moves | Three input behaviors (explored/legacy) unified into one bottom-sheet pattern (shipped) | 3→1 input behaviors · 12px min font raised · 1 system · 1-prompt pipeline |
| Wound Care | Individual Contributor · New specialty module · With a Product Analyst · Clinical documentation | Wound documentation finally got a home | Modal on the note (explored, hard to discover) vs. a "Wound Care" tab (shipped, tested with 5 clinicians) | 12→1 steps · 4–5 clicks saved · validated with 5 clinicians · shipped |
| SatyaNetra | Product Designer, full MVP · Client: Hackelite · Gov analysis teams · Complex data UX | An intelligence platform for verifying what's real | [PLACEHOLDER — specific decisions] | Complete MVP, end to end |
| Hackelite | Freelance, end to end · Full revamp · Figma→Framer · Conversion, copy, SEO | Broken UX to conversion-first, shipped solo | Chose Framer over a handoff so the shipped site matched the design exactly | Live, conversion-first [PLACEHOLDER for numbers] |
| XSpaces | Founder & designer · 0→1 SaaS · Solo · Design systems | An AI real-estate SaaS, built from scratch | [PLACEHOLDER — ongoing, keep short and honest] | In active development — full design system + core screens built |
| Renaissance Anarchy | Brand & visual designer · Client: Renaissance Anarchy MTB · Identity & film language | Crafting the visual identity of underground MTB culture | [PLACEHOLDER] | Use the real Derek Diaz testimonial in place of invented metrics |

## Deliverables
One primary **desktop frame** (Sunoh.ai's full case-study page, as specified above) and one **mobile frame** (390px). Do not invent metrics, testimonials, or client details beyond what's written here — any gap becomes a clearly labeled placeholder block.
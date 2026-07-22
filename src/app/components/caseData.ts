export type Tag = { text: string; kind: "explored" | "shipped" };
export type Option = { version: string; tag: Tag; body: string; highlight?: boolean };
export type JourneyGroup = {
  label: string;
  intro?: string;
  options?: Option[];
  note?: string;
  call?: string;
  outro?: string;
  placeholder?: boolean;
};

export type CaseData = {
  id: string;
  index: string; // e.g. "02/08"
  title: string;
  oneLiner: string;
  badge?: string;
  meta: { role: string; scope: string; team: string; focus: string };
  metaLabels?: { role: string; scope: string; team: string; focus: string };
  context: string;
  challenge?: { body: string; glance: [string, string][]; bet?: string; betLabel?: string };
  journey: JourneyGroup[];
  highlights: string[];
  outcome: { stats: [string, string][]; reflection?: string };
  next?: { id: string; title: string; oneLiner: string };
};

const shipped = (text = "SHIPPED"): Tag => ({ text, kind: "shipped" });
const explored = (text = "EXPLORED"): Tag => ({ text, kind: "explored" });

export const CASES: Record<string, CaseData> = {
  sunoh: {
    id: "sunoh",
    index: "02/08",
    title: "AI SCRIBE APP",
    oneLiner: "Designing the ambient AI scribe clinicians reach for every visit.",
    meta: {
      role: "Product Designer — UX & UI",
      scope: "Desktop + mobile, end to end",
      team: "Design, UX Research, Engineering",
      focus: "Workflow UX, interface & new features",
    },
    context:
      "The AI Scribe App listens ambiently during the visit and drafts the clinical note in real time — freeing clinicians to stay present with the patient instead of the keyboard. It's one of the platform's most widely used AI products.",
    challenge: {
      body: "When I joined, the AI Scribe App was a capable ambient-scribe engine — but it lived inside engineering, with no real entry point for clinicians and a workflow never shaped for daily clinical use. The challenge: turn raw capability into something clinicians would reach for mid-visit, without breaking their flow or their trust.",
      glance: [
        ["WHO", "Providers, mid-visit"],
        ["TRUST", "Output feeds the medical record — non-negotiable"],
        ["REACH", "Desktop and mobile"],
      ],
      bet: "If the AI Scribe App could disappear into the visit — capturing the note without asking for attention — clinicians would trust it and reach for it every time.",
    },
    journey: [
      {
        label: "01 — THE WIDGET",
        options: [
          { version: "V1 · MINIMAL", tag: explored(), body: "Just the essentials: patient name, a listening indicator, and the recording timer." },
          { version: "V2 · MULTIPARTY", tag: shipped(), highlight: true, body: "When visits needed multiple speakers (a child with a parent), engineering identified voices by context — so I expanded the widget with an identified-voices section: tappable accordions per speaker (patient, parent, provider)." },
        ],
        call: "I chose a draggable widget over a docked panel — a dock would have compressed a data-rich view. Floating keeps it full and flexible; if it ever overlaps the note, the clinician simply moves it.",
      },
      {
        label: "02 — FUSION, THREE TRIES",
        options: [
          { version: "V1 · MODAL OVERLAY", tag: explored(), body: "A movable window over the note. It kept the note visible, but felt bolted-on and unintuitive." },
          { version: "V2 · FLAT FUSION", tag: explored(), body: "Note and AI scribe side by side, everything flattened. Full visibility — but too much on screen; users got lost." },
          { version: "V3 · PER-SECTION FUSION", tag: shipped(), highlight: true, body: "The AI scribe's findings embedded inside each note section — right where the provider is already working. Accept, and it populates." },
        ],
        call: "The unlock was matching how providers actually work — they complete note sections in order. So instead of showing everything at once, I surfaced the AI scribe per section, right where they were already looking. The cost — restructuring the note around the AI scribe — was worth ending the \"where do I look?\" problem.",
      },
    ],
    highlights: [
      "THE WIDGET — DRAGGABLE LAUNCH POINT",
      "FUSION — PER-SECTION INTEGRATION",
      "AI SCRIBE ON MOBILE",
      "SCRIBE CARDS — LIVE SPOKEN CONTEXT",
    ],
    outcome: {
      stats: [
        ["40%", "Less documentation time"],
        ["25 → 12 MIN", "Typical visit, documented"],
        ["~80%", "Of subscribed providers benefit"],
      ],
      reflection:
        "The 40% time saving didn't come from faster typing — it came from removing context-switching. Embedding the AI scribe's findings inside each note section, matching how providers already fill notes in order, let them accept instead of re-document. And designing for trust — visible, section-level control — is what made them rely on it.",
    },
    next: { id: "smart", title: "SMART UNIVERSITY AI", oneLiner: "A giant learning library you can simply ask." },
  },

  smart: {
    id: "smart",
    index: "03/08",
    title: "SMART UNIVERSITY AI",
    oneLiner: "Turning a static course catalog into something you can just ask.",
    meta: {
      role: "Senior Designer — led 2 designers",
      scope: "Conversational assistant in the portal",
      team: "Usability, Business Analysts, Engineering",
      focus: "Conversational UX, search & personalization",
    },
    context:
      "eCW University is eClinicalWorks' learning portal — a vast, growing library of modules and documentation where practices learn to use a large, robust EHR. It's where new users spend their first weeks and where experienced ones return whenever a feature changes. Smart University AI is the intelligence layer we built on top: instead of browsing the library, you ask it.",
    challenge: {
      body: "Great content, hard to find. To learn a feature, clinicians had to keyword-search and browse manually through a giant static catalog — slow, frustrating, and easy to give up on. The portal was built as a course library, not an interactive assistant; there was no conversational search, no contextual surfacing, and no personalization.",
      glance: [
        ["WHO", "Clinicians and healthcare staff learning the EHR — plus training, product, and UX teams"],
        ["GOAL", "Quick, intuitive access to the right content, personalized courses, and timely feature updates"],
        ["BLOCKER", "Manual keyword search and extensive browsing; content abundant but never contextually surfaced"],
        ["ROOT CAUSE", "The portal was built as a static catalog, not an interactive learning assistant"],
      ],
      bet: "If we could make the entire library feel like something you can simply ask — and get a trustworthy, cited answer back — clinicians would learn faster and come back more often.",
    },
    journey: [
      {
        label: "01 — VOICE WAS THE VISION",
        options: [
          { version: "VOICE-FIRST · THE NORTH STAR", tag: explored("EXPLORED · ROADMAP"), body: "The original vision — defined with our business analysts, the product team (I led design), and engineering — was voice-first. Users would simply speak, and the assistant would understand, answer aloud, and search across the entire EHR ecosystem. We prototyped both voice and chat interactions in Figma. The model was smart enough, and the experience was compelling." },
          { version: "CHAT-ONLY MVP", tag: shipped(), highlight: true, body: "With the national conference deadline closing in, we couldn't ship voice in time. So I scoped to a disciplined chat-only MVP — the highest-value slice. Text in, best answer out: the assistant finds the content, summarizes it, and presents it with cited sources. We also shipped a dark theme for the launch, since new users spend hours in the portal and needed something easier on the eyes." },
        ],
        call: "I chose to scope the full voice vision down to a chat-first MVP — shipping the highest-value slice on time for the national conference rather than the complete vision late. It was a bet that getting it into hands quickly would validate the concept and earn the runway to build voice next. It did. Voice is now on the roadmap, funded by the adoption the chat MVP drove.",
      },
    ],
    highlights: [
      "THE CONVERSATIONAL PANEL — ASK IN PLAIN LANGUAGE",
      "CITED ANSWERS — EVERY RESPONSE BACKED BY ITS SOURCE",
      "CURATED COURSES — PERSONALIZED, ON REQUEST",
      "DARK THEME — EASIER ON THE EYES",
    ],
    outcome: {
      stats: [
        ["4,891", "Users — 75% external, 25% internal"],
        ["16,763", "Chats initiated"],
        ["31,620", "Questions answered"],
        ["2,267", "Client practices in 2 weeks"],
      ],
      reflection:
        "Meeting users inside a tool they already knew — instead of sending them somewhere new — drove adoption fast. A disciplined chat-first MVP, shipped on time for the national conference, got it into hands quickly: thousands of clinicians in the first two weeks, with strongly positive feedback (57 likes to 10 dislikes). That validated the bet enough to now build toward the original voice vision.",
    },
    next: { id: "mobile", title: "EHR MOBILE APP", oneLiner: "A legacy clinical app, rebuilt for how care actually moves." },
  },

  mobile: {
    id: "mobile",
    index: "04/08",
    title: "EHR MOBILE APP",
    oneLiner: "Rebuilding a legacy clinical mobile app around real workflows — and one consistent design system.",
    meta: {
      role: "Senior Designer — led 2 designers",
      scope: "Legacy mobile app redesign",
      team: "Design, Product, Engineering, BA",
      focus: "Workflow UX, consistency, design system",
    },
    context:
      "The EHR Mobile App is the EHR's mobile companion — built around 2011, when smartphones first reached the clinic, and barely updated since. It supports providers during active patient care: rounds between rooms, quick patient checks, urgent updates. Sessions are short. Clarity is everything. But the interface stayed frozen in time — legacy patterns, weak hierarchy, and Android and iOS experiences that don't even match each other.",
    challenge: {
      body: "Years of incremental, feature-led changes had left the app inconsistent and heavy. The clearest symptom: tapping an input field could do three entirely different things — a standard dropdown, a below-the-fold dropdown that forced scrolling, or a bottom sheet. Filters behaved differently on every screen. Navigation was confusing. Too many taps for the simplest actions. And the average user of this app is a 55-year-old clinician mid-visit, not a power user with patience for inconsistency.",
      glance: [
        ["WHO", "Providers and clinical staff using mobile in daily care; average user ~55"],
        ["GOAL", "Access patient data on the go, complete common tasks in fewer steps, rely on mobile for real workflows"],
        ["BLOCKER", "Confusing navigation, inconsistent flows, too many taps — mobile drifting out of sync with web"],
        ["ROOT CAUSE", "Feature-first design; UX debt from incremental changes; legacy patterns never governed by a system"],
      ],
      bet: "If we could give one 55-year-old clinician a mobile app where every tap behaves the same way, they'd trust it enough to leave the desktop behind.",
    },
    journey: [
      {
        label: "01 — THREE BEHAVIORS BECAME ONE",
        intro: "This wasn't a choice between two competing designs — it was a consolidation. The legacy app had accumulated three different input behaviors (dropdown, below-fold scroll, bottom sheet) and inconsistent filter implementations across screens. Instead of trying to \"fix\" each one individually, I standardized every option-picking interaction on the bottom sheet — the most natural mobile pattern — and applied the same discipline to filters on every screen.",
        options: [
          { version: "LEGACY · 3 BEHAVIORS", tag: explored("REPLACED"), body: "The inherited state: standard dropdowns, below-the-fold dropdowns that forced scrolling (bad on mobile), and bottom sheets — depending on which screen you were on. Filters varied per screen. No governing pattern, no hierarchy, and a 12px minimum font that was simply too small for the user base." },
          { version: "ONE PATTERN · BOTTOM SHEETS", tag: shipped(), highlight: true, body: "Every option-picking input unified on bottom sheets. Every filter standardized. The minimum font raised across every screen. Real typographic hierarchy established. All of it governed by a newly created design system — one system for web and mobile. Validated whole screens with users, who called it 'intuitive, and lighter on the eyes.'" },
        ],
        call: "I chose one pattern everywhere over per-case optimization. A dropdown is occasionally quicker for two options, but predictability is what a 55-year-old clinician on a phone actually needs. Consistency won.",
      },
      {
        label: "02 — THE AI PIPELINE",
        options: [
          { version: "THE INITIATIVE · FIGMA → REPLIT", tag: shipped("BUILT & LIVE"), highlight: true, body: "Midway through the redesign, an AI wave swept the company — and we had management's buy-in to use Replit AI for mobile designs. Rather than wait for a playbook, I built one: migrated our designs from Figma to Replit over MCP, defined the whole process, and installed reusable skills. I coached the junior designers through the learning curve. Today every single design change ships governed by a single prompt." },
        ],
        call: "I took the initiative to create a repeatable process rather than waiting for one — accepting a learning curve for the team in exchange for a pipeline that now makes every design change a one-prompt operation.",
      },
    ],
    highlights: [
      "BOTTOM SHEET PATTERN — ONE BEHAVIOR, EVERY INPUT",
      "TYPOGRAPHY HIERARCHY — RAISED MINIMUM, REAL ORDER",
      "ANDROID = IOS — ONE SYSTEM ACROSS PLATFORMS",
      "THE FIGMA→REPLIT PIPELINE",
    ],
    outcome: {
      stats: [
        ["3 → 1", "Input behaviors, unified on bottom sheets"],
        ["12PX ↑", "Minimum font raised for a 55+ user base"],
        ["1 SYSTEM", "Design system governing web and mobile"],
        ["1 PROMPT", "Ships every design change via Figma → Replit"],
      ],
      reflection:
        "On a legacy product, consistency is a feature. Collapsing three input behaviors into one bottom-sheet pattern — and designing for our real user, a 55-year-old clinician — did more for trust than any single screen. Users called the result intuitive and lighter on the eyes; the design system and the Figma→Replit pipeline are what make it stay consistent.",
    },
    next: { id: "wound", title: "WOUND CARE", oneLiner: "Wound documentation finally got a home." },
  },

  wound: {
    id: "wound",
    index: "05/08",
    title: "WOUND CARE",
    oneLiner: "A specialty module that gave wounds a home — desktop to point-of-care.",
    meta: {
      role: "Individual Contributor — sole designer",
      scope: "New specialty module, desktop + mobile",
      team: "With a Product Analyst",
      focus: "Clinical documentation, tracking, capture",
    },
    context:
      "Wound care is its own clinical discipline. Nurse practitioners assess a wound, measure its dimensions, photograph it, and track how it heals visit after visit — across clinics, patient homes, and long-term care facilities where connectivity varies. It's meticulous, longitudinal work. And eClinicalWorks' EHR had no dedicated place for any of it. Wound documentation was improvised across generic screens never designed for the job.",
    challenge: {
      body: "Documenting a single wound took roughly 12 steps, bouncing between the HPI and Examination sections of the EHR. Create the wound in one screen, then jump to the exam window. Document details there. Calculate surface area and volume by hand with an external calculator — in the middle of patient care. Follow-ups were manual too, with no way to see previous wound measurements while recording new ones. There was no reusable wound numbering, no in-context history, and no way to capture an image at the bedside and link it to the right wound.",
      glance: [
        ["WHO", "Nurse practitioners and wound care providers — clinics, homes, and long-term care"],
        ["GOAL", "Document, calculate, track, and review wounds in one place — at the point of care"],
        ["BLOCKER", "Multi-screen navigation, manual calculations, no reusable numbering, no history in-context"],
        ["ROOT CAUSE", "No purpose-built module; wound documentation stitched together from generic EHR screens"],
      ],
      bet: "A single, purpose-built wound workflow — where everything lives together — would improve documentation quality and clinical decision-making, and meet providers where care actually happens.",
    },
    journey: [
      {
        label: "01 — TWO PATHS, TESTED WITH CLINICIANS",
        intro: "I worked with a product analyst to define the module. We identified two viable approaches and built both in parallel.",
        options: [
          { version: "OPTION A · MODAL ON THE NOTE", tag: explored(), body: "Reused the platform's existing modal framework — a window that opens over the progress note when you click a link. It was consistent with how the rest of the EHR works, and faster to build since the framework already existed. But the entry point was buried: users had to know to click a specific link to find it." },
          { version: "OPTION B · A 'WOUND CARE' TAB", tag: shipped(), highlight: true, body: "A flatter design that surfaces the entire module as a visible tab at the top of the progress screen. It's a new pattern — more to build, and it breaks with the existing modal convention — but the entry point is immediately visible. Users see 'Wound Care' as a tab and just navigate to it." },
        ],
        outro: "We tested both directions with 5 clinicians. The modal approach was hard to discover — users didn't know it was there until told. The tab was found instantly.",
        call: "I chose the tab over reusing the modal framework — accepting a new pattern and extra build effort to win discoverability. The clinician test made the tradeoff concrete rather than a matter of opinion. A modal is safer (it reuses the platform's convention), but a specialty workflow this important deserved a front door you can actually see.",
      },
      {
        label: "02 — WHAT THE MODULE DELIVERED",
        note: "The tab opens into a one-stop workflow: document the wound, auto-calculate surface area and volume in-flow (no external tools), assign reusable wound numbering, view full measurement history in-context, and capture wound images on the eCW mobile app at the point of care — linked to the right wound instantly.",
      },
    ],
    highlights: [
      "THE WOUND CARE TAB — DISCOVERABLE ENTRY POINT",
      "IN-FLOW CALCULATION — SURFACE AREA & VOLUME",
      "WOUND HISTORY & TRACKING — REUSABLE NUMBERING",
      "POINT-OF-CARE CAPTURE — SNAP ON MOBILE",
    ],
    outcome: {
      stats: [
        ["12 → 1", "Steps across two sections, now one module"],
        ["4–5", "Clicks saved per wound"],
        ["5", "Clinicians validated discoverability"],
        ["SHIPPED", "Live in the latest production release"],
      ],
      reflection:
        "As the sole designer, I owned a specialty workflow end to end. The lever wasn't a prettier screen — it was collapsing a 12-step, two-section chore into one discoverable module, and proving the discoverability win with clinicians before we shipped. The 5-clinician test was the smallest study you can run, but it turned a subjective pattern debate into a clear, defensible call.",
    },
    next: { id: "satya", title: "SATYANETRA", oneLiner: "An intelligence platform for verifying what's real." },
  },

  satya: {
    id: "satya",
    index: "06/08",
    title: "SATYANETRA",
    oneLiner: "An intelligence platform for verifying what's real — designed from zero.",
    meta: {
      role: "Product Designer — full MVP",
      scope: "Client: Hackelite",
      team: "Government analysis teams",
      focus: "Complex data UX, intelligence workflows",
    },
    metaLabels: { role: "ROLE", scope: "CLIENT", team: "USERS", focus: "FOCUS" },
    context:
      "SatyaNetra is an intelligence and verification platform built for government analysis teams. In an era of misinformation, deepfakes, and coordinated manipulation across platforms, these teams need one place to cut through the noise — checking what's real, what's fake, and where a narrative is spreading. The product was entirely new: no existing codebase, no prior design, no established patterns.",
    challenge: {
      body: "Five very different capabilities had to feel like one coherent product: fake-news and sentiment analysis across social platforms (Twitter, Instagram, Snapchat, Reddit), deepfake detection with authenticity scoring, WhatsApp fact-checking across groups and chats, dark-web keyword monitoring with reach and sentiment scores, and OSINT lookup from a single identifier (phone number, email, username, or address). The users — government analysts — are domain experts but not necessarily tech-savvy. Dense, high-stakes intelligence data had to feel legible and trustworthy at a glance.",
      glance: [
        ["WHO", "Government analysis teams — domain experts, not power-users"],
        ["GOAL", "Verify authenticity across platforms, detect manipulation, monitor narrative spread"],
        ["MODULES", "Fake-news & sentiment · Deepfake detection · WhatsApp fact-check · Dark web · OSINT lookup"],
        ["CONSTRAINT", "Five capabilities, one product — legible to non-technical users"],
      ],
      bet: "If every module shared the same entry pattern, the same scoring language, and the same dashboard structure, analysts could move between capabilities without re-learning the interface — and trust the results.",
    },
    journey: [
      {
        label: "ONE LANGUAGE, FIVE DIALECTS",
        intro: "Rather than designing five separate tools, I built one unified design language and adapted it per module.",
        options: [
          { version: "SEARCH-FIRST ENTRY", tag: shipped("THE PATTERN"), highlight: true, body: "Every module starts the same way: a search field. Enter a keyword (dark web), a URL (fake news), a file (deepfake), a phone number (WhatsApp), or an identifier (OSINT) — and the platform does the work. No complex setup, no multi-step wizards. The analyst types, the system answers." },
          { version: "CONSISTENT SCORING", tag: shipped("THE PATTERN"), highlight: true, body: "Every module produces an authenticity/sentiment score — visualized the same way, with the same color logic and the same confidence indicators. An analyst reading a deepfake score and a dark-web sentiment score sees the same visual system, even though the underlying data is completely different." },
          { version: "GLANCEABLE DASHBOARDS", tag: shipped("THE PATTERN"), highlight: true, body: "Results render as dashboards optimized for scan-and-decide, not read-and-study. Key findings surface first; details are one click deeper. Designed for analysts who need answers in minutes, not hours." },
        ],
        call: "The cost of one unified language is that each module loses some bespoke optimization — a dark-web keyword map might benefit from a radically different layout than a WhatsApp chat scanner. I accepted that tradeoff because learnability across five modules mattered more than per-module perfection for a user base that would use all five.",
      },
    ],
    highlights: [
      "SEARCH-FIRST ENTRY — ONE INPUT PATTERN",
      "THE SCORING DASHBOARD — CONSISTENT VISUALIZATION",
      "DEEPFAKE DETECTION — FLAGGING MANIPULATED CONTENT",
      "OSINT LOOKUP — ONE IDENTIFIER, LINKED ACCOUNTS",
    ],
    outcome: {
      stats: [
        ["COMPLETE MVP", "Every module, every screen — end to end"],
        ["1 LANGUAGE", "Consistent scoring across five capabilities"],
        ["0 → 1", "From blank canvas to a shipped product"],
      ],
      reflection:
        "The hardest part wasn't any single module — it was making five fundamentally different data types feel like one product. Designing a shared scoring language and a search-first entry point across all five was the lever: it meant an analyst could pick up any module without a tutorial, and trust the output because it looked and behaved like the module they already knew.",
    },
    next: { id: "hack", title: "HACKELITE", oneLiner: "Broken UX to conversion-first, designed and shipped solo." },
  },

  hack: {
    id: "hack",
    index: "07/08",
    title: "HACKELITE",
    oneLiner: "From primitive to persuasive — a full website revamp, designed and shipped solo.",
    meta: {
      role: "Freelance designer — end to end",
      scope: "Full site revamp, including internal flows",
      team: "Figma (design) → Framer (build & hosting)",
      focus: "Conversion UX, copy, SEO",
    },
    metaLabels: { role: "ROLE", scope: "SCOPE", team: "STACK", focus: "FOCUS" },
    context:
      "Hackelite is a technology company that needed its website to work as hard as its products. The existing site was primitive — unclear flows, generic copy, pages that didn't guide anyone anywhere, and poor search visibility. It wasn't converting visitors into leads, and it wasn't being found in the first place.",
    challenge: {
      body: "This wasn't a visual refresh — it was a structural problem. The site's information architecture didn't match how visitors actually make decisions. Internal flows were broken or dead-ended. The copy was vague and feature-focused instead of benefit-driven. And the site had no meaningful SEO foundation — structure, content, and metadata all needed reworking.",
      glance: [
        ["WHO", "Potential clients and partners visiting hackelite.com"],
        ["GOAL", "Convert visitors into enquiries and establish search presence"],
        ["BLOCKER", "Broken UX, unclear flows, weak copy, poor SEO"],
        ["ROOT CAUSE", "Built feature-first, not journey-first — no one designed the path from landing to action"],
      ],
      bet: "If every page led to a clear next step, the copy spoke to outcomes (not features), and the site was structured for search — conversions and visibility would follow without paid traffic.",
    },
    journey: [
      {
        label: "OWN EVERYTHING",
        options: [
          { version: "TRADITIONAL HANDOFF", tag: explored("CONSIDERED"), body: "The standard approach: design in Figma, hand specs to a developer, review builds, iterate through rounds of feedback. It works, but every round introduces translation loss — what ships rarely matches what was designed, and iteration is slow." },
          { version: "DESIGN + BUILD + HOST, SOLO", tag: shipped(), highlight: true, body: "I designed the full site in Figma, then built it myself on Framer — including deployment and hosting. Every page, every internal flow, every responsive breakpoint. I also rewrote all the copy to be sharp, scannable, and conversion-focused, and restructured the site's metadata and content for SEO." },
        ],
        call: "I chose to own build and hosting myself rather than hand off to a developer — accepting the extra workload because it meant zero translation loss, much faster iteration, and a shipped site that matched the design pixel-for-pixel. For a conversion-focused project, that precision matters: every misaligned CTA or broken flow is a lost lead.",
      },
    ],
    highlights: [
      "BEFORE → AFTER — THE HOMEPAGE TRANSFORMATION",
      "CONVERSION FLOW — EVERY PAGE LEADS TO A NEXT STEP",
      "MOBILE — RESPONSIVE, BUILT BY THE SAME HAND",
    ],
    outcome: {
      stats: [
        ["FULL REVAMP", "Every page and internal flow, redesigned"],
        ["LIVE ON FRAMER", "Designed, built, deployed, hosted end to end"],
        ["CONV + SEO", "Copy and structure tuned to convert"],
      ],
      reflection:
        "Owning everything — UX, copy, SEO, build, and hosting — showed me how much sharper a product gets when design and delivery live in one pair of hands. There's no 'well, the developer interpreted it differently' — what I designed is what shipped. It's the same systems thinking I bring to clinical software, applied to conversion. [ PLACEHOLDER — client-reported enquiry / traffic / ranking numbers to be added. ]",
    },
    next: { id: "xspaces", title: "XSPACES", oneLiner: "An AI-powered real-estate SaaS, built from scratch." },
  },

  xspaces: {
    id: "xspaces",
    index: "07/08 · ONGOING",
    title: "XSPACES",
    oneLiner: "Designing a 0→1 AI-powered real-estate SaaS — from design system to production-ready product.",
    badge: "LIVE WIP",
    meta: {
      role: "Founder, Product Designer & Architect",
      scope: "0→1 SaaS — design system, product, AI workflows",
      team: "Solo build — active development",
      focus: "Systems thinking, AI-assisted lead management",
    },
    metaLabels: { role: "ROLE", scope: "SCOPE", team: "STATUS", focus: "FOCUS" },
    context:
      "XSpaces is a side venture I'm designing and building from zero — an AI-powered lead management SaaS for real-estate professionals. The premise is simple: real-estate agents drown in scattered leads, manual follow-up, and disconnected listing data. XSpaces gives them one intelligent workspace — where leads are prioritized by AI, listings are tracked end to end, and the busywork disappears. What makes this project different is that I own every decision: product direction, design system architecture, component hierarchy, AI workflow UX, and eventual engineering handoff. No team to absorb inconsistency. No second pass. The system has to be right the first time.",
    challenge: {
      body: "Real-estate CRMs are broken in a predictable way — they're built around the salesperson's memory rather than intelligent surfacing. Agents miss follow-ups because there's no priority signal. They lose track of listings because the pipeline and the property data live in different tools. And they can't act on any of it because the interfaces are dense, dated, and built for desktops that never leave the desk. The opportunity was clear: design a system that thinks alongside the agent — surfacing the right lead at the right time, letting AI handle the repetitive qualification, and making the product feel like an extension of the agent's judgment rather than a tool they have to fight.",
      glance: [
        ["WHO", "Real-estate agents — brokers, independents, growing teams"],
        ["PROBLEM", "Scattered leads, no priority signal, disconnected listing data"],
        ["GOAL", "One workspace: AI-prioritized leads + end-to-end listing management"],
        ["CONSTRAINT", "Solo build — the system is the only safety net against drift"],
        ["STATUS", "Design system complete; core screens in active development"],
      ],
      betLabel: "THE BET",
      bet: "If the system is atomic and the AI surface is opinionated, every new screen is fast to build and the product stays coherent without a team enforcing it.",
    },
    journey: [
      {
        label: "01 — FOUNDATION BEFORE FEATURES",
        intro: "The most dangerous thing in a solo build is moving fast before you have a system. Every shortcut compounds — you end up with 12 shades of the same gray and a button that behaves differently on every screen. I refused to design a single product screen until the foundation was unambiguous.",
        options: [
          {
            version: "THE DESIGN SYSTEM — ATOMIC",
            tag: shipped("BUILT"),
            highlight: true,
            body: "Built a complete atomic design system from scratch: a 321-token color palette (structured like Untitled UI — primary, neutral, error, warning, success, each in 11 steps), DM Sans typography on a strict 4px baseline grid, and a component library that escalates from atoms (buttons, inputs, badges, toggles, avatars) through molecules (form fields, search bars, filter chips, status indicators) up to complex organisms — Data Table with sort/filter/pagination, Left Navigation with nested routes, Calendar with availability states, Dropdown with grouped options, and a full AI Assistant Panel. 53 custom Lucide icons, each pixel-fitted to 20×20 and 24×24 grids.",
          },
          {
            version: "THE SPACING & GRID SYSTEM",
            tag: shipped("BUILT"),
            body: "Every spacing value in the system is a multiple of 4px. Margins, gaps, padding, component heights — all on the same scale. This sounds obvious, but enforcing it on a solo build means the product never accumulates visual debt. An engineer picking up any screen can immediately infer the system without asking.",
          },
        ],
        call: "I spent three weeks on the design system before touching a product screen. That felt slow. It wasn't. Every core screen since has taken a fraction of the time it would have taken otherwise — because every decision about color, spacing, and component behavior was already made.",
      },
      {
        label: "02 — THE AI LAYER: LEAD INTELLIGENCE",
        intro: "The system is the foundation. The AI layer is the product's actual value proposition. Most CRMs surface every lead equally — the agent has to decide who to call. XSpaces inverts this: the AI surfaces who matters most, why, and what to say.",
        options: [
          {
            version: "AI LEAD SCORING + PRIORITY QUEUE",
            tag: shipped("DESIGNED"),
            highlight: true,
            body: "Every lead is assigned an AI score (0–100) based on engagement signals: time since last contact, inquiry type, listing match quality, and response cadence. The lead list is sorted by score by default — high-urgency leads surface to the top with a red priority chip, warm leads in amber, cold ones in muted neutral. Agents see who to call before they've had coffee. The score reasoning is visible on the lead detail — not a black box. One line: 'Highly interested — 3 messages in 48h, matching budget, no callback yet.'",
          },
          {
            version: "AI ASSISTANT PANEL",
            tag: explored("IN PROGRESS"),
            body: "A contextual AI panel that lives alongside the lead detail view — not a separate chat, but an embedded intelligence layer. It suggests the next action (call, send listing, schedule viewing), drafts a follow-up message based on the lead's inquiry history, and flags if a listing they showed interest in has had a price drop. The goal is that the agent never has to decide what to do next — XSpaces tells them.",
          },
          {
            version: "AUTOMATED FOLLOW-UP SEQUENCES",
            tag: explored("PLANNED"),
            body: "A sequence builder for automated follow-up — agent defines the trigger (new inquiry, no response in 48h, listing price drop) and the AI composes the message. The agent approves before send. This keeps the human in the loop while eliminating the cognitive overhead of remembering to follow up.",
          },
        ],
        call: "The AI surface is opinionated by design. I made a deliberate choice not to give agents a blank 'ask the AI anything' interface — that puts all the cognitive work back on the agent. Instead, the AI surfaces specific, actionable signals. The agent makes a judgment call; the AI handles the pattern recognition.",
      },
      {
        label: "03 — CORE PRODUCT SCREENS",
        intro: "With the design system solid and the AI layer defined, the core screens came together fast. Every screen is a composition of library components — not a one-off. When the product evolves, the system absorbs the change.",
        options: [
          {
            version: "DASHBOARD — THE COMMAND CENTER",
            tag: shipped("DESIGNED"),
            highlight: true,
            body: "The dashboard is the first thing an agent sees every morning. It surfaces: today's priority leads (AI-scored, top 3), active listings with status chips (Available, Pending, Closed), a pipeline value summary, and the most recent AI activity (follow-ups sent, leads qualified). Designed on a bento grid — each module is independently scannable. The agent can read the most important signal in under 10 seconds without drilling into anything.",
          },
          {
            version: "LEAD MANAGEMENT VIEW",
            tag: shipped("DESIGNED"),
            body: "A full lead table with AI priority scores, status chips, last-contact timestamps, and assigned listings. Filterable by status, score, source (website inquiry, referral, cold outreach), and date range. Clicking a row opens the lead detail — timeline of all interactions, listing matches, AI score reasoning, and the assistant panel. Designed so the agent never has to leave the view to get context.",
          },
          {
            version: "PROPERTY LISTINGS BOARD",
            tag: shipped("DESIGNED"),
            body: "A kanban-style board (Available → Viewing Scheduled → Offer Submitted → Closed) plus a list view for agents who prefer tabular data. Each card shows the property thumbnail, address, price, days on market, and the number of active leads interested. Status updates are drag-to-update on desktop. The board makes the pipeline spatial — agents can see at a glance how many listings are in each stage.",
          },
          {
            version: "ANALYTICS — PERFORMANCE LAYER",
            tag: explored("IN PROGRESS"),
            body: "A lightweight analytics view: lead conversion rate by source, average response time, listings closed per month, and AI follow-up effectiveness (reply rate vs. manual follow-up). Not a full BI dashboard — just the four metrics that tell an agent whether they're winning or where they're leaking.",
          },
        ],
        call: "Every screen decision came back to one question: does this reduce the number of things the agent has to remember? If a screen required the agent to hold state in their head — 'I should check back on this lead' — it was a design failure. The AI layer exists to externalize that memory.",
      },
      {
        label: "04 — SYSTEMS ENGINEERING UNDER THE HOOD",
        intro: "A design system is only as strong as its maintenance model. On a solo build, 'enforcement' is a personal discipline, not a process. I built the system to make the correct choice the obvious choice.",
        options: [
          {
            version: "TOKEN ARCHITECTURE",
            tag: shipped("BUILT"),
            body: "Every color in the product references a semantic token — not a raw hex. `color.lead.priority.high` maps to the red scale; `color.surface.default` maps to the neutral-100 background. Changing the brand color is a single token update, not a find-and-replace across 40 screens. The 321 palette values are structured, not arbitrary — each hue has 11 steps from near-white to near-black.",
          },
          {
            version: "COMPONENT STATES — ALL OF THEM",
            tag: shipped("BUILT"),
            highlight: true,
            body: "Every component in the library has all states defined: default, hover, focus, active, disabled, error, loading. This isn't aesthetic — it's a contract with engineering. When a developer picks up a component, there are no ambiguous edge cases. They build what they see. The library has 47 documented components, each with all states.",
          },
        ],
        call: "The discipline that matters most on a solo build isn't creativity — it's consistency. A design system that's 80% complete is 0% useful. I finished the system before I let myself design a screen, and the result is that every screen since has been built on solid ground.",
      },
    ],
    highlights: [
      "THE DESIGN SYSTEM — ATOMIC ARCHITECTURE",
      "AI LEAD SCORING — PRIORITY QUEUE",
      "DASHBOARD — BENTO COMMAND CENTER",
      "LEAD DETAIL — AI ASSISTANT PANEL",
    ],
    outcome: {
      stats: [
        ["321", "Design tokens — structured color palette"],
        ["47", "Components — all states documented"],
        ["53", "Custom Lucide icons at 20 & 24px"],
        ["0→1", "Product designed, core screens in active development"],
      ],
      reflection:
        "XSpaces is the cleanest test I've given myself: build a production-grade product without a team, a deadline, or a brief. Everything I know about systems thinking, design engineering, and AI-first product design is in this project. The design system-first approach paid off — every new screen takes hours instead of days, because every decision is already made. The AI layer is where the real product design challenge lives: not 'how do we add AI' but 'where does the agent's judgment stop and the machine's pattern recognition begin?' I'm still figuring that out. That's the good part.",
    },
    next: { id: "sunoh", title: "AI SCRIBE APP", oneLiner: "The AI scribe that turns a patient conversation into a ready-to-sign note." },
  },
};

import { useEffect, useRef, useState } from "react";
import { PixelText } from "./PixelText";
import { CASES, type CaseData, type Option, type JourneyGroup, type Text, type Visual as VisualData } from "./caseData";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BLOCKS } from "./Work";

const MONO = "'JetBrains Mono', monospace";
const BODY = "Inter, sans-serif";

const CHAPTERS = [
  { id: "context", label: "CONTEXT" },
  { id: "challenge", label: "CHALLENGE" },
  { id: "journey", label: "JOURNEY" },
  { id: "highlights", label: "HIGHLIGHTS" },
  { id: "outcome", label: "OUTCOME" },
];

/* Decode-from-scramble pixel sub-header, fires once on scroll-into-view */
function ScrambleHeader({ text, color = "#f4f2f0" }: { text: string; color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [out, setOut] = useState(text);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const glyphs = "!<>-_\\/[]{}—=+*^?#________";
    const run = () => {
      if (done.current) return;
      done.current = true;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) { setOut(text); return; }
      let frame = 0;
      const id = setInterval(() => {
        const revealed = Math.floor(frame / 2);
        const next = text
          .split("")
          .map((ch, i) => (i < revealed || ch === " " ? ch : glyphs[Math.floor(Math.random() * glyphs.length)]))
          .join("");
        setOut(next);
        frame++;
        if (revealed > text.length) { clearInterval(id); setOut(text); }
      }, 40);
    };
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [text]);
  return (
    <div ref={ref}>
      <PixelText text={out} className="leading-[1.5]" style={{ fontSize: "clamp(12px,1.5vw,18px)", color }} />
    </div>
  );
}

const RULE = "border-[rgba(244,242,240,0.1)]";

const paras = (t?: Text) => (t === undefined ? [] : Array.isArray(t) ? t : [t]);

function Prose({ text, className = "", italic = false }: { text?: Text; className?: string; italic?: boolean }) {
  const items = paras(text);
  if (!items.length) return null;
  return (
    <div className={`flex flex-col gap-[20px] max-w-[720px] ${className}`}>
      {items.map((p, i) => (
        <p
          key={i}
          className={`text-[#b7b9be] ${italic ? "italic" : ""}`}
          style={{ fontFamily: BODY, fontSize: "clamp(16px,1.3vw,18px)", lineHeight: 1.75 }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}

function Label({ children, color = "#ed1c24" }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="tracking-[2px]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "11px", color }}>
      {children}
    </span>
  );
}

function tagClasses(kind: Option["tag"]["kind"]) {
  return kind === "shipped"
    ? "text-[#ed1c24] border border-[rgba(237,28,36,0.5)]"
    : "text-[#9a9ca1] border border-[rgba(244,242,240,0.14)]";
}

/** Image slot: real image when `src` exists, otherwise a labelled placeholder. */
function Visual({ visual, ratio = "aspect-[16/9]" }: { visual: VisualData; ratio?: string }) {
  return (
    <figure className="flex flex-col gap-[10px] m-0">
      <div className={`relative overflow-hidden rounded-[16px] bg-[#141416] border border-[rgba(244,242,240,0.08)] w-full ${ratio}`}>
        {visual.src ? (
          <ImageWithFallback src={visual.src} alt={visual.caption} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[#4a4a4e] tracking-[2px]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "10px" }}>IMAGE</span>
          </div>
        )}
      </div>
      <figcaption className="text-[#9a9ca1] tracking-[1px]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "10px", lineHeight: 1.5 }}>
        {visual.caption}
      </figcaption>
    </figure>
  );
}

function TheCall({ children }: { children: React.ReactNode }) {
  return (
    <aside className="border-l-[3px] border-[#ed1c24] bg-[#101013] rounded-r-[16px] px-[20px] py-[22px] md:px-[28px] md:py-[26px] flex flex-col gap-[12px] max-w-[720px]">
      <Label>THE CALL</Label>
      <p className="text-[#f4f2f0]" style={{ fontFamily: BODY, fontSize: "clamp(16px,1.4vw,19px)", lineHeight: 1.65 }}>{children}</p>
    </aside>
  );
}

/** One step of the process: a node on the vertical timeline. */
function Step({ opt, last }: { opt: Option; last: boolean }) {
  return (
    <li className="relative pl-[28px] md:pl-[40px] pb-[40px] last:pb-0 list-none">
      {!last && <span className="absolute left-[5px] md:left-[7px] top-[18px] bottom-0 w-px bg-[rgba(244,242,240,0.14)]" aria-hidden />}
      <span
        className={`absolute left-0 top-[6px] size-[11px] md:size-[15px] rounded-full border-2 ${
          opt.highlight ? "bg-[#ed1c24] border-[#ed1c24]" : "bg-[#0a0a0b] border-[#4a4a4e]"
        }`}
        aria-hidden
      />
      <div className="flex flex-col gap-[16px]">
        <div className="flex items-center flex-wrap gap-x-[12px] gap-y-[8px]">
          <h4 className="m-0 text-[#f4f2f0] tracking-[1.5px]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "clamp(12px,1.2vw,14px)", lineHeight: 1.5 }}>
            {opt.version}
          </h4>
          <span className={`inline-block rounded-[6px] px-[8px] py-[4px] tracking-[1.5px] ${tagClasses(opt.tag.kind)}`} style={{ fontFamily: MONO, fontWeight: 600, fontSize: "9px" }}>
            {opt.tag.text}
          </span>
        </div>
        <Prose text={opt.body} />
        {opt.visual && <Visual visual={opt.visual} />}
      </div>
    </li>
  );
}

function JourneyBlock({ g }: { g: JourneyGroup }) {
  return (
    <div className={`flex flex-col gap-[28px] border-t ${RULE} pt-[32px] first:border-t-0 first:pt-0`}>
      <h3 className="m-0 text-[#f4f2f0]" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(13px,1.8vw,20px)", lineHeight: 1.6 }}>
        {g.label}
      </h3>
      <Prose text={g.intro} />
      {g.visual && <Visual visual={g.visual} />}
      {g.placeholder ? (
        <div className="rounded-[16px] border border-dashed border-[rgba(244,242,240,0.18)] bg-[#101013] p-[24px] flex flex-col gap-[10px] max-w-[720px]">
          <Label color="#9a9ca1">PLACEHOLDER</Label>
          <Prose text={g.note} />
        </div>
      ) : g.options ? (
        <ol className="m-0 p-0 flex flex-col">
          {g.options.map((o, i) => <Step key={o.version} opt={o} last={i === g.options!.length - 1} />)}
        </ol>
      ) : (
        <Prose text={g.note} />
      )}
      <Prose text={g.outro} italic />
      {g.call && <TheCall>{g.call}</TheCall>}
    </div>
  );
}

/** Editorial section: sticky title rail on desktop, stacked on mobile. */
function Section({ id, num, title, accent, children }: { id: string; num: string; title: string; accent?: string; children: React.ReactNode }) {
  return (
    <section
      id={id}
      className={`scroll-mt-[130px] border-t ${RULE} pt-[40px] lg:pt-[64px] grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-[24px] lg:gap-[56px]`}
    >
      <div className="lg:sticky lg:top-[130px] self-start flex flex-col gap-[14px] min-w-0">
        <Label>{num}</Label>
        <ScrambleHeader text={title} color={accent} />
      </div>
      <div className="flex flex-col gap-[36px] min-w-0">{children}</div>
    </section>
  );
}

export function CaseStudy({ id, onOpen, onClose }: { id: string; onOpen: (id: string) => void; onClose: () => void }) {
  const data: CaseData = CASES[id] ?? CASES.sunoh;
  const [chapter, setChapter] = useState("context");
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // scroll-spy for chapter nav
  useEffect(() => {
    const root = scrollRef.current;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setChapter(e.target.id)),
      { root, rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [id]);

  // reset scroll + progress when switching case
  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
    }, 10);
    setProgress(0);
    setChapter("context");
  }, [id]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? el.scrollTop / max : 0);
  };

  const jump = (cid: string) => document.getElementById(cid)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div ref={scrollRef} onScroll={onScroll} className="fixed inset-0 z-[100] bg-[#0a0a0b] overflow-y-auto">
      {/* Breadcrumb */}
      <div className="sticky top-0 z-20 bg-[#0a0a0b]/95 backdrop-blur border-b border-[rgba(244,242,240,0.1)] px-[16px] sm:px-[24px] py-[16px] flex items-center justify-between gap-[12px]">
        <nav className="flex items-center gap-[8px] min-w-0" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "11px", letterSpacing: "1.5px" }}>
          <button onClick={onClose} className="text-[#9a9ca1] hover:text-[#f4f2f0] transition-colors">WORK</button>
          <span className="text-[#4a4a4e]">/</span>
          <span className="text-[#ed1c24] truncate">{data.title}</span>
        </nav>
        <button
          onClick={onClose}
          className="shrink-0 text-[#f4f2f0] border border-[rgba(244,242,240,0.2)] rounded-[12px] px-[12px] sm:px-[16px] py-[8px] hover:bg-[#ed1c24] hover:text-[#0a0a0b] hover:border-[#ed1c24] transition-colors"
          style={{ fontFamily: MONO, fontWeight: 600, fontSize: "11px", letterSpacing: "1.5px" }}
        >
          ← <span className="hidden sm:inline">BACK TO WORK</span><span className="sm:hidden">BACK</span>
        </button>
      </div>

      {/* Scroll progress bar */}
      <div className="sticky top-[57px] z-20 h-[3px] bg-[#141416]">
        <div className="h-full bg-[#ed1c24] transition-[width] duration-75 ease-linear" style={{ width: `${progress * 100}%` }} />
      </div>

      {/* Chapter nav */}
      <div className="sticky top-[60px] z-10 bg-[#0a0a0b]/95 backdrop-blur border-b border-[rgba(244,242,240,0.08)] px-[16px] sm:px-[24px] py-[12px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center gap-[8px] max-w-[1200px] mx-auto whitespace-nowrap">
          {CHAPTERS.map((c, i) => {
            const isEHR = BLOCKS.find((b) => b.id === id)?.kind === "ehr";
            const label = c.id === "highlights" && isEHR ? "FIGMA DECK" : c.label;
            return (
              <div key={c.id} className="flex items-center gap-[8px]">
                {i > 0 && <span className="text-[#4a4a4e]">—</span>}
                <button
                  onClick={() => jump(c.id)}
                  className={`tracking-[1.5px] transition-colors ${chapter === c.id ? "text-[#ed1c24]" : "text-[#9a9ca1] hover:text-[#f4f2f0]"}`}
                  style={{ fontFamily: MONO, fontWeight: 600, fontSize: "11px" }}
                >
                  {label}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-[1120px] mx-auto px-[20px] sm:px-[24px] pt-[40px] pb-[64px] lg:pt-[64px] lg:pb-[96px] flex flex-col gap-[48px] lg:gap-[80px]">
        {/* HERO */}
        <header className="flex flex-col gap-[28px] lg:gap-[36px]">
          <div className="flex items-center gap-[12px] flex-wrap">
            <Label>CASE STUDY · {data.index}</Label>
            {data.badge && (
              <span className="inline-flex items-center gap-[6px] text-[#0a0a0b] bg-[#ed1c24] rounded-[6px] px-[8px] py-[4px] tracking-[1.5px]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "9px" }}>
                <span className="size-[6px] rounded-full bg-[#0a0a0b] animate-pulse" />
                {data.badge}
              </span>
            )}
          </div>
          <PixelText
            text={data.title}
            className="block text-[#f4f2f0] leading-[1.35] break-words [overflow-wrap:anywhere] max-w-full"
            style={{ fontSize: "clamp(24px,5.2vw,64px)" }}
          />
          <p className="text-[#f4f2f0] max-w-[760px]" style={{ fontFamily: BODY, fontSize: "clamp(18px,2vw,24px)", lineHeight: 1.5 }}>{data.oneLiner}</p>
          {(() => {
            const block = BLOCKS.find((b) => b.id === id);
            return block ? (
              <div className="w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] rounded-[22px] overflow-hidden relative border border-[rgba(244,242,240,0.08)]">
                <ImageWithFallback src={block.cover} alt={data.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            ) : (
              <Visual visual={{ caption: "HERO" }} ratio="aspect-[16/9] lg:aspect-[21/9]" />
            );
          })()}
          <dl className={`m-0 grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-x-[24px] gap-y-[20px] border-t ${RULE} pt-[24px]`}>
            {([
              [data.metaLabels?.role ?? "ROLE", data.meta.role],
              [data.metaLabels?.scope ?? "SCOPE", data.meta.scope],
              [data.metaLabels?.team ?? "TEAM", data.meta.team],
              [data.metaLabels?.focus ?? "FOCUS", data.meta.focus],
            ] as const).map(([l, v]) => (
              <div key={l} className="flex flex-col gap-[8px] min-w-0">
                <dt><Label>{l}</Label></dt>
                <dd className="m-0 text-[#f4f2f0]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "12px", lineHeight: 1.5 }}>{v}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* CONTEXT */}
        <Section id="context" num="01" title="CONTEXT">
          <Prose text={data.context} />
        </Section>

        {/* CHALLENGE */}
        <Section id="challenge" num="02" title="THE CHALLENGE">
          {data.challenge ? (
            <>
              <Prose text={data.challenge.body} />
              <dl className={`m-0 flex flex-col max-w-[720px] border-t ${RULE}`}>
                {data.challenge.glance.map(([l, v]) => (
                  <div key={l} className={`grid grid-cols-1 sm:grid-cols-[140px_minmax(0,1fr)] gap-x-[24px] gap-y-[6px] py-[16px] border-b ${RULE}`}>
                    <dt><Label>{l}</Label></dt>
                    <dd className="m-0 text-[#f4f2f0]" style={{ fontFamily: BODY, fontSize: "16px", lineHeight: 1.55 }}>{v}</dd>
                  </div>
                ))}
              </dl>
              {data.challenge.bet && (
                <blockquote className="m-0 border-l-[3px] border-[#ed1c24] pl-[20px] md:pl-[28px] flex flex-col gap-[12px] max-w-[720px]">
                  <Label>{data.challenge.betLabel ?? "THE BET"}</Label>
                  <p className="m-0 text-[#f4f2f0] italic" style={{ fontFamily: BODY, fontSize: "clamp(18px,1.8vw,22px)", lineHeight: 1.55 }}>{data.challenge.bet}</p>
                </blockquote>
              )}
            </>
          ) : (
            <div className="rounded-[16px] border border-dashed border-[rgba(244,242,240,0.18)] bg-[#101013] p-[24px] flex flex-col gap-[10px] max-w-[720px]">
              <Label color="#9a9ca1">PLACEHOLDER</Label>
              <Prose text="Challenge narrative for this case study is being written up." />
            </div>
          )}
        </Section>

        {/* JOURNEY */}
        <Section id="journey" num="03" title="THE JOURNEY" accent="#ed1c24">
          <div className="flex flex-col gap-[56px] lg:gap-[72px]">
            {data.journey.map((g) => <JourneyBlock key={g.label} g={g} />)}
          </div>
        </Section>

        {/* HIGHLIGHTS */}
        {(() => {
          const isEHR = BLOCKS.find((b) => b.id === id)?.kind === "ehr";
          if (isEHR) {
            return (
              <section id="highlights" className="scroll-mt-[130px]">
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#ed1c24] rounded-[22px] p-[32px] md:p-[48px] flex flex-col items-center justify-center gap-[16px] hover:bg-[#d61920] transition-colors group cursor-pointer text-center"
                >
                  <span className="text-[#0a0a0b] tracking-[2px]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "14px" }}>
                    NDA PROTECTED
                  </span>
                  <h2 className="text-[#0a0a0b] m-0" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(18px,3vw,36px)", lineHeight: 1.4 }}>
                    LINK TO FIGMA DECK ↗
                  </h2>
                  <span className="text-[#0a0a0b]/80 max-w-[400px]" style={{ fontFamily: BODY, fontSize: "15px" }}>
                    Due to NDA, detailed design artifacts are available upon request. Click to view the deck.
                  </span>
                </a>
              </section>
            );
          }
          return (
            <Section id="highlights" num="04" title="HIGHLIGHTS">
              <div className="flex flex-col gap-[32px]">
                {data.highlights.map((h) => <Visual key={h} visual={{ caption: h }} />)}
              </div>
            </Section>
          );
        })()}

        {/* OUTCOME */}
        <Section id="outcome" num="05" title="OUTCOME">
          <dl className="m-0 flex flex-col">
            {data.outcome.stats.map(([n, c]) => (
              <div key={c} className={`grid grid-cols-1 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] gap-x-[32px] gap-y-[8px] py-[20px] border-t border-[rgba(237,28,36,0.4)] last:border-b items-baseline`}>
                <dt className="text-[#ed1c24] break-words" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(18px,2.4vw,28px)", lineHeight: 1.4 }}>{n}</dt>
                <dd className="m-0 text-[#b7b9be]" style={{ fontFamily: BODY, fontSize: "16px", lineHeight: 1.55 }}>{c}</dd>
              </div>
            ))}
          </dl>
          <Prose text={data.outcome.reflection} />
        </Section>

        {/* NEXT */}
        {(() => {
          const currentIdx = BLOCKS.findIndex(b => b.id === id);
          if (currentIdx === -1) return null;
          const nextBlock = BLOCKS[(currentIdx + 1) % BLOCKS.length];
          return (
            <div
              role="button"
              tabIndex={0}
              onClick={() => onOpen(nextBlock.id)}
              className="group cursor-pointer text-left w-full rounded-[22px] bg-[#141416] overflow-hidden flex flex-col md:flex-row items-stretch border border-[rgba(244,242,240,0.08)] hover:border-[#ed1c24] transition-colors duration-300"
            >
              <div className="flex-1 p-[36px] flex flex-col justify-center gap-[12px] relative z-10">
                <span className="text-[#ed1c24] tracking-[2px]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "11px" }}>NEXT CASE STUDY →</span>
                <PixelText text={nextBlock.title} className="text-[#f4f2f0] leading-[1.4]" style={{ fontSize: "clamp(18px,2.6vw,34px)" }} />
                <span className="text-[#9a9ca1]" style={{ fontFamily: BODY, fontSize: "15px" }}>{nextBlock.desc}</span>
              </div>
              <div className="md:w-[45%] min-h-[220px] relative overflow-hidden bg-[#101013]">
                <ImageWithFallback src={nextBlock.cover} alt={nextBlock.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#141416] via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { PixelText } from "./PixelText";
import { CASES, type CaseData, type Option, type JourneyGroup } from "./caseData";
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

function MetaCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#141416] rounded-[16px] p-[20px] flex flex-col gap-[8px]">
      <span className="text-[#ed1c24] tracking-[1.5px]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "10px" }}>{label}</span>
      <span className="text-[#f4f2f0]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "12px", lineHeight: 1.4 }}>{value}</span>
    </div>
  );
}

function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[#9a9ca1] ${className}`} style={{ fontFamily: BODY, fontSize: "16px", lineHeight: 1.6 }}>
      {children}
    </p>
  );
}

function tagClasses(kind: Option["tag"]["kind"]) {
  return kind === "shipped"
    ? "text-[#ed1c24] border border-[rgba(237,28,36,0.5)]"
    : "text-[#9a9ca1] border border-[rgba(244,242,240,0.14)]";
}

function OptionCard({ opt }: { opt: Option }) {
  return (
    <div
      className={`group flex-1 rounded-[18px] p-[24px] flex flex-col gap-[16px] transition-colors duration-150 hover:bg-[#ed1c24] ${
        opt.highlight ? "border border-[rgba(237,28,36,0.55)] bg-[#141416]" : "bg-[#101013]"
      }`}
    >
      <div className="flex items-center justify-between gap-[10px]">
        <span className="text-[#f4f2f0] tracking-[1.5px] group-hover:text-[#0a0a0b] transition-colors" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "12px" }}>
          {opt.version}
        </span>
        <span
          className={`group-hover:opacity-0 transition-opacity inline-block rounded-[6px] px-[8px] py-[4px] tracking-[1.5px] ${tagClasses(opt.tag.kind)}`}
          style={{ fontFamily: MONO, fontWeight: 600, fontSize: "9px" }}
        >
          {opt.tag.text}
        </span>
      </div>
      <p className="text-[#9a9ca1] group-hover:text-[#0a0a0b] transition-colors" style={{ fontFamily: BODY, fontSize: "15px", lineHeight: 1.55 }}>
        {opt.body}
      </p>
    </div>
  );
}

function TheCall({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[18px] border border-[rgba(237,28,36,0.4)] bg-[#0a0a0b] p-[28px] flex flex-col gap-[12px]">
      <span className="text-[#ed1c24] tracking-[2px]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "10px" }}>THE CALL</span>
      <p className="text-[#f4f2f0]" style={{ fontFamily: BODY, fontSize: "17px", lineHeight: 1.55 }}>{children}</p>
    </div>
  );
}

function ImgPanel({ caption, className = "" }: { caption: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[16px] bg-[#141416] border border-[rgba(244,242,240,0.08)] min-h-[200px] flex items-end ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[#4a4a4e] tracking-[2px]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "10px" }}>IMAGE</span>
      </div>
      <span className="relative m-[14px] text-[#9a9ca1] tracking-[1px] bg-[#0a0a0b]/70 backdrop-blur rounded-[6px] px-[10px] py-[5px]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "10px" }}>
        {caption}
      </span>
    </div>
  );
}

function JourneyBlock({ g }: { g: JourneyGroup }) {
  return (
    <div className="flex flex-col gap-[20px]">
      <span className="text-[#9a9ca1] tracking-[2px]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "11px" }}>{g.label}</span>
      {g.intro && <Body className="max-w-[820px]">{g.intro}</Body>}
      {g.placeholder ? (
        <div className="rounded-[18px] border border-dashed border-[rgba(244,242,240,0.18)] bg-[#101013] p-[28px] flex flex-col gap-[10px]">
          <span className="text-[#9a9ca1] tracking-[2px]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "10px" }}>PLACEHOLDER</span>
          <Body>{g.note}</Body>
        </div>
      ) : g.options ? (
        <div className="flex flex-col md:flex-row gap-[16px]">
          {g.options.map((o) => <OptionCard key={o.version} opt={o} />)}
        </div>
      ) : g.note ? (
        <div className="rounded-[18px] bg-[#101013] p-[24px]">
          <Body>{g.note}</Body>
        </div>
      ) : null}
      {g.outro && <Body className="max-w-[820px] italic">{g.outro}</Body>}
      {g.call && <TheCall>{g.call}</TheCall>}
    </div>
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
      <div className="sticky top-0 z-20 bg-[#0a0a0b]/95 backdrop-blur border-b border-[rgba(244,242,240,0.1)] px-[24px] py-[16px] flex items-center justify-between">
        <nav className="flex items-center gap-[8px]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "11px", letterSpacing: "1.5px" }}>
          <button onClick={onClose} className="text-[#9a9ca1] hover:text-[#f4f2f0] transition-colors">WORK</button>
          <span className="text-[#4a4a4e]">/</span>
          <span className="text-[#ed1c24]">{data.title}</span>
        </nav>
        <button
          onClick={onClose}
          className="text-[#f4f2f0] border border-[rgba(244,242,240,0.2)] rounded-[12px] px-[16px] py-[8px] hover:bg-[#ed1c24] hover:text-[#0a0a0b] hover:border-[#ed1c24] transition-colors"
          style={{ fontFamily: MONO, fontWeight: 600, fontSize: "11px", letterSpacing: "1.5px" }}
        >
          ← BACK TO WORK
        </button>
      </div>

      {/* Scroll progress bar */}
      <div className="sticky top-[57px] z-20 h-[3px] bg-[#141416]">
        <div className="h-full bg-[#ed1c24] transition-[width] duration-75 ease-linear" style={{ width: `${progress * 100}%` }} />
      </div>

      {/* Chapter nav */}
      <div className="sticky top-[60px] z-10 bg-[#0a0a0b]/95 backdrop-blur border-b border-[rgba(244,242,240,0.08)] px-[24px] py-[12px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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

      <div className="max-w-[1120px] mx-auto px-[24px] py-[48px] flex flex-col gap-[24px]">
        {/* HERO bento */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-[16px] auto-rows-[minmax(0,auto)]">
          <div className="bg-[#141416] rounded-[22px] p-[32px] flex flex-col justify-between gap-[24px] lg:col-span-2 min-h-[300px]">
            <div className="flex items-center gap-[12px] flex-wrap">
              <span className="text-[#ed1c24] tracking-[2px]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "11px" }}>
                CASE STUDY · {data.index}
              </span>
              {data.badge && (
                <span className="inline-flex items-center gap-[6px] text-[#0a0a0b] bg-[#ed1c24] rounded-[6px] px-[8px] py-[4px] tracking-[1.5px]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "9px" }}>
                  <span className="size-[6px] rounded-full bg-[#0a0a0b] animate-pulse" />
                  {data.badge}
                </span>
              )}
            </div>
            <PixelText
              text={data.title}
              className="block text-[#f4f2f0] leading-[1.4] break-words [overflow-wrap:anywhere] max-w-full"
              style={{ fontSize: "clamp(24px,4vw,52px)" }}
            />
            <Body className="max-w-[560px]">{data.oneLiner}</Body>
          </div>
          {(() => {
            const block = BLOCKS.find((b) => b.id === id);
            return block ? (
              <div className="lg:col-span-1 min-h-[300px] rounded-[22px] overflow-hidden relative border border-[rgba(244,242,240,0.08)]">
                <ImageWithFallback src={block.cover} alt={data.title} className="w-full h-full object-cover" />
              </div>
            ) : (
              <ImgPanel caption="HERO" className="lg:col-span-1 min-h-[300px] rounded-[22px]" />
            );
          })()}

          <MetaCard label={data.metaLabels?.role ?? "ROLE"} value={data.meta.role} />
          <MetaCard label={data.metaLabels?.scope ?? "SCOPE"} value={data.meta.scope} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] lg:col-span-1">
            <MetaCard label={data.metaLabels?.team ?? "TEAM"} value={data.meta.team} />
            <MetaCard label={data.metaLabels?.focus ?? "FOCUS"} value={data.meta.focus} />
          </div>
        </section>

        {/* CONTEXT + CHALLENGE bento */}
        <section id="context" className="scroll-mt-[130px] grid grid-cols-1 lg:grid-cols-3 gap-[16px]">
          <div className="bg-[#141416] rounded-[22px] p-[28px] flex flex-col gap-[16px] lg:col-span-3">
            <ScrambleHeader text="CONTEXT" />
            <Body className="max-w-[760px]">{data.context}</Body>
          </div>
        </section>

        <section id="challenge" className="scroll-mt-[130px] flex flex-col gap-[16px]">
          {data.challenge ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-[16px] items-stretch">
                <div className="bg-[#141416] rounded-[22px] p-[28px] flex flex-col gap-[16px] lg:col-span-2">
                  <ScrambleHeader text="THE CHALLENGE" />
                  <Body>{data.challenge.body}</Body>
                </div>
                <div className="rounded-[22px] border border-[rgba(237,28,36,0.4)] bg-[#0a0a0b] p-[24px] flex flex-col gap-[14px]">
                  <span className="text-[#ed1c24] tracking-[2px]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "10px" }}>AT A GLANCE</span>
                  {data.challenge.glance.map(([l, v]) => (
                    <div key={l} className="flex flex-col gap-[4px] border-t border-[rgba(244,242,240,0.08)] pt-[12px]">
                      <span className="text-[#ed1c24] tracking-[1.5px]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "9px" }}>{l}</span>
                      <span className="text-[#f4f2f0]" style={{ fontFamily: BODY, fontSize: "14px", lineHeight: 1.4 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              {data.challenge.bet && (
                <div className="rounded-[22px] bg-[#141416] p-[28px] flex flex-col gap-[12px]">
                  <span className="text-[#ed1c24] tracking-[2px]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "10px" }}>{data.challenge.betLabel ?? "THE BET"}</span>
                  <p className="text-[#f4f2f0] italic" style={{ fontFamily: BODY, fontSize: "19px", lineHeight: 1.5 }}>{data.challenge.bet}</p>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-[22px] border border-dashed border-[rgba(244,242,240,0.18)] bg-[#101013] p-[28px] flex flex-col gap-[12px]">
              <ScrambleHeader text="THE CHALLENGE" />
              <span className="text-[#9a9ca1] tracking-[2px]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "10px" }}>PLACEHOLDER</span>
              <Body>Challenge narrative for this case study is being written up.</Body>
            </div>
          )}
        </section>

        {/* JOURNEY */}
        <section id="journey" className="scroll-mt-[130px] bg-[#141416] rounded-[22px] p-[28px] flex flex-col gap-[36px]">
          <ScrambleHeader text="THE JOURNEY" color="#ed1c24" />
          {data.journey.map((g) => <JourneyBlock key={g.label} g={g} />)}
        </section>

        {/* HIGHLIGHTS bento */}
        {(() => {
          const isEHR = BLOCKS.find((b) => b.id === id)?.kind === "ehr";
          if (isEHR) {
            return (
              <section id="highlights" className="scroll-mt-[130px] flex flex-col gap-[16px]">
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#ed1c24] rounded-[22px] p-[48px] flex flex-col items-center justify-center gap-[16px] hover:bg-[#d61920] transition-colors group cursor-pointer text-center"
                >
                  <span className="text-[#0a0a0b] tracking-[2px]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "14px" }}>
                    NDA PROTECTED
                  </span>
                  <h2 className="text-[#0a0a0b]" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(20px,3vw,36px)", lineHeight: 1.4 }}>
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
            <section id="highlights" className="scroll-mt-[130px] flex flex-col gap-[16px]">
              <div className="bg-[#141416] rounded-[22px] p-[28px]">
                <ScrambleHeader text="HIGHLIGHTS" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-[16px] auto-rows-[minmax(200px,auto)]">
                {data.highlights.map((h, i) => (
                  <ImgPanel key={h} caption={h} className={i === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-1"} />
                ))}
              </div>
            </section>
          );
        })()}

        {/* OUTCOME bento */}
        <section id="outcome" className="scroll-mt-[130px] flex flex-col gap-[16px]">
          <div className="bg-[#141416] rounded-[22px] p-[28px] flex flex-col gap-[20px]">
            <ScrambleHeader text="OUTCOME" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[20px]">
              {data.outcome.stats.map(([n, c]) => (
                <div key={c} className="flex flex-col gap-[8px] border-t border-[rgba(237,28,36,0.4)] pt-[16px]">
                  <span className="text-[#ed1c24]" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(16px,2.2vw,26px)", lineHeight: 1.3 }}>{n}</span>
                  <span className="text-[#9a9ca1]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "11px", letterSpacing: "1px" }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
          {data.outcome.reflection && (
            <div className="bg-[#101013] rounded-[22px] p-[28px]">
              <Body className="max-w-[820px]">{data.outcome.reflection}</Body>
            </div>
          )}
        </section>

        {/* NEXT */}
        {data.next && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpen(data.next!.id);
            }}
            className="group text-left w-full rounded-[22px] bg-[#141416] p-[36px] flex flex-col gap-[10px] hover:bg-[#ed1c24] transition-colors duration-150"
          >
            <span className="text-[#ed1c24] group-hover:text-[#0a0a0b] tracking-[2px] transition-colors" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "11px" }}>NEXT →</span>
            <PixelText text={data.next.title} className="text-[#f4f2f0] group-hover:text-[#0a0a0b] leading-[1.4]" style={{ fontSize: "clamp(18px,2.6vw,34px)" }} />
            <span className="text-[#9a9ca1] group-hover:text-[#0a0a0b] transition-colors" style={{ fontFamily: BODY, fontSize: "15px" }}>{data.next.oneLiner}</span>
          </button>
        )}
      </div>
    </div>
  );
}

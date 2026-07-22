import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import img2 from "../../imports/image-2.png";
import img3 from "../../imports/image-3.png";
import img4 from "../../imports/image-4.png";
import img5 from "../../imports/image-5.png";
import img6 from "../../imports/image-6.png";
import img7 from "../../imports/image-7.png";
import img8 from "../../imports/image-8.png";

const MONO = "'JetBrains Mono', monospace";
const PIXEL = "'Press Start 2P', monospace";

type Kind = "category" | "ehr" | "solo";

type Block = {
  id: string;
  title: string;
  titleRed?: string;
  desc: string;
  chip: string;
  cover: string;
  kind: Kind;
  eyebrow: string;
};

export const BLOCKS: Block[] = [
  // ── EHR products ──
  { id: "sunoh", kind: "ehr", eyebrow: "EHR", title: "AI SCRIBE APP", desc: "The AI scribe that turns a patient conversation into a ready-to-sign note.", chip: "40% LESS DOCUMENTATION TIME", cover: img2 },
  { id: "smart", kind: "ehr", eyebrow: "EHR", title: "SMART UNIVERSITY", desc: "A giant learning library you can simply ask.", chip: "4,891 USERS IN 2 WEEKS", cover: img4 },
  { id: "mobile", kind: "ehr", eyebrow: "EHR", title: "EHR MOBILE APP", desc: "A legacy clinical app, rebuilt for how care actually moves.", chip: "3 PATTERNS → 1", cover: img3 },
  { id: "wound", kind: "ehr", eyebrow: "EHR", title: "WOUND CARE", desc: "Wound documentation finally got a home — desktop to point-of-care.", chip: "12 STEPS → 1 MODULE", cover: img8 },
  // ── Independent work (distinct) ──
  { id: "satya", kind: "solo", eyebrow: "INDEPENDENT", title: "SATYANETRA", desc: "An intelligence platform for verifying what's real.", chip: "ENTIRE MVP, END TO END", cover: img5 },
  { id: "hack", kind: "solo", eyebrow: "INDEPENDENT", title: "HACKELITE", desc: "Broken UX to conversion-first, designed and shipped solo.", chip: "DESIGN → LIVE", cover: img7 },
  { id: "xspaces", kind: "solo", eyebrow: "INDEPENDENT · ONGOING", title: "XSPACES", desc: "An AI-powered real-estate SaaS, built from scratch — ongoing.", chip: "ONGOING · 0→1", cover: img6 },
];

function Card({ block, onOpen }: { block: Block; onOpen?: () => void }) {
  const isCategory = block.kind === "category";
  const isSolo = block.kind === "solo";

  // per-kind accents
  const accent = isSolo ? "#00e5ff" : "#ed1c24";
  let shell = isCategory
    ? "bg-[#141416] border-[3px] border-[#ed1c24] shadow-[0_0_50px_rgba(237,28,36,0.18)]"
    : isSolo
      ? "bg-[#141416] border border-[rgba(0,229,255,0.35)]"
      : "bg-[#141416] border border-white/5";

  if (block.id === "xspaces") {
    shell = "bg-[#141416] border-2 border-dashed border-green-500";
  }

  return (
    <article
      className={`group snap-start shrink-0 w-[560px] max-w-[85vw] h-[640px] rounded-[22px] overflow-hidden flex flex-col ${shell}`}
    >
      {/* Cover — hero of the card (~68%) */}
      <div className="relative h-[68%] overflow-hidden">
        <ImageWithFallback
          src={block.cover}
          alt={`${block.title} cover`}
          className={`size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${isSolo ? "grayscale-[0.15]" : ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-transparent opacity-80" />
        <div
          className="absolute inset-0 transition-colors duration-500 motion-reduce:transition-none"
          style={{ backgroundColor: "transparent" }}
        />
        {/* eyebrow — shows the grouping / distinction */}
        <span
          className="absolute top-[20px] left-[20px] text-[9px] tracking-[2px] bg-[#0a0a0b]/70 backdrop-blur rounded-[6px] px-[10px] py-[5px]"
          style={{ fontFamily: MONO, fontWeight: 600, color: isSolo ? accent : "#f4f2f0" }}
        >
          {block.eyebrow}
        </span>
        {/* metric chip */}
        <span
          className="absolute bottom-[20px] left-[20px] text-[#f4f2f0] text-[9.5px] tracking-[1.5px] bg-[#0a0a0b]/70 backdrop-blur rounded-[6px] px-[10px] py-[5px]"
          style={{ fontFamily: MONO, fontWeight: 600 }}
        >
          {block.chip}
        </span>
      </div>

      {/* Text below */}
      <div className="flex flex-col gap-[14px] p-[28px] flex-1 justify-between">
        <div className="flex flex-col gap-[4px]">
          <p className="text-[#f4f2f0]" style={{ fontFamily: PIXEL, fontSize: "22px", lineHeight: 1.4 }}>
            {block.title}
          </p>
          {block.titleRed && (
            <p style={{ fontFamily: PIXEL, fontSize: "22px", lineHeight: 1.4, color: "#ed1c24" }}>
              {block.titleRed}
            </p>
          )}
        </div>
        <p className="text-[#9a9ca1] text-[14px]" style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.5 }}>
          {block.desc}
        </p>
        <button
          onClick={onOpen}
          className="self-start text-[10px] tracking-[1.5px] transition-colors text-[#f4f2f0]"
          style={{ fontFamily: MONO, fontWeight: 600 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#f4f2f0")}
        >
          {isCategory ? "EXPLORE THE 4 →" : "READ CASE STUDY →"}
        </button>
      </div>
    </article>
  );
}

function findScrollParent(el: HTMLElement | null): HTMLElement | Window {
  let node = el?.parentElement;
  while (node) {
    const oy = getComputedStyle(node).overflowY;
    if ((oy === "auto" || oy === "scroll") && node.scrollHeight > node.clientHeight) {
      return node;
    }
    node = node.parentElement;
  }
  return window;
}

function Divider() {
  return (
    <div className="snap-start shrink-0 self-center flex flex-col items-center gap-[10px] px-[8px]">
      <div className="w-px h-[220px] bg-white/10" />
      <span
        className="text-[#9a9ca1] text-[9px] tracking-[2px] [writing-mode:vertical-rl] rotate-180"
        style={{ fontFamily: MONO, fontWeight: 600 }}
      >
        INDEPENDENT WORK
      </span>
      <div className="w-px h-[220px] bg-white/10" />
    </div>
  );
}

function Track({
  trackRef,
  style,
  onOpenCase,
}: {
  trackRef?: React.Ref<HTMLDivElement>;
  style?: React.CSSProperties;
  onOpenCase?: (id: string) => void;
}) {
  return (
    <div
      ref={trackRef}
      className="flex gap-[24px] px-[28px] will-change-transform items-stretch"
      style={style}
    >
      {BLOCKS.map((b, i) => (
        <div key={b.id} className="flex gap-[24px] items-stretch">
          {b.kind === "solo" && BLOCKS[i - 1]?.kind !== "solo" && <Divider />}
          <Card block={b} onOpen={onOpenCase ? () => onOpenCase(b.id) : undefined} />
        </div>
      ))}
    </div>
  );
}

function Header({ idx }: { idx: number }) {
  return (
    <div className="flex items-end justify-between px-[28px]">
      <p className="text-[#f4f2f0]" style={{ fontFamily: PIXEL, fontSize: "clamp(18px,2vw,28px)" }}>
        WORK
      </p>
      <p className="text-[#9a9ca1] text-[11px] tracking-[1.5px]" style={{ fontFamily: MONO, fontWeight: 600 }}>
        {String(idx).padStart(2, "0")} / {String(BLOCKS.length).padStart(2, "0")}
      </p>
    </div>
  );
}

function MobileWork({ onOpenCase }: { onOpenCase?: (id: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(1);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / BLOCKS.length;
    const idx = Math.min(BLOCKS.length, Math.floor(el.scrollLeft / cardWidth) + 1);
    setActiveIdx(idx);
  };

  return (
    <section id="work" className="bg-[#101013] rounded-[22px] py-[44px] flex flex-col gap-[28px]">
      <Header idx={activeIdx} />
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="overflow-x-auto snap-x snap-mandatory scroll-smooth motion-reduce:scroll-auto pb-[8px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <Track onOpenCase={onOpenCase} />
      </div>
    </section>
  );
}

export function Work({ onOpenCase }: { onOpenCase?: (id: string) => void }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [pin, setPin] = useState(true); // desktop pinned mode
  const [maxScroll, setMaxScroll] = useState(0); // horizontal distance to travel
  const [progress, setProgress] = useState(0);

  // Decide pinned vs. fallback (mobile / reduced motion)
  useLayoutEffect(() => {
    const decide = () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const narrow = window.innerWidth < 820;
      setPin(!reduce && !narrow);
    };
    decide();
    window.addEventListener("resize", decide);
    return () => window.removeEventListener("resize", decide);
  }, []);

  // Measure how far the track needs to translate horizontally
  useLayoutEffect(() => {
    if (!pin) return;
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const viewport = track.parentElement?.clientWidth ?? window.innerWidth;
      const distance = Math.max(0, track.scrollWidth - viewport);
      setMaxScroll(distance);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pin]);

  // Drive horizontal progress from vertical scroll while pinned
  useEffect(() => {
    if (!pin) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const scroller = findScrollParent(wrapper);

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      setProgress(p);
    };
    onScroll();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pin, maxScroll]);

  const activeIdx = Math.min(BLOCKS.length, Math.floor(progress * BLOCKS.length) + 1);

  // -------- Fallback: simple side-scroll strip (mobile / reduced motion) --------
  if (!pin) {
    return <MobileWork onOpenCase={onOpenCase} />;
  }

  // -------- Pinned horizontal scroll (desktop) --------
  return (
    <section id="work">
      {/* Tall wrapper: its height defines how long the section stays pinned */}
      <div ref={wrapperRef} style={{ height: `calc(100vh + ${maxScroll}px)` }}>
        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen overflow-hidden bg-[#101013] rounded-[22px] flex flex-col justify-center gap-[28px] py-[32px]">
          <Header idx={activeIdx} />

          <div className="overflow-hidden">
            <Track
              trackRef={trackRef}
              style={{ transform: `translate3d(${-progress * maxScroll}px,0,0)` }}
              onOpenCase={onOpenCase}
            />
          </div>

          {/* progress trace */}
          <div className="px-[28px]">
            <svg className="w-full h-[24px]" viewBox="0 0 800 24" preserveAspectRatio="none" fill="none">
              <path d="M0 12 H800" stroke="#ED1C24" strokeWidth="1" strokeOpacity="0.2" />
              <path d={`M0 12 H${800 * progress}`} stroke="#ED1C24" strokeWidth="2" strokeOpacity="0.9" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

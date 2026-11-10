import { useEffect, useRef, useState } from "react";
import { PixelText } from "./PixelText";
import { EXPLORATIONS, explorationAsset, type Exploration } from "./explorationsData";

const MONO = "'JetBrains Mono', monospace";
const PIXEL = "'Press Start 2P', monospace";

export function useMedia(query: string) {
  const [match, setMatch] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

function Card({ item, onOpen }: { item: Exploration; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reduce = useMedia("(prefers-reduced-motion: reduce)");
  const canHover = useMedia("(hover: hover) and (pointer: fine)");

  // play while hovered/focused (desktop) or while mostly on screen (touch)
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (active && !reduce) v.play().catch(() => {});
    else v.pause();
  }, [active, reduce]);

  useEffect(() => {
    if (canHover) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.6 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [canHover]);

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 7, y: px * 9 });
  };

  const lifted = active && canHover && !reduce;

  return (
    <button
      ref={ref}
      onClick={onOpen}
      onMouseEnter={() => canHover && setActive(true)}
      onMouseLeave={() => { if (canHover) setActive(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={onMove}
      onFocus={() => setActive(true)}
      onBlur={() => canHover && setActive(false)}
      aria-label={`Open ${item.title}, ${item.kind.toLowerCase()}`}
      className="group relative text-left bg-[#141416] rounded-[16px] p-[12px] flex flex-col gap-[16px] outline-none focus-visible:ring-2 focus-visible:ring-[#f4f2f0]/60"
      style={{
        zIndex: lifted ? 10 : 0,
        transform: lifted
          ? `perspective(900px) translateY(-10px) scale(1.04) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : "perspective(900px) translateY(0) scale(1)",
        boxShadow: lifted
          ? `0 34px 80px -24px ${item.accent}88, 0 0 0 1px ${item.accent}66`
          : "0 0 0 1px rgba(244,242,240,0.05)",
        transition: "transform 0.28s cubic-bezier(.2,.8,.2,1), box-shadow 0.28s ease",
      }}
    >
      <div className="relative aspect-video rounded-[10px] overflow-hidden bg-black">
        <img
          src={explorationAsset(item.slug, "poster.jpg")}
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <video
          ref={video}
          src={explorationAsset(item.slug, "preview.mp4")}
          muted
          loop
          playsInline
          preload="none"
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="absolute inset-0 size-full object-cover transition-opacity duration-300"
          style={{ opacity: playing ? 1 : 0 }}
        />
        <span
          className="absolute top-[10px] left-[10px] rounded-[6px] bg-[#0a0a0b]/70 backdrop-blur px-[8px] py-[5px] text-[#f4f2f0] text-[9px] tracking-[1.5px] flex items-center gap-[6px]"
          style={{ fontFamily: MONO, fontWeight: 600 }}
        >
          <span
            className="size-[6px] rounded-full"
            style={{ background: playing ? item.accent : "#9a9ca1", boxShadow: playing ? `0 0 8px ${item.accent}` : "none" }}
          />
          {playing ? "PLAYING" : canHover ? "HOVER TO PLAY" : "LOOP"}
        </span>
        <span
          className="absolute bottom-[10px] right-[10px] rounded-[6px] bg-[#f4f2f0] text-[#0a0a0b] px-[10px] py-[6px] text-[10px] tracking-[1.5px] transition-all duration-300 opacity-0 translate-y-[4px] group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0"
          style={{ fontFamily: MONO, fontWeight: 600 }}
        >
          OPEN ↗
        </span>
      </div>

      <div className="flex flex-col gap-[10px] px-[4px] pb-[4px]">
        <div className="flex items-center justify-between gap-[12px]">
          <span className="text-[#f4f2f0] text-[13px] leading-[1.4]" style={{ fontFamily: PIXEL }}>
            {item.title.toUpperCase()}
          </span>
          <span className="text-[#9a9ca1] text-[9.5px] tracking-[1.5px] shrink-0" style={{ fontFamily: MONO, fontWeight: 600 }}>
            {item.year}
          </span>
        </div>
        <span className="text-[9.5px] tracking-[1.5px]" style={{ fontFamily: MONO, fontWeight: 600, color: item.accent }}>
          {item.kind} · {item.songs.length} TRACKS
        </span>
        <p className="text-[#9a9ca1] text-[14px]" style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.55 }}>
          {item.blurb}
        </p>
      </div>
    </button>
  );
}

export function Explorations({ onOpen }: { onOpen: (slug: string) => void }) {
  return (
    <section id="explorations" className="scroll-mt-[84px] md:scroll-mt-[20px] bg-[#101013] rounded-[22px] px-[28px] py-[44px] flex flex-col gap-[28px]">
      <PixelText text="EXPLORATIONS" className="text-[#f4f2f0]" style={{ fontSize: "clamp(20px,2.6vw,36px)" }} />
      <p className="text-[#9a9ca1] text-[15px] max-w-[560px]" style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
        Things I make out of curiosity, not briefs. First up: audio visualizers. Each one is a
        30-second loop made to run alongside whatever you're listening to, with a few tracks I'd pair it with.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
        {EXPLORATIONS.map((it) => (
          <Card key={it.slug} item={it} onOpen={() => onOpen(it.slug)} />
        ))}
      </div>
    </section>
  );
}

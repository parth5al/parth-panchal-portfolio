import { useEffect, useRef, useState } from "react";
import { PixelText } from "./PixelText";
import { PortraitTile } from "./PortraitTile";

const MONO = "'JetBrains Mono', monospace";

function Chip({ text }: { text: string }) {
  return (
    <span
      className="inline-block text-[#ed1c24] text-[10px] tracking-[1.5px] border border-[rgba(237,28,36,0.4)] rounded-[6px] px-[10px] py-[5px]"
      style={{ fontFamily: MONO, fontWeight: 600 }}
    >
      {text}
    </span>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-t border-[rgba(244,242,240,0.08)] py-[12px]">
      <span
        className="text-[#9a9ca1] text-[10px] tracking-[1.5px]"
        style={{ fontFamily: MONO, fontWeight: 600 }}
      >
        {label}
      </span>
      <span
        className="text-[#f4f2f0] text-[10px] tracking-[1.5px] text-right"
        style={{ fontFamily: MONO, fontWeight: 600 }}
      >
        {value}
      </span>
    </div>
  );
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export function About({ onOpenAbout }: { onOpenAbout?: () => void }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  const cardBase =
    "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:translate-x-0 motion-reduce:opacity-100";

  return (
    <section
      id="about"
      ref={ref}
      className="grid grid-cols-1 min-[820px]:grid-cols-2 gap-[20px] items-stretch w-full"
    >
      {/* Left card — bio */}
      <div
        className={`bg-[#141416] flex flex-col justify-between overflow-clip rounded-[22px] flex-1 min-h-[640px] ${cardBase} ${
          inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-[60px]"
        }`}
      >
        <div className="flex flex-col gap-[36px] items-start px-[24px] py-[44px]">
          <Chip text="ABOUT" />
          <div className="flex flex-col gap-[10px]">
            <PixelText text="DESIGNS BY" className="text-[#f4f2f0] leading-[1.4]" style={{ fontSize: "clamp(20px, 2.4vw, 34px)" }} />
            <PixelText text="DAY, DEBUGS" className="text-[#f4f2f0] leading-[1.4]" style={{ fontSize: "clamp(20px, 2.4vw, 34px)" }} />
            <PixelText text="LIFE BY NIGHT." className="text-[#ed1c24] leading-[1.4]" style={{ fontSize: "clamp(20px, 2.4vw, 34px)" }} />
          </div>
          <p
            className="text-[#9a9ca1] text-[16px] max-w-[520px]"
            style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}
          >
            Hi, I'm Parth Panchal — a product designer who wandered into the
            scariest room in software (healthcare), liked the pressure, and
            stayed. At eClinicalWorks I sweat the pixels for hundreds of
            thousands of clinicians, herd a team of designers, and quietly wire
            up AI pipelines so quality doesn't ghost us after launch. Powered by
            chai, curiosity, and an unhealthy love for tidy edge cases.
          </p>

          <div className="w-full">
            <DetailRow label="ROLE" value="SENIOR PRODUCT DESIGNER" />
            <DetailRow label="FOCUS" value="HEALTHCARE · AI" />
            <DetailRow label="COMPANY" value="ECLINICALWORKS" />
            <DetailRow label="BASED IN" value="AHMEDABAD, INDIA" />
          </div>

          <button onClick={onOpenAbout} className="bg-[#0a0a0b] h-[48px] rounded-[24px] px-[28px] hover:bg-[#1d1d20] transition-colors">
            <span
              className="text-[#f4f2f0] text-[11px] tracking-[1.5px] whitespace-nowrap"
              style={{ fontFamily: MONO, fontWeight: 600 }}
            >
              MORE ABOUT ME ↗
            </span>
          </button>
        </div>
        <div className="bg-[#d82727] w-full overflow-hidden py-[18px]">
          <div className="flex w-max about-marquee">
            {[0, 1].map((n) => (
              <p
                key={n}
                aria-hidden={n === 1}
                className="text-[#f4f2f0] whitespace-nowrap pr-[48px]"
                style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(28px, 5vw, 72px)" }}
              >
                ETHICS BECOME AESTHETICS
              </p>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes aboutMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .about-marquee { animation: aboutMarquee 18s linear infinite; }
          @media (prefers-reduced-motion: reduce) { .about-marquee { animation: none; } }
        `}</style>
      </div>

      {/* Right card — full-bleed portrait with animated shader (staggered) */}
      <div
        className={`relative bg-[#141416] overflow-hidden rounded-[22px] flex-1 min-h-[640px] ${cardBase} ${
          inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[60px]"
        }`}
        style={{ transitionDelay: inView ? "180ms" : "0ms" }}
      >
        <PortraitTile />
      </div>
    </section>
  );
}

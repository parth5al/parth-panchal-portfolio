import { PixelText } from "./PixelText";

const MONO = "'JetBrains Mono', monospace";

export function Contact() {
  return (
    <section id="contact" className="bg-[#101013] rounded-[22px] px-[28px] py-[64px] flex flex-col gap-[32px] items-start">
      <PixelText text="LET'S TALK" className="text-[#f4f2f0]" style={{ fontSize: "clamp(20px,2.6vw,36px)" }} />
      <a
        href="mailto:hello@parth5al.work"
        className="text-[#ed1c24] break-all"
        style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(16px,2.4vw,34px)", lineHeight: 1.4 }}
      >
        hello@parth5al.work
      </a>
      <div className="flex flex-wrap gap-[16px] text-[#9a9ca1] text-[11px] tracking-[1.5px]" style={{ fontFamily: MONO, fontWeight: 600 }}>
        <a href="#" className="hover:text-[#f4f2f0] transition-colors">LINKEDIN ↗</a>
        <span>·</span>
        <a href="#" className="hover:text-[#f4f2f0] transition-colors">INSTAGRAM ↗</a>
        <span>·</span>
        <a href="#" className="hover:text-[#f4f2f0] transition-colors">RESUME ↓</a>
      </div>
      <button className="bg-[#ed1c24] rounded-[24px] px-[32px] py-[14px] hover:bg-[#ff2a33] transition-colors">
        <span className="text-[#0a0a0b] text-[11px] tracking-[1.5px]" style={{ fontFamily: MONO, fontWeight: 600 }}>
          GET IN TOUCH ↗
        </span>
      </button>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#ed1c24] rounded-[22px] px-[28px] py-[72px] flex flex-col gap-[28px] items-center text-center">
      <div className="flex flex-col gap-[8px] items-center">
        <p className="text-[#0a0a0b]" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(24px,5vw,72px)", lineHeight: 1.3 }}>
          DESIGN IS LIFE
        </p>
        <p className="text-[#f4f2f0]" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(24px,5vw,72px)", lineHeight: 1.3 }}>
          AND VICE VERSA
        </p>
      </div>
      <p className="text-[#0a0a0b] text-[11px] tracking-[2px]" style={{ fontFamily: MONO, fontWeight: 600 }}>
        LET'S GET YOUR IDEA A LIFE
      </p>
      <button className="bg-[#0a0a0b] rounded-[24px] px-[32px] py-[14px] hover:bg-[#1d1d20] transition-colors">
        <span className="text-[#f4f2f0] text-[11px] tracking-[1.5px]" style={{ fontFamily: MONO, fontWeight: 600 }}>
          GET IN TOUCH
        </span>
      </button>
      <p className="text-[#0a0a0b] text-[9.5px] tracking-[1.5px] opacity-70" style={{ fontFamily: MONO, fontWeight: 600 }}>
        © PARTH PANCHAL · FEBRUARY 2026 · AHMEDABAD, INDIA
      </p>
    </footer>
  );
}

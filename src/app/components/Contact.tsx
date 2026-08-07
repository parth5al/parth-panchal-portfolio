import { PixelText } from "./PixelText";

const MONO = "'JetBrains Mono', monospace";

const MAILTO_LINK = "mailto:Parth.designdevil@gmail.com?subject=Project%20Inquiry&body=Hi%20Parth%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20potential%20project%20with%20you.%0A%0AProject%20Details%3A%0A-%5BBrief%20description%20of%20your%20project%5D%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D";


export function Contact() {
  return (
    <section id="contact" className="bg-[#101013] rounded-[22px] px-[28px] py-[64px] flex flex-col gap-[32px] items-start">
      <PixelText text="LET'S TALK" className="text-[#f4f2f0]" style={{ fontSize: "clamp(20px,2.6vw,36px)" }} />
      <a
        href="mailto:Parth.designdevil@gmail.com"
        className="text-[#ed1c24] break-all"
        style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(16px,2.4vw,34px)", lineHeight: 1.4 }}
      >
        Parth.designdevil@gmail.com
      </a>
      <div className="flex flex-wrap gap-[16px] text-[#9a9ca1] text-[11px] tracking-[1.5px]" style={{ fontFamily: MONO, fontWeight: 600 }}>
        <a href="https://www.linkedin.com/in/parth5al/" target="_blank" rel="noreferrer" className="hover:text-[#f4f2f0] transition-colors">LINKEDIN ↗</a>
        <span>·</span>
        <a href="https://www.x.com/parth5al/" target="_blank" rel="noreferrer" className="hover:text-[#f4f2f0] transition-colors">TWITTER ↗</a>
        <span>·</span>
        <a href="https://www.instagram.com/parth.design/" target="_blank" rel="noreferrer" className="hover:text-[#f4f2f0] transition-colors">INSTAGRAM ↗</a>
        <span>·</span>
        <a href="#" className="hover:text-[#f4f2f0] transition-colors">RESUME ↓</a>
      </div>
      <a href={MAILTO_LINK} className="bg-[#ed1c24] rounded-[24px] px-[32px] py-[14px] hover:bg-[#ff2a33] transition-colors inline-block">
        <span className="text-[#0a0a0b] text-[11px] tracking-[1.5px]" style={{ fontFamily: MONO, fontWeight: 600 }}>
          GET IN TOUCH ↗
        </span>
      </a>
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
      <a href={MAILTO_LINK} className="bg-[#0a0a0b] rounded-[24px] px-[32px] py-[14px] hover:bg-[#1d1d20] transition-colors inline-block">
        <span className="text-[#f4f2f0] text-[11px] tracking-[1.5px]" style={{ fontFamily: MONO, fontWeight: 600 }}>
          GET IN TOUCH
        </span>
      </a>
      <p className="text-[#0a0a0b] text-[9.5px] tracking-[1.5px] opacity-70" style={{ fontFamily: MONO, fontWeight: 600 }}>
        © PARTH PANCHAL · {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase()} · AHMEDABAD, INDIA
      </p>
    </footer>
  );
}

import img1639 from "../../imports/Frame2043683213/568c0ac7b546a93750567c066fb01d0fe5fbe149.png";
import img1641 from "../../imports/Frame2043683213/524880520c258f7c6bbbce3d840bf27c74e5aa3a.png";
import img1645 from "../../imports/Frame2043683213/2649dd309f0c097fe2e2c1cd8b3a9b5cc04b5970.png";
import img1643 from "../../imports/Frame2043683213/57822a2c627baf31c6bb74f6ceacd1c97580a4ac.png";
import img1646 from "../../imports/Frame2043683213/be3339a6a1d4c6329fc61d9f9e3985aa0499a62e.png";
import img1648 from "../../imports/Frame2043683213/7c4f6bf511957998027c784ebc1d4336011add6e.png";
import book1 from "../../imports/Frame2043683213/68250448badb638a5cbac1d8c640f07f10f16e52.png";
import book2 from "../../imports/Frame2043683213/d1564fd56f5649ed5c4326ea31306e05766e3b88.png";
import book3 from "../../imports/Frame2043683213/eab8c5885ad1ddd515964a2999d1e4f1996d31b7.png";
import book4 from "../../imports/Frame2043683213/dd834af2b9ffe933cd7f0b058976184e74bede9f.png";
import book5 from "../../imports/Frame2043683213/b7c69b515657a87610d9911a00cfab5673c9b078.png";
import { PixelText } from "./PixelText";
import { PortraitTile } from "./PortraitTile";

const PIXEL = "'Press Start 2P', monospace";
const MONO = "'JetBrains Mono', monospace";
const BODY = "Inter, sans-serif";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-t border-[rgba(244,242,240,0.08)] py-[12px]">
      <span className="text-[#9a9ca1] tracking-[1.5px]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "10px" }}>
        {label}
      </span>
      <span className="text-[#f4f2f0] tracking-[1.5px] text-right" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "10px" }}>
        {value}
      </span>
    </div>
  );
}

function Chip({ text, active }: { text: string; active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-[8px] rounded-[6px] px-[10px] py-[5px] tracking-[1.5px] whitespace-nowrap ${
        active
          ? "text-[#ed1c24] border border-[rgba(237,28,36,0.4)]"
          : "text-[#9a9ca1] border border-[rgba(244,242,240,0.12)]"
      }`}
      style={{ fontFamily: MONO, fontWeight: 600, fontSize: "10px" }}
    >
      {active && (
        <span className="relative flex size-[7px]">
          <span className="absolute inline-flex size-full rounded-full bg-[#ed1c24] opacity-75 animate-ping" />
          <span className="relative inline-flex size-[7px] rounded-full bg-[#ed1c24]" />
        </span>
      )}
      {text}
    </span>
  );
}

function JobTile({
  company,
  period,
  desc,
  current,
  className = "",
}: {
  company: string;
  period: string;
  desc: string;
  current?: boolean;
  className?: string;
}) {
  return (
    <div className={`bg-[#141416] rounded-[22px] p-[28px] flex flex-col gap-[20px] justify-between ${className}`}>
      <div className="flex flex-col gap-[14px]">
        <div className="flex flex-wrap items-center gap-[14px]">
          <PixelText
            text={company}
            className="text-[#f4f2f0] leading-[1.4]"
            style={{ fontSize: "clamp(16px,1.8vw,26px)" }}
          />
          <Chip text={period} active={current} />
        </div>
      </div>
      <p className="text-[#9a9ca1]" style={{ fontFamily: BODY, fontSize: "15px", lineHeight: 1.6 }}>
        {desc}
      </p>
    </div>
  );
}

function BTile({
  title,
  children,
  className = "",
  extra,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className={`bg-[#141416] rounded-[22px] p-[32px] flex flex-col gap-[24px] justify-between ${className}`}>
      <div className="flex flex-col gap-[20px]">
        <PixelText text={title} className="text-[#f4f2f0] leading-[1.4]" style={{ fontSize: "clamp(20px,2.4vw,34px)" }} />
        <div className="text-[#9a9ca1] flex flex-col gap-[10px]" style={{ fontFamily: BODY, fontSize: "15px", lineHeight: 1.6 }}>
          {children}
        </div>
      </div>
      {extra}
    </div>
  );
}

function ImgCell({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[12px] bg-[#0a0a0b] ${className}`}>
      <img src={src} alt="" className="size-full object-cover" />
    </div>
  );
}

export function AboutPage({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a0b] overflow-y-auto">
      {/* Breadcrumb bar */}
      <div className="sticky top-0 z-10 bg-[#0a0a0b]/95 backdrop-blur border-b border-[rgba(244,242,240,0.1)] px-[24px] py-[16px] flex items-center justify-between">
        <nav className="flex items-center gap-[8px]" style={{ fontFamily: MONO, fontWeight: 600, fontSize: "11px", letterSpacing: "1.5px" }}>
          <button onClick={onClose} className="text-[#9a9ca1] hover:text-[#f4f2f0] transition-colors">
            HOME
          </button>
          <span className="text-[#4a4a4e]">/</span>
          <span className="text-[#ed1c24]">ABOUT ME</span>
        </nav>
        <button
          onClick={onClose}
          className="text-[#f4f2f0] border border-[rgba(244,242,240,0.2)] rounded-[12px] px-[16px] py-[8px] hover:bg-[#ed1c24] hover:text-[#0a0a0b] hover:border-[#ed1c24] transition-colors"
          style={{ fontFamily: MONO, fontWeight: 600, fontSize: "11px", letterSpacing: "1.5px" }}
        >
          ← BACK
        </button>
      </div>

      <div className="max-w-[1440px] mx-auto px-[24px] py-[48px] flex flex-col gap-[64px]">
        {/* SECTION 0 — Intro: portrait + bio */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-[16px] items-stretch">
          {/* Bio */}
          <div className="bg-[#141416] rounded-[22px] p-[32px] flex flex-col justify-between gap-[28px] min-h-[520px]">
            <div className="flex flex-col gap-[24px]">
              <Chip text="ABOUT ME" active />
              <div className="flex flex-col gap-[8px]">
                <PixelText text="DESIGNS BY DAY," className="text-[#f4f2f0] leading-[1.4]" style={{ fontSize: "clamp(18px,2.2vw,32px)" }} />
                <PixelText text="DEBUGS LIFE" className="text-[#f4f2f0] leading-[1.4]" style={{ fontSize: "clamp(18px,2.2vw,32px)" }} />
                <PixelText text="BY NIGHT." className="text-[#ed1c24] leading-[1.4]" style={{ fontSize: "clamp(18px,2.2vw,32px)" }} />
              </div>
              <p className="text-[#9a9ca1] max-w-[520px]" style={{ fontFamily: BODY, fontSize: "16px", lineHeight: 1.6 }}>
                Hi, I'm Parth Panchal — a product designer who wandered into the
                scariest room in software (healthcare), liked the pressure, and
                stayed. At eClinicalWorks I sweat the pixels for hundreds of
                thousands of clinicians, herd a team of designers, and quietly
                wire up AI pipelines so quality doesn't ghost us after launch.
                Powered by chai, curiosity, and an unhealthy love for tidy edge
                cases.
              </p>
            </div>
            <div className="w-full">
              <DetailRow label="BASED IN" value="AHMEDABAD, INDIA" />
            </div>
          </div>

          {/* Portrait with animated shader */}
          <div className="relative bg-[#141416] rounded-[22px] overflow-hidden min-h-[520px]">
            <PortraitTile />
          </div>
        </section>

        {/* SECTION 1 — Professional context (bento) */}
        <section className="flex flex-col gap-[28px]">
          <PixelText
            text="SOME PROFESSIONAL CONTEXT"
            className="text-[#f4f2f0] leading-[1.4]"
            style={{ fontSize: "clamp(20px,3vw,44px)" }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-[16px] auto-rows-[minmax(180px,auto)]">
            <JobTile
              className="lg:col-span-4 lg:row-span-2"
              company="ECLINICALWORKS"
              period="CURRENTLY HERE SINCE"
              current
              desc="Currently shaping the future of healthcare at eClinicalWorks as a Product Designer — because making healthcare better is a design problem worth solving."
            />
            <JobTile
              className="lg:col-span-2"
              company="TCULES"
              period="JAN’23 - JAN’24"
              desc="Before this, I had a blast at Tcules, a UX design studio, where I learned tons, made memories, and sharpened my craft."
            />
            <JobTile
              className="lg:col-span-2"
              company="CIPHERBRAINS"
              period="MAY’22 - JAN’23"
              desc="Even earlier? CipherBrains Technologies, a small but ambitious service-based startup led by visionaries. A tight-knit dream team, big ideas, and bold moves."
            />
          </div>
        </section>

        {/* SECTION 2 — Beyond design, triple B's (bento) */}
        <section className="flex flex-col gap-[28px]">
          <PixelText
            text="BEYOND DESIGN — THE TRIPLE B'S"
            className="text-[#ed1c24] leading-[1.4]"
            style={{ fontSize: "clamp(18px,2.6vw,40px)" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-[16px] auto-rows-[minmax(160px,auto)]">
            {/* Bikes images */}
            <div className="lg:col-span-3 lg:row-span-2 grid grid-cols-2 gap-[8px] bg-[#141416] rounded-[22px] p-[12px]">
              <ImgCell src={img1639} className="row-span-2" />
              <ImgCell src={img1641} />
              <ImgCell src={img1645} />
            </div>
            {/* Bikes text */}
            <BTile
              title="BIKES"
              className="lg:col-span-3 lg:row-span-2"
              extra={
                <div className="flex flex-wrap gap-[12px]">
                  <span
                    className="rounded-[12px] px-[20px] py-[12px] text-[#f4f2f0] tracking-[1.5px]"
                    style={{ fontFamily: MONO, fontWeight: 600, fontSize: "11px", backgroundImage: "linear-gradient(123deg, #e12007, #67047b)" }}
                  >
                    INSTAGRAM ↗
                  </span>
                  <span
                    className="rounded-[12px] px-[20px] py-[12px] text-[#f4f2f0] bg-[#ed1c24] tracking-[1.5px]"
                    style={{ fontFamily: MONO, fontWeight: 600, fontSize: "11px" }}
                  >
                    YOUTUBE ↗
                  </span>
                </div>
              }
            >
              <p>I ride alongside my motorcycle crew to extravagant hotspots locally.</p>
              <p>We document it on our social media.</p>
              <p>If you're into or passionate about the world of automobiles, you might like it.</p>
            </BTile>

            {/* Basketball text */}
            <BTile title="BASKETBALL" className="lg:col-span-3 lg:row-span-2">
              <p>I was a national basketball player, now a veteran haha...</p>
              <p>It's a good stress buster and I love to compete.</p>
            </BTile>
            {/* Basketball images */}
            <div className="lg:col-span-3 lg:row-span-2 grid grid-cols-3 gap-[8px] bg-[#141416] rounded-[22px] p-[12px]">
              <ImgCell src={img1643} />
              <ImgCell src={img1646} />
              <ImgCell src={img1648} />
            </div>

            {/* Books images */}
            <div className="lg:col-span-3 lg:row-span-2 bg-[#141416] rounded-[22px] p-[16px] flex items-center justify-center overflow-hidden">
              <div className="flex items-center">
                {[book1, book2, book3, book4, book5].map((b, i) => (
                  <div
                    key={i}
                    className="h-[220px] w-[150px] rounded-[10px] overflow-hidden border border-[rgba(244,242,240,0.12)]"
                    style={{ marginLeft: i === 0 ? 0 : -60 }}
                  >
                    <img src={b} alt="" className="size-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
            {/* Books text */}
            <BTile title="BOOKS" className="lg:col-span-3 lg:row-span-2">
              <p>That's mostly how I upgrade myself — through stuff written by others, take inspiration and apply it in real time.</p>
            </BTile>
          </div>
        </section>

        <div className="flex justify-center pt-[16px]">
          <button
            onClick={onClose}
            className="text-[#0a0a0b] bg-[#ed1c24] rounded-[24px] px-[32px] py-[14px] hover:bg-[#ff2a33] transition-colors tracking-[1.5px]"
            style={{ fontFamily: MONO, fontWeight: 600, fontSize: "12px" }}
          >
            ← BACK TO HOME
          </button>
        </div>
      </div>
    </div>
  );
}

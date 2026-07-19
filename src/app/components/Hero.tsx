import { GreetingCycle } from "./GreetingCycle";

const MONO = "'JetBrains Mono', monospace";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col gap-[10px] items-center justify-center min-h-[calc(100vh-40px)] px-[44px] py-[20px] rounded-[22px] bg-[#101013] overflow-hidden"
    >
      {/* top-right chrome */}
      <div
        className="absolute top-[24px] right-[28px] text-[#9a9ca1] text-[11px] tracking-[2px]"
        style={{ fontFamily: MONO, fontWeight: 600 }}
      >
        SEC.01 / HOME
      </div>

      {/* listening chip */}
      <div className="absolute bottom-[28px] left-[28px] flex items-center gap-[8px] bg-[#141416] rounded-[20px] px-[14px] py-[8px]">
        <span className="relative flex size-[8px]">
          <span className="absolute inline-flex size-full rounded-full bg-[#ed1c24] opacity-75 animate-ping" />
          <span className="relative inline-flex size-[8px] rounded-full bg-[#ed1c24]" />
        </span>
        <span
          className="text-[#9a9ca1] text-[10px] tracking-[1.5px]"
          style={{ fontFamily: MONO, fontWeight: 600 }}
        >
          ALIVE
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center w-full">
        <GreetingCycle
          className="text-[#f4f2f0] text-center leading-none uppercase"
          style={{ fontSize: "clamp(40px, 9vw, 130px)" }}
        />
      </div>

      <div className="flex flex-col items-center gap-[6px]">
        <p
          className="text-[#9a9ca1] text-[11px] tracking-[2px]"
          style={{ fontFamily: MONO, fontWeight: 600 }}
        >
          SCROLL
        </p>
      </div>
    </section>
  );
}

import { GreetingCycle } from "./GreetingCycle";
import GridScan from "./GridScan";

const MONO = "'JetBrains Mono', monospace";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col gap-[10px] items-center justify-center min-h-[calc(100vh-40px)] px-[44px] py-[20px] rounded-[22px] bg-[#0a0a0b] overflow-hidden"
    >
      {/* 3D grid room with a red LiDAR-style scan; parallax follows the cursor,
          clicks send a ping (sits behind everything) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <GridScan
          linesColor="#2d1818"
          scanColor="#ef4444"
          cells={9}
          depth={3}
          scanDuration={2.4}
          scanDelay={1.6}
          clickEffect="ping"
          reflection={0.55}
          scanWidth={0.6}
          trail={0.3}
          glow={0.5}
          shading={0}
        />
      </div>

      {/* top-right chrome */}
      <div
        className="absolute top-[24px] right-[28px] text-[#9a9ca1] text-[11px] tracking-[2px] z-10"
        style={{ fontFamily: MONO, fontWeight: 600 }}
      >
        SEC.01 / HOME
      </div>

      {/* listening chip */}
      <div className="absolute bottom-[28px] left-[28px] z-10 flex items-center gap-[8px] bg-[#141416] rounded-[20px] px-[14px] py-[8px]">
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

      <div className="relative z-10 flex flex-1 items-center justify-center w-full">
        <GreetingCycle
          className="text-[#f4f2f0] text-center leading-none uppercase"
          style={{ fontSize: "clamp(40px, 9vw, 130px)" }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-[6px]">
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

import { useRef } from "react";

/*
 * Client (EHR) projects don't show product screenshots. In their place: a pixel glyph
 * for the product, no text. On hover the glyph lights up in a diagonal wave, a red
 * dot-grid spotlight follows the cursor and a scan line sweeps once.
 */

type Glyph = string[]; // 9 rows of 9 chars, "#" = lit pixel

type Spec = { glyph: Glyph };

const SPECS: Record<string, Spec> = {
  sunoh: {
    // microphone + sound waves
    glyph: [
      "....#....",
      "...###...",
      ".#.###.#.",
      "#..###..#",
      "#..###..#",
      ".#..#..#.",
      "....#....",
      "...###...",
      ".........",
    ],
  },
  smart: {
    // open book
    glyph: [
      ".........",
      ".##...##.",
      "#..#.#..#",
      "#...#...#",
      "#...#...#",
      "#...#...#",
      "#..###..#",
      "###...###",
      ".........",
    ],
  },
  mobile: {
    // phone
    glyph: [
      "..#####..",
      "..#...#..",
      "..#...#..",
      "..#...#..",
      "..#...#..",
      "..#...#..",
      "..#...#..",
      "..##.##..",
      "..#####..",
    ],
  },
  wound: {
    // medical cross
    glyph: [
      ".........",
      "...###...",
      "...#.#...",
      "####.####",
      "#.......#",
      "####.####",
      "...#.#...",
      "...###...",
      ".........",
    ],
  },
};

export const hasProjectBlock = (id: string) => id in SPECS;

function PixelGlyph({ glyph, cell }: { glyph: Glyph; cell: string }) {
  return (
    <div
      className="grid shrink-0"
      style={{ gridTemplateColumns: `repeat(9, ${cell})`, gridAutoRows: cell, gap: `calc(${cell} * 0.18)` }}
      aria-hidden="true"
    >
      {glyph.flatMap((row, y) =>
        row.split("").map((ch, x) =>
          ch === "#" ? (
            <span
              key={`${x}-${y}`}
              className="pb-pixel rounded-[1px] bg-[#3a3a41] group-hover:bg-[#ed1c24] group-hover:shadow-[0_0_10px_rgba(237,28,36,0.55)] transition-[background-color,box-shadow] duration-300 motion-reduce:transition-none"
              style={{ transitionDelay: `${(x + y) * 32}ms` }}
            />
          ) : (
            <span key={`${x}-${y}`} />
          ),
        ),
      )}
    </div>
  );
}

const DOTS = (color: string) => ({
  backgroundImage: `radial-gradient(${color} 1px, transparent 1.2px)`,
  backgroundSize: "14px 14px",
});

export function ProjectBlock({
  id,
  variant = "card",
  className = "",
}: {
  id: string;
  variant?: "card" | "hero" | "panel";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const spec = SPECS[id];
  if (!spec) return null;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const cell = variant === "hero" ? "clamp(12px, 2.2vw, 26px)" : variant === "panel" ? "clamp(10px, 1.6vw, 16px)" : "clamp(10px, 1.7vw, 17px)";

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group absolute inset-0 overflow-hidden bg-[#101013] ${className}`}
      style={{ ["--mx" as string]: "70%", ["--my" as string]: "40%" }}
    >
      {/* resting dot grid */}
      <div className="absolute inset-0" style={DOTS("rgba(244,242,240,0.07)")} />
      {/* red dot-grid spotlight that follows the cursor */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          ...DOTS("rgba(237,28,36,0.85)"),
          WebkitMaskImage: "radial-gradient(circle 140px at var(--mx) var(--my), #000 0%, transparent 100%)",
          maskImage: "radial-gradient(circle 140px at var(--mx) var(--my), #000 0%, transparent 100%)",
        }}
      />
      {/* soft red glow behind the glyph */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[60%] rounded-full bg-[#ed1c24] blur-[80px] opacity-0 group-hover:opacity-[0.12] transition-opacity duration-500" />
      {/* one scan line per hover */}
      <div className="pb-scan absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#ed1c24] to-transparent opacity-0" />

      <div className="relative size-full flex items-center justify-center">
        <PixelGlyph glyph={spec.glyph} cell={cell} />
      </div>
    </div>
  );
}

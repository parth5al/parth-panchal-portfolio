import { useEffect, useRef, useState } from "react";
import portraitUrl from "../../imports/image-1.png";
import DitherVeil from "./DitherVeil";

const MONO = "'JetBrains Mono', monospace";

/**
 * Full-bleed portrait tile. The photo renders as a Bayer-dithered dot image;
 * the cursor reveals the full-colour photo in a soft circle whose trail knits
 * back into dither, and a click sends a ring of colour across it.
 */
export function PortraitTile() {
  const tileRef = useRef<HTMLDivElement>(null);
  // Reveal circle scales with the tile: ~100px on phones, up to 180px on desktop.
  const [revealRadius, setRevealRadius] = useState(160);

  useEffect(() => {
    const tile = tileRef.current;
    if (!tile) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setRevealRadius(Math.round(Math.min(180, Math.max(90, w * 0.3))));
    });
    ro.observe(tile);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={tileRef} className="absolute inset-0 overflow-hidden rounded-[22px] bg-[#120f17]">
      <DitherVeil
        src={portraitUrl}
        fit="cover"
        pattern="bayer"
        pixelSize={2}
        inkColor="#120f17"
        paperColor="#f4f1ea"
        revealRadius={revealRadius}
        softness={0.6}
        linger={1}
        palette="rgb"
        brightness={-0.04}
        className="absolute inset-0"
      />
      <span role="img" aria-label="Portrait of Parth Panchal" className="sr-only" />

      {/* corner labels */}
      <span
        className="absolute top-[16px] left-[16px] text-[#f4f2f0] text-[9px] tracking-[2px] mix-blend-difference pointer-events-none"
        style={{ fontFamily: MONO, fontWeight: 600 }}
      >
        PORTRAIT · PARTH
      </span>
      <span
        className="absolute bottom-[16px] right-[16px] text-[#f4f2f0] text-[9px] tracking-[2px] mix-blend-difference pointer-events-none"
        style={{ fontFamily: MONO, fontWeight: 600 }}
      >
        HOVER · REVEAL
      </span>
    </div>
  );
}

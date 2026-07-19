import { useEffect, useState } from "react";
import { PixelText } from "./PixelText";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const MONO = "'JetBrains Mono', monospace";

type Item = { tag: string; year: string; cover: string };

const ITEMS: Item[] = [
  { tag: "INTERACTION STUDY", year: "2025", cover: "https://images.unsplash.com/photo-1600327222811-3a13fc41dd8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400" },
  { tag: "UI EXPLORATION", year: "2025", cover: "https://images.unsplash.com/photo-1556139930-c23fa4a4f934?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400" },
  { tag: "MOTION", year: "2024", cover: "https://images.unsplash.com/photo-1648582632425-088255f56e17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400" },
  { tag: "TYPE", year: "2024", cover: "https://images.unsplash.com/photo-1666827717869-448a0adcd4ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400" },
  { tag: "COMPONENT", year: "2023", cover: "https://images.unsplash.com/photo-1706189797798-30d44496b274?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400" },
  { tag: "EXPERIMENT", year: "2023", cover: "https://images.unsplash.com/photo-1547410518-bac44f7a9f5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400" },
];

export function Archives() {
  const [selected, setSelected] = useState<Item | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section id="archives" className="bg-[#101013] rounded-[22px] px-[28px] py-[44px] flex flex-col gap-[28px]">
      <PixelText text="ARCHIVES" className="text-[#f4f2f0]" style={{ fontSize: "clamp(20px,2.6vw,36px)" }} />
      <p className="text-[#9a9ca1] text-[15px] max-w-[560px]" style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
        A repository of design stuff that never gets the light — even after that
        UX-worthy fight :)
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
        {ITEMS.map((it) => (
          <button
            key={it.tag}
            onClick={() => setSelected(it)}
            className="group bg-[#141416] rounded-[16px] p-[16px] flex flex-col gap-[16px] text-left hover:bg-[#1a1a1d] transition-colors"
          >
            <div className="bg-white rounded-[10px] h-[160px] overflow-hidden">
              <ImageWithFallback
                src={it.cover}
                alt={it.tag}
                className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#ed1c24] text-[9.5px] tracking-[1.5px]" style={{ fontFamily: MONO, fontWeight: 600 }}>
                {it.tag}
              </span>
              <span className="text-[#9a9ca1] text-[9.5px] tracking-[1.5px]" style={{ fontFamily: MONO, fontWeight: 600 }}>
                {it.year}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox overlay */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0a0a0b]/85 backdrop-blur-sm p-[24px]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[60vw] h-[60vh] bg-[#141416] rounded-[22px] overflow-hidden border border-[rgba(244,242,240,0.12)] shadow-[0_40px_120px_rgba(0,0,0,0.6)] animate-[archivePop_180ms_ease-out]"
          >
            <ImageWithFallback src={selected.cover} alt={selected.tag} className="size-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a0a0b] to-transparent p-[24px] flex items-end justify-between">
              <span className="text-[#ed1c24] text-[11px] tracking-[1.5px]" style={{ fontFamily: MONO, fontWeight: 600 }}>
                {selected.tag}
              </span>
              <span className="text-[#9a9ca1] text-[11px] tracking-[1.5px]" style={{ fontFamily: MONO, fontWeight: 600 }}>
                {selected.year}
              </span>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="absolute top-[16px] right-[16px] size-[36px] rounded-[10px] bg-[#0a0a0b]/70 backdrop-blur text-[#f4f2f0] hover:bg-[#ed1c24] hover:text-[#0a0a0b] transition-colors flex items-center justify-center"
              style={{ fontFamily: MONO, fontWeight: 600, fontSize: "14px" }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <style>{`
            @keyframes archivePop { from { transform: scale(0.94); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            @media (prefers-reduced-motion: reduce) { .animate-\\[archivePop_180ms_ease-out\\] { animation: none; } }
          `}</style>
        </div>
      )}
    </section>
  );
}

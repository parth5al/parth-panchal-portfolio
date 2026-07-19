import { useState } from "react";
import { Logo } from "./Logo";

const MONO = "'JetBrains Mono', monospace";

const NAV = [
  { label: "ABOUT", id: "about" },
  { label: "WORK", id: "work" },
  { label: "ARCHIVES", id: "archives" },
  { label: "CONTACT", id: "contact" },
];

export function MobileNav({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    setOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <div className="md:hidden sticky top-0 z-40 bg-[#0a0a0b] flex items-center justify-between px-[20px] py-[14px]">
        <div className="flex items-center gap-[12px]">
          <Logo size={36} />
          <span className="text-[#f4f2f0] text-[16px]" style={{ fontFamily: "'Press Start 2P', monospace" }}>
            parth.
          </span>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="text-[#f4f2f0] text-[11px] tracking-[1.5px] border border-[rgba(244,242,240,0.2)] rounded-[8px] px-[14px] py-[8px]"
          style={{ fontFamily: MONO, fontWeight: 600 }}
        >
          MENU
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#0a0a0b] flex flex-col p-[24px]">
          <div className="flex justify-end">
            <button
              onClick={() => setOpen(false)}
              className="text-[#f4f2f0] text-[11px] tracking-[1.5px]"
              style={{ fontFamily: MONO, fontWeight: 600 }}
            >
              CLOSE ✕
            </button>
          </div>
          <div className="flex flex-col gap-[28px] flex-1 justify-center">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className="text-left text-[#f4f2f0] hover:text-[#ed1c24] transition-colors"
                style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "28px" }}
              >
                {n.label}
              </button>
            ))}
            <button
              className="text-left text-[#9a9ca1] text-[12px] tracking-[1.5px] mt-[16px]"
              style={{ fontFamily: MONO, fontWeight: 600 }}
            >
              RESUME ↓
            </button>
          </div>
          <p className="text-[#9a9ca1] text-[9.5px] tracking-[1.5px]" style={{ fontFamily: MONO, fontWeight: 600 }}>
            © PARTH PANCHAL · FEBRUARY 2026 · AHMEDABAD, INDIA
          </p>
        </div>
      )}
    </>
  );
}

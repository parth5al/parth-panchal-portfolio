import { Logo } from "./Logo";
import { Clock } from "./Clock";

const MONO = "'JetBrains Mono', monospace";

type IconName = "about" | "work" | "archives" | "contact";

const NAV: { num: string; label: string; id: string; icon: IconName }[] = [
  { num: "01", label: "About", id: "about", icon: "about" },
  { num: "02", label: "Work", id: "work", icon: "work" },
  { num: "03", label: "Archives", id: "archives", icon: "archives" },
  { num: "04", label: "Contact", id: "contact", icon: "contact" },
];

// Pixel icons: each is a list of filled [x,y] cells on a 9x9 grid.
const PIXELS: Record<IconName, [number, number][]> = {
  // person — head + shoulders
  about: [
    [3, 1], [4, 1], [5, 1],
    [3, 2], [5, 2],
    [3, 3], [4, 3], [5, 3],
    [2, 6], [3, 6], [4, 6], [5, 6], [6, 6],
    [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7],
  ],
  // briefcase
  work: [
    [3, 1], [4, 1], [5, 1],
    [3, 2], [5, 2],
    [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
    [1, 4], [7, 4],
    [1, 5], [4, 5], [7, 5],
    [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6],
  ],
  // stacked archive boxes
  archives: [
    [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
    [1, 2], [4, 2], [7, 2],
    [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
    [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5],
    [1, 6], [4, 6], [7, 6],
    [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7],
  ],
  // envelope
  contact: [
    [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2],
    [1, 3], [2, 3], [6, 3], [7, 3],
    [1, 4], [3, 4], [5, 4], [7, 4],
    [1, 5], [4, 5], [7, 5],
    [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6],
  ],
};

function PixelIcon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 9 9"
      className={`size-[22px] ${className}`}
      style={{ shapeRendering: "crispEdges" }}
      fill="currentColor"
      aria-hidden="true"
    >
      {PIXELS[name].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} />
      ))}
    </svg>
  );
}

function NavCard({
  num,
  label,
  icon,
  active,
  onClick,
}: {
  num: string;
  label: string;
  icon: IconName;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative rounded-[12px] w-full text-left transition-colors duration-200 ${
        active ? "bg-[#ed1c24]" : "bg-[#141416] hover:bg-[#ed1c24]"
      }`}
    >
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="flex flex-col gap-[32px] items-start p-[12px] relative size-full">
          <div className="flex items-center justify-between w-full whitespace-nowrap">
            <div className="flex items-center gap-[10px]">
              <PixelIcon
                name={icon}
                className={`transition-colors ${
                  active
                    ? "text-[#0a0a0b]"
                    : "text-[#ed1c24] group-hover:text-[#0a0a0b]"
                }`}
              />
              <p
                className={`text-[13px] transition-colors ${
                  active
                    ? "text-[#0a0a0b]"
                    : "text-[#ed1c24] group-hover:text-[#0a0a0b]"
                }`}
                style={{ fontFamily: MONO }}
              >
                {num}
              </p>
            </div>
            <p
              className={`text-[15px] transition-colors ${
                active
                  ? "text-[#0a0a0b]"
                  : "text-[#f4f2f0] group-hover:text-[#0a0a0b]"
              }`}
            >
              ↗
            </p>
          </div>
          <p
            className={`text-[16px] w-full transition-colors ${
              active
                ? "text-[#0a0a0b]"
                : "text-[#f4f2f0] group-hover:text-[#0a0a0b]"
            }`}
            style={{ fontFamily: MONO, fontWeight: 600 }}
          >
            {label}
          </p>
        </div>
      </div>
    </button>
  );
}

function SocialChip({ label }: { label: string }) {
  return (
    <button className="bg-[#141416] flex-1 min-w-px relative rounded-[8px] hover:bg-[#1d1d20] transition-colors">
      <div className="flex items-center justify-center p-[12px] size-full">
        <p
          className="text-[#9a9ca1] text-[10px] tracking-[1px] whitespace-nowrap"
          style={{ fontFamily: MONO, fontWeight: 600 }}
        >
          {label}
        </p>
      </div>
    </button>
  );
}

export function Sidebar({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <div className="bg-[#0a0a0b] flex flex-col gap-[20px] h-full items-start p-[20px] w-full">
      {/* Logo + clock */}
      <div className="bg-[#141416] rounded-[12px] shrink-0 w-full">
        <div className="flex items-center justify-center gap-[20px] p-[12px]">
          <div className="flex flex-col items-start w-[68px]">
            <Logo size={64} />
          </div>
          <Clock />
        </div>
      </div>

      {/* Nav cards */}
      {NAV.map((item) => (
        <NavCard
          key={item.id}
          num={item.num}
          label={item.label}
          icon={item.icon}
          active={active === item.id}
          onClick={() => onNavigate(item.id)}
        />
      ))}

      {/* Spacer + actions */}
      <div className="flex flex-1 flex-col gap-[12px] items-center justify-end min-h-px w-full">
        <div className="flex flex-col gap-[13px] items-start w-full">
          <button className="bg-[#141416] relative rounded-[12px] w-full border border-[rgba(244,242,240,0.12)] hover:bg-[#1d1d20] transition-colors">
            <div className="flex items-center justify-center p-[12px]">
              <p
                className="text-[#f4f2f0] text-[11px] tracking-[1.5px] whitespace-nowrap"
                style={{ fontFamily: MONO, fontWeight: 600 }}
              >
                RESUME ↓
              </p>
            </div>
          </button>
          <button
            onClick={() => onNavigate("contact")}
            className="bg-[#f4f2f0] relative rounded-[12px] w-full hover:bg-white transition-colors"
          >
            <div className="flex items-center justify-center p-[12px]">
              <p
                className="text-[#0a0a0b] text-[11px] tracking-[1.5px] whitespace-nowrap"
                style={{ fontFamily: MONO, fontWeight: 600 }}
              >
                GET IN TOUCH
              </p>
            </div>
          </button>
        </div>
        <div className="flex gap-[12px] items-center w-full">
          <SocialChip label="IG" />
          <SocialChip label="IN" />
          <SocialChip label="TW" />
        </div>
      </div>

      {/* Date stamp */}
      <div
        className="flex flex-col gap-[4px] items-center justify-end text-[#9a9ca1] text-[9.5px] tracking-[1.5px] w-full whitespace-nowrap"
        style={{ fontFamily: MONO, fontWeight: 600 }}
      >
        <p>FEBRUARY 2026</p>
        <p>AHMEDABAD, INDIA</p>
      </div>
    </div>
  );
}

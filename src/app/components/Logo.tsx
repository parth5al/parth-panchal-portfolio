import svgPaths from "../../imports/MacBookPro141/svg-y24rnwfgll";

export function Logo({ size = 64 }: { size?: number }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg
        className="absolute block inset-0 size-full cursor-pointer"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 64 64"
        role="button"
        aria-label="Back to top"
        onClick={() =>
          document
            .getElementById("hero")
            ?.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      >
        <g>
          <rect fill="#ED1C24" height="64" rx="8" width="64" />
          <path
            clipRule="evenodd"
            d={svgPaths.p2ce84700}
            fill="#0A0A0B"
            fillRule="evenodd"
          />
        </g>
      </svg>
    </div>
  );
}

import { useEffect, useState } from "react";

function format(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

export function Clock() {
  const [time, setTime] = useState(() => format(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-[#141416] h-[28px] overflow-clip relative rounded-[6px] shrink-0 w-[88px]">
      <p
        className="absolute left-[14px] top-[7px] text-[#f4f2f0] text-[11px] tracking-[1px] whitespace-nowrap"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {time}
      </p>
    </div>
  );
}

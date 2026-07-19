import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function PixelText({
  text,
  className = "",
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(text);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !done.current) {
            done.current = true;
            let frame = 0;
            const total = 14;
            const id = setInterval(() => {
              frame++;
              const revealed = Math.floor((frame / total) * text.length);
              setDisplay(
                text
                  .split("")
                  .map((ch, i) => {
                    if (ch === " ") return " ";
                    if (i < revealed) return ch;
                    return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
                  })
                  .join(""),
              );
              if (frame >= total) {
                clearInterval(id);
                setDisplay(text);
              }
            }, 35);
          }
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [text]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontFamily: "'Press Start 2P', monospace", ...style }}
    >
      {display}
    </span>
  );
}

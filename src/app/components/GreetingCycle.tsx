import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const GREETINGS = ["Namaste", "Hola", "Hello", "Bonjour", "こんにちは", "你好"];

const TYPE_MS = 90; // time per typed letter
const ERASE_MS = 45; // time per erased letter
const HOLD_MS = 1000; // hold fully-typed word

export function GreetingCycle({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // reduced motion: just swap the whole word on an interval
  useEffect(() => {
    if (!reduce) return;
    setText(GREETINGS[wordIndex]);
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % GREETINGS.length),
      2000,
    );
    return () => clearInterval(id);
  }, [reduce, wordIndex]);

  // robotic typewriter: type letters, hold, erase, advance
  useEffect(() => {
    if (reduce) return;
    const word = GREETINGS[wordIndex];
    let phase: "typing" | "holding" | "erasing" = "typing";
    let i = 0;

    const step = () => {
      if (phase === "typing") {
        i++;
        setText(word.slice(0, i));
        if (i >= word.length) {
          phase = "holding";
          timer.current = setTimeout(step, HOLD_MS);
        } else {
          timer.current = setTimeout(step, TYPE_MS);
        }
      } else if (phase === "holding") {
        phase = "erasing";
        timer.current = setTimeout(step, ERASE_MS);
      } else {
        i--;
        setText(word.slice(0, i));
        if (i <= 0) {
          setWordIndex((n) => (n + 1) % GREETINGS.length);
        } else {
          timer.current = setTimeout(step, ERASE_MS);
        }
      }
    };

    timer.current = setTimeout(step, TYPE_MS);
    return () => clearTimeout(timer.current);
  }, [wordIndex, reduce]);

  return (
    <span
      className={`inline-flex items-center justify-center whitespace-nowrap ${className}`}
      style={{ fontFamily: "'Press Start 2P', monospace", ...style }}
    >
      <span>{text}</span>
      {!reduce && (
        <span
          aria-hidden
          className="robo-caret inline-block ml-[0.12em]"
          style={{
            width: "0.6em",
            height: "0.9em",
            background: "#ed1c24",
          }}
        />
      )}
      <style>{`
        @keyframes roboCaret { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .robo-caret { animation: roboCaret 0.5s steps(1) infinite; }
      `}</style>
    </span>
  );
}

"use client";

import { useEffect, useState } from "react";
import usePrefersReducedMotion from "@/lib/usePrefersReducedMotion";

const CHARS = "!<>-_\\/[]{}=+*^?#";

export default function useDecodeText(text, { speed = 35, revealDelay = 2 } = {}) {
  const reduceMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(text);
      return;
    }

    let frame = 0;
    let revealed = 0;

    const interval = setInterval(() => {
      frame++;
      if (frame % revealDelay === 0 && revealed < text.length) {
        revealed++;
      }

      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < revealed) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (revealed >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, revealDelay, reduceMotion]);

  return display;
}

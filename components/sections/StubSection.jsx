"use client";

import { useTheme } from "@/components/layout/ThemeProvider";
import { getColors } from "./HeroBackground";

export default function StubSection({ id, title, description = "Coming soon." }) {
  const { theme } = useTheme();
  const c = getColors(theme);

  return (
    <section id={id} style={{ maxWidth: 1120, margin: "0 auto", padding: "clamp(40px,8vh,80px) 24px" }}>
      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(24px,3vw,34px)",
          color: c.text,
          marginBottom: 12,
        }}
      >
        {title}
      </h2>
      <p style={{ fontSize: 15, color: c.textMuted }}>{description}</p>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import HeroBackground, { getColors } from "./HeroBackground";
import { useTheme } from "@/components/layout/ThemeProvider";

const STATS = [
  { label: "Subscribers", value: "100K+" },
  { label: "Videos", value: "200+" },
  { label: "Students", value: "10K+" },
  { label: "Resources", value: "50+" },
];

function useDecodeText(target, { frames = 16, speed = 45 } = {}) {
  const [text, setText] = useState("");
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const reveal = Math.floor((frame / frames) * target.length);
      let out = "";
      for (let i = 0; i < target.length; i++) {
        out += i < reveal ? target[i] : chars[Math.floor(Math.random() * chars.length)];
      }
      setText(out);
      if (frame >= frames) {
        clearInterval(timer);
        setText(target);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [target, frames, speed]);
  return text || target;
}

/**
 * Hero section: HeroBackground effects + centered copy.
 * The real Navbar (theme toggle, nav links, socials) renders once in
 * app/layout.js above this — Hero only owns the decorative background and copy.
 */
export default function Hero({
  youtubeUrl = "https://www.youtube.com/@MohitDecodes",
  topmateUrl = "https://topmate.io/mohitdecodes",
}) {
  const { theme } = useTheme();
  const c = getColors(theme);
  const headline = useDecodeText("MohitDecodes");
  const settled = headline === "MohitDecodes";
  const part1 = headline.slice(0, 8);
  const mid = headline.charAt(8);
  const part3 = headline.slice(9);

  return (
    <HeroBackground theme={theme}>
      <div style={{ position: "relative", zIndex: 10, maxWidth: 880, margin: "0 auto", padding: "clamp(26px,5.5vh,64px) 24px clamp(22px,5vh,56px)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, border: `1px solid ${c.border}`, background: c.surface, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: c.textMuted, marginBottom: "clamp(12px,2.2vh,22px)", whiteSpace: "nowrap", width: "fit-content" }}>
          $ whoami
        </div>

        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(36px,min(7vw,12vh),92px)", lineHeight: 1.02, letterSpacing: "-0.03em", color: c.text, minHeight: "1.1em" }}>
          {part1}
          {settled ? (
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "0.7em", height: "0.7em", margin: "0 0.02em", verticalAlign: "-0.08em" }}>
              <svg width="100%" height="100%" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="none" stroke={c.accent} strokeWidth="2.6" />
                <path d="M10 8l6 4-6 4z" fill={c.accent} />
              </svg>
            </span>
          ) : mid}
          {part3}
        </h1>

        <p style={{ marginTop: "clamp(12px,2.2vh,20px)", maxWidth: 560, fontSize: "clamp(16px,1.2vw,18px)", lineHeight: 1.65, color: c.textMuted }}>
          Practical coding tutorials, real projects, and 1:1 mentorship — everything you need to actually ship code, not just watch videos about it.
        </p>

        <div style={{ marginTop: "clamp(16px,3vh,28px)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 14 }}>
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg, ${c.accentBright}, ${c.accent})`, color: "#ffffff", fontSize: 15, fontWeight: 600, padding: "14px 26px", borderRadius: 999, boxShadow: `0 16px 34px -14px ${c.accent}` }}>
            Explore Courses
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
          <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${c.border}`, color: c.text, fontSize: 15, fontWeight: 600, padding: "14px 24px", borderRadius: 999, background: c.surface }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8z" /></svg>
            Watch Latest Video
          </a>
        </div>

        <a href={topmateUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: "clamp(10px,1.7vh,18px)", fontSize: 13, color: c.textFaint }}>
          Or book a 1:1 mentorship session on Topmate →
        </a>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(90px,1fr))", gap: "clamp(20px,3vw,36px)", marginTop: "clamp(20px,4.5vh,44px)" }}>
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 26, color: c.text }}>{stat.value}</div>
              <div style={{ marginTop: 4, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: c.textMuted }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <a
        href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="Watch on YouTube"
        style={{
          position: "absolute", right: "9%", bottom: "8%", zIndex: 3, width: 64, height: 64,
          borderRadius: "50%", background: `linear-gradient(135deg, ${c.accentBright}, ${c.accent})`,
          display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 40px ${c.accent}`,
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#ffffff"><path d="M6 4l14 8-14 8z" /></svg>
      </a>
    </HeroBackground>
  );
}

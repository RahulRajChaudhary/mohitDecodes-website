"use client";

import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";
import useDecodeText from "@/lib/useDecodeText";
import usePrefersReducedMotion from "@/lib/usePrefersReducedMotion";

const STATS = [
  { label: "Subscribers", value: "22K+" },
  { label: "Videos", value: "200+" },
  { label: "Students", value: "5K+" },
  { label: "Resources", value: "50+" },
];

export default function Hero({
  youtubeUrl = "https://www.youtube.com/@MohitDecodes",
  topmateUrl = "https://topmate.io/mohitdecodes",
}) {
  const headline = useDecodeText("MohitDecodes");
  const reduceMotion = usePrefersReducedMotion();
  const settled = headline === "MohitDecodes";
  const part1 = headline.slice(0, 8);
  const mid = headline.charAt(8);
  const part3 = headline.slice(9);

  return (
    <HeroBackground>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto flex max-w-[880px] flex-col items-center px-6 pt-[clamp(32px,7vh,72px)] pb-[clamp(28px,6vh,64px)] text-center"
      >
        <div className="mb-[clamp(14px,2.6vh,26px)] inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full border border-glass-border bg-glass-bg px-3.5 py-1.5 font-mono text-xs tracking-[0.18em] text-foreground/64 uppercase">
          $ whoami
        </div>

        <h1 className="min-h-[1.1em] font-heading text-[clamp(38px,min(7.5vw,13vh),96px)] leading-[1.02] font-bold tracking-[-0.03em] text-foreground">
          {part1}
          {settled ? (
            <a
              href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="Watch on YouTube"
              className="mx-[0.02em] inline-flex h-[0.7em] w-[0.7em] cursor-pointer items-center justify-center align-[-0.08em]"
            >
              <svg width="100%" height="100%" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="none" stroke="var(--accent)" strokeWidth="2.6" />
                <path d="M10 8l6 4-6 4z" fill="var(--accent)" />
              </svg>
            </a>
          ) : mid}
          {part3}
        </h1>

        <p className="mt-[clamp(14px,2.6vh,24px)] max-w-[560px] text-[clamp(16px,1.4vw,19px)] leading-[1.65] text-foreground/64">
          Practical coding tutorials, real projects, and 1:1 mentorship — everything you need to actually ship code, not just watch videos about it.
        </p>

        <div className="mt-[clamp(20px,3.6vh,32px)] flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--accent-bright),var(--accent))] px-[26px] py-3.5 text-[15px] font-semibold text-white shadow-[0_16px_34px_-14px_var(--accent)]"
          >
            Explore Courses
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
          <a
            href={youtubeUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-bg px-6 py-3.5 text-[15px] font-semibold text-foreground"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8z" /></svg>
            Watch Latest Video
          </a>
        </div>

        <a href={topmateUrl} target="_blank" rel="noopener noreferrer" className="mt-[clamp(12px,2vh,20px)] inline-block text-[13px] text-foreground/42">
          Or book a 1:1 mentorship session on Topmate →
        </a>

        <div className="mt-[clamp(24px,5.5vh,52px)] grid grid-cols-[repeat(4,minmax(90px,1fr))] gap-[clamp(22px,3.4vw,40px)]">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="font-heading text-[26px] font-bold text-foreground">{stat.value}</div>
              <div className="mt-1 text-[11px] tracking-[0.06em] text-foreground/64 uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </HeroBackground>
  );
}

"use client";

import Image from "next/image";
import { useTheme } from "@/components/layout/ThemeProvider";
import { getColors } from "./HeroBackground";

const GRID_STYLES = `
  .om-video-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, minmax(160px, 1fr));
    gap: 16px;
  }
  .om-video-grid .om-video-big { grid-column: span 2; grid-row: span 2; }
  .om-video-media { position: relative; width: 100%; aspect-ratio: 16 / 9; flex: 0 0 auto; }
  .om-video-media-big { aspect-ratio: auto; flex: 1 1 auto; }
  @media (max-width: 780px) {
    .om-video-grid { grid-template-columns: 1fr; grid-template-rows: none; }
    .om-video-grid .om-video-big { grid-column: span 1; grid-row: span 1; }
    .om-video-media-big { aspect-ratio: 16 / 9; flex: 0 0 auto; }
  }
`;

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function VideoCard({ video, big, c }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className={big ? "om-video-big" : ""}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid ${c.border}`,
        background: c.surface,
        textDecoration: "none",
      }}
    >
      <div className={`om-video-media${big ? " om-video-media-big" : ""}`}>
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          sizes={big ? "(max-width: 780px) 100vw, 40vw" : "(max-width: 780px) 100vw, 20vw"}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div
          style={{
            fontSize: big ? 16 : 13,
            fontWeight: 600,
            color: c.text,
            lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {video.title}
        </div>
        <div style={{ marginTop: 6, fontSize: 11, color: c.textMuted }}>{formatDate(video.publishedAt)}</div>
      </div>
    </a>
  );
}

export default function VideosSection({ videos = [] }) {
  const { theme } = useTheme();
  const c = getColors(theme);

  if (videos.length === 0) return null;

  const [big, ...rest] = videos;

  return (
    <section id="videos" style={{ maxWidth: 1120, margin: "0 auto", padding: "clamp(40px,8vh,80px) 24px" }}>
      <style>{GRID_STYLES}</style>
      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(24px,3vw,34px)",
          color: c.text,
          marginBottom: 28,
        }}
      >
        Latest Videos
      </h2>
      <div className="om-video-grid">
        <VideoCard video={big} big c={c} />
        {rest.slice(0, 4).map((v) => (
          <VideoCard key={v.id} video={v} c={c} />
        ))}
      </div>
    </section>
  );
}

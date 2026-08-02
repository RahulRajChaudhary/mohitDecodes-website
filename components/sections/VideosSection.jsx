import Image from "next/image";

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

function VideoCard({ video, big }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface no-underline transition duration-300 ease-out hover:border-accent/40 hover:shadow-lg motion-safe:hover:-translate-y-1 ${big ? "om-video-big" : ""}`}
    >
      <div className={`om-video-media${big ? " om-video-media-big" : ""}`}>
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          sizes={big ? "(max-width: 780px) 100vw, 40vw" : "(max-width: 780px) 100vw, 20vw"}
          className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
        />
      </div>
      <div className="px-3.5 py-3">
        <div
          className={`${big ? "text-base" : "text-[13px]"} line-clamp-2 font-semibold leading-[1.35] text-foreground transition-colors duration-300 group-hover:text-accent`}
        >
          {video.title}
        </div>
        <div className="mt-1.5 text-[11px] text-foreground/64">{formatDate(video.publishedAt)}</div>
      </div>
    </a>
  );
}

export default function VideosSection({ videos = [] }) {
  if (videos.length === 0) return null;

  const [big, ...rest] = videos;

  return (
    <section id="videos" className="mx-auto max-w-[1120px] px-6 py-[clamp(40px,8vh,80px)]">
      <style>{GRID_STYLES}</style>
      <h2 className="mb-7 font-heading text-[clamp(24px,3vw,34px)] font-bold text-foreground">
        Latest Videos
      </h2>
      <div className="om-video-grid">
        <VideoCard video={big} big />
        {rest.slice(0, 4).map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
    </section>
  );
}

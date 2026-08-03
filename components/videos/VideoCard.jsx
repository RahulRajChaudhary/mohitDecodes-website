import Image from "next/image";
import { FiPlay } from "react-icons/fi";
import { formatDuration, formatViewCount } from "@/lib/youtube";
import { categorizeVideo } from "@/lib/categorizeVideo";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function VideoCard({ video, onPlay }) {
  return (
    <button
      type="button"
      onClick={() => onPlay(video)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface text-left transition duration-300 ease-out hover:border-accent/40 hover:shadow-lg motion-safe:hover:-translate-y-1"
    >
      <div className="relative aspect-video w-full">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          sizes="(max-width: 780px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors duration-300 sm:bg-black/0 sm:group-hover:bg-black/30">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-accent shadow-lg transition-all duration-300 sm:scale-90 sm:opacity-0 sm:group-hover:scale-100 sm:group-hover:opacity-100">
            <FiPlay size={20} className="ml-0.5" />
          </span>
        </div>
        <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-[11px] font-medium text-white">
          {formatDuration(video.durationSeconds)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-3.5 py-3">
        <span className="w-fit rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
          {categorizeVideo(video.title)}
        </span>
        <div className="line-clamp-2 text-[13px] font-semibold leading-[1.35] text-foreground transition-colors duration-300 group-hover:text-accent">
          {video.title}
        </div>
        <div className="mt-auto text-[11px] text-foreground/64">
          {formatViewCount(video.viewCount)} views · {formatDate(video.publishedAt)}
        </div>
      </div>
    </button>
  );
}

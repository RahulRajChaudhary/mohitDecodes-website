"use client";

import { useState } from "react";
import Link from "next/link";
import VideoCard from "@/components/videos/VideoCard";
import VideoPlayerModal from "@/components/sections/VideoPlayerModal";

export default function HomeVideosSection({ videos = [] }) {
  const [playingVideo, setPlayingVideo] = useState(null);

  if (videos.length === 0) return null;

  return (
    <section id="videos" className="mx-auto max-w-[1120px] px-6 pt-6 pb-[clamp(40px,8vh,80px)] md:pt-12 lg:pt-[clamp(40px,8vh,80px)]">
      <Link href="/videos" className="mb-7 block w-fit no-underline">
        <h2 className="font-heading text-[clamp(24px,3vw,34px)] font-bold text-foreground transition-colors hover:text-accent">
          Videos
        </h2>
      </Link>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} onPlay={setPlayingVideo} />
        ))}
      </div>
      <VideoPlayerModal video={playingVideo} onClose={() => setPlayingVideo(null)} />
    </section>
  );
}

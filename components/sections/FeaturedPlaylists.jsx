import Image from "next/image";

export default function FeaturedPlaylists({ playlists = [] }) {
  if (playlists.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="mb-6 font-heading text-[clamp(22px,3vw,30px)] font-bold text-foreground">
        Featured Playlists
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {playlists.map((playlist) => (
          <a
            key={playlist.id}
            href={playlist.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface no-underline transition duration-300 ease-out hover:border-accent/40 hover:shadow-lg motion-safe:hover:-translate-y-1"
          >
            <div className="relative aspect-video w-full">
              <Image
                src={playlist.thumbnail}
                alt={playlist.title}
                fill
                sizes="(max-width: 780px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
              />
              <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-[11px] font-medium text-white">
                {playlist.videoCount} videos
              </span>
            </div>
            <div className="px-3.5 py-3">
              <div className="line-clamp-2 text-[13px] font-semibold leading-[1.35] text-foreground transition-colors duration-300 group-hover:text-accent">
                {playlist.title}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

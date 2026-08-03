import VideosLibrary from "@/components/sections/VideosLibrary";
import FeaturedPlaylists from "@/components/sections/FeaturedPlaylists";
import { getVideoPage, getFeaturedPlaylists } from "@/lib/youtube";

export const revalidate = 3600;

export const metadata = {
  title: "Videos | Mohit Decodes",
  description: "Browse every coding tutorial, full course and Short from the Mohit Decodes YouTube channel.",
};

export default async function VideosPage() {
  const [{ items, nextPageToken }, playlists] = await Promise.all([
    getVideoPage({ maxResults: 24 }),
    getFeaturedPlaylists({ maxResults: 6 }),
  ]);

  return (
    <div className="mx-auto max-w-[1120px] px-6 pt-6 pb-[clamp(40px,8vh,80px)] md:pt-12 lg:pt-[clamp(40px,8vh,80px)]">
      <h1 className="mb-7 font-heading text-[clamp(28px,4vw,40px)] font-bold text-foreground">Videos</h1>
      <VideosLibrary initialItems={items} initialNextPageToken={nextPageToken} />
      <FeaturedPlaylists playlists={playlists} />
    </div>
  );
}

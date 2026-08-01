import Hero from "@/components/sections/Hero";
import VideosSection from "@/components/sections/VideosSection";
import About from "@/components/sections/About";
import StubSection from "@/components/sections/StubSection";
import { getLatestVideos } from "@/lib/youtube";

export const revalidate = 3600;

export default async function Home() {
  const videos = await getLatestVideos(5);

  return (
    <>
      <Hero />
      <VideosSection videos={videos} />
      <StubSection id="resources" title="Resources" />
      <StubSection id="blogs" title="Blogs" />
      <StubSection id="roadmaps" title="Roadmaps" />
      <About />
    </>
  );
}

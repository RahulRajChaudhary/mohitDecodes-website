import Hero from "@/components/sections/Hero";
import HomeVideosSection from "@/components/sections/HomeVideosSection";
import About from "@/components/sections/About";
import StubSection from "@/components/sections/StubSection";
import RoadmapsSection from "@/components/sections/RoadmapsSection";
import { getFullCourseVideos } from "@/lib/youtube";

export const revalidate = 3600;

export default async function Home() {
  const videos = await getFullCourseVideos({ maxResults: 6 });

  return (
    <>
      <Hero />
      <HomeVideosSection videos={videos} />
      <StubSection id="resources" title="Resources" />
      <StubSection id="blogs" title="Blogs" />
      <RoadmapsSection />
      <About />
    </>
  );
}

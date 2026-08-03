import { roadmaps } from "@/data/roadmaps";
import RoadmapCard from "@/components/roadmaps/RoadmapCard";

export const metadata = {
  title: "Roadmaps | Mohit Decodes",
  description: "Structured learning paths built from topics already covered on the Mohit Decodes channel.",
};

export default function RoadmapsIndexPage() {
  return (
    <section className="mx-auto max-w-[1120px] px-6 pt-6 pb-[clamp(40px,8vh,80px)] md:pt-12 lg:pt-[clamp(40px,8vh,80px)]">
      <h1 className="mb-3 font-heading text-[clamp(28px,4vw,40px)] font-bold text-foreground">
        Roadmaps
      </h1>
      <p className="mb-8 max-w-[640px] text-[15px] text-foreground/64">
        Pick a path. Every step links to a real Mohit Decodes tutorial.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {roadmaps.map((roadmap) => (
          <RoadmapCard key={roadmap.slug} roadmap={roadmap} />
        ))}
      </div>
    </section>
  );
}

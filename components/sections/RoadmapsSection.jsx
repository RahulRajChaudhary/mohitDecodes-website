import { roadmaps } from "@/data/roadmaps";
import RoadmapCard from "@/components/roadmaps/RoadmapCard";

export default function RoadmapsSection() {
  return (
    <section id="roadmaps" className="mx-auto max-w-[1120px] px-6 py-[clamp(40px,8vh,80px)]">
      <h2 className="mb-3 font-heading text-[clamp(24px,3vw,34px)] font-bold text-foreground">
        Roadmaps
      </h2>
      <p className="mb-7 max-w-[640px] text-[15px] text-foreground/64">
        Structured learning paths built from topics already covered on the channel.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {roadmaps.map((roadmap) => (
          <RoadmapCard key={roadmap.slug} roadmap={roadmap} />
        ))}
      </div>
    </section>
  );
}

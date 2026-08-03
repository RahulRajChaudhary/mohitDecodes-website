import Link from "next/link";
import { roadmaps } from "@/data/roadmaps";
import RoadmapCard from "@/components/roadmaps/RoadmapCard";

export default function RoadmapsSection() {
  return (
    <section id="roadmaps" className="mx-auto max-w-[1120px] px-6 pt-6 pb-[clamp(40px,8vh,80px)] md:pt-12 lg:pt-[clamp(40px,8vh,80px)]">
      <Link href="/roadmaps" className="mb-3 block w-fit no-underline">
        <h2 className="font-heading text-[clamp(24px,3vw,34px)] font-bold text-foreground transition-colors hover:text-accent">
          Roadmaps
        </h2>
      </Link>
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

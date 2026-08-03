import { notFound } from "next/navigation";
import { roadmaps } from "@/data/roadmaps";
import RoadmapTree from "@/components/roadmaps/RoadmapTree";

export function generateStaticParams() {
  return roadmaps.map((roadmap) => ({ slug: roadmap.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const roadmap = roadmaps.find((r) => r.slug === slug);

  if (!roadmap) return {};

  return {
    title: `${roadmap.title} Roadmap | Mohit Decodes`,
    description: roadmap.description,
  };
}

export default async function RoadmapPage({ params }) {
  const { slug } = await params;
  const roadmap = roadmaps.find((r) => r.slug === slug);

  if (!roadmap) {
    notFound();
  }

  const { nodes } = await import(`@/data/roadmaps/${slug}.js`);

  return (
    <section className="mx-auto max-w-[720px] px-6 pt-5 pb-[clamp(32px,6vh,64px)] md:pt-9 lg:pt-[clamp(32px,6vh,64px)]">
      <h1 className="mb-2 font-heading text-[clamp(28px,4vw,40px)] font-bold text-foreground">
        {roadmap.icon} {roadmap.title}
      </h1>
      <p className="mb-8 text-[15px] text-foreground/64">{roadmap.description}</p>
      <RoadmapTree nodes={nodes} />
    </section>
  );
}

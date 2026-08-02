import Link from "next/link";

export default function RoadmapCard({ roadmap }) {
  return (
    <Link
      href={`/roadmaps/${roadmap.slug}`}
      className="group flex flex-col gap-2 rounded-2xl border border-border bg-surface p-5 no-underline transition duration-300 ease-out hover:border-accent/40 hover:bg-surface-hover hover:shadow-lg motion-safe:hover:-translate-y-1"
    >
      <span className="text-2xl transition-transform duration-300 ease-out motion-safe:group-hover:scale-110">
        {roadmap.icon}
      </span>
      <span className="font-heading text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-accent">
        {roadmap.title}
      </span>
      <span className="text-[13px] leading-relaxed text-foreground/64">{roadmap.description}</span>
    </Link>
  );
}

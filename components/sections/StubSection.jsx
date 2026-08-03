import Link from "next/link";

export default function StubSection({ id, title, description = "Coming soon." }) {
  return (
    <section id={id} className="mx-auto max-w-[1120px] px-6 pt-6 pb-[clamp(40px,8vh,80px)] md:pt-12 lg:pt-[clamp(40px,8vh,80px)]">
      <Link href={`/${id}`} className="mb-3 block w-fit no-underline">
        <h2 className="font-heading text-[clamp(24px,3vw,34px)] font-bold text-foreground transition-colors hover:text-accent">
          {title}
        </h2>
      </Link>
      <p className="text-[15px] text-foreground/64">{description}</p>
    </section>
  );
}

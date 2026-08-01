export default function StubSection({ id, title, description = "Coming soon." }) {
  return (
    <section id={id} className="mx-auto max-w-[1120px] px-6 py-[clamp(40px,8vh,80px)]">
      <h2 className="mb-3 font-heading text-[clamp(24px,3vw,34px)] font-bold text-foreground">
        {title}
      </h2>
      <p className="text-[15px] text-foreground/64">{description}</p>
    </section>
  );
}

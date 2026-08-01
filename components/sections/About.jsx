"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import usePrefersReducedMotion from "@/lib/usePrefersReducedMotion";

export default function About() {
  const reduceMotion = usePrefersReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.3 } },
  };

  const panelVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: reduceMotion ? 0 : 0.4, ease: "easeOut" },
    },
  };

  const photoVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.5, ease: "easeOut" },
    },
  };

  const quoteVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.6,
        ease: "easeOut",
        delay: reduceMotion ? 0 : 0.15,
      },
    },
  };

  return (
    <section id="about" className="mx-auto max-w-[1120px] px-8 py-[clamp(40px,8vh,80px)]">
      <h2 className="font-heading text-[clamp(24px,3vw,34px)] font-bold text-foreground">
        Meet Your Mentor
      </h2>
      <p className="mt-3 max-w-[720px] text-[15px] leading-relaxed text-foreground/64">
        Engineering Manager at Paytm | React.js | Next.js | JavaScript | Python | Career Mentor
        | Founder @ Inkurb Web Solution | Co-Founder @ Webninjas | Ex-HCL
      </p>

      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[300px_1fr]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="relative mx-auto aspect-[3/4] w-full max-w-[clamp(220px,38vw,300px)] overflow-hidden"
        >
          <motion.div
            variants={panelVariants}
            className="absolute bottom-14 left-0 z-0 h-[60%] w-full rounded-2xl bg-surface"
          />
          <motion.div variants={photoVariants} className="absolute bottom-14 inset-0 z-10">
            <Image
              src="/images/about/mohit-cutout.png"
              alt="Mohit, MohitDecodes"
              fill
              sizes="(max-width: 768px) 300px, 320px"
              className="object-contain object-bottom"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={quoteVariants}
          className="text-center"
        >
          <blockquote className="font-heading text-[clamp(22px,2.6vw,32px)] font-semibold leading-snug text-foreground">
            "Attention comes from interest; thus, teachers need to make learning interesting to their students."
          </blockquote>
          <p className="mx-auto mt-6 max-w-[480px] text-[15px] leading-relaxed text-foreground/64">
            -Mohit Kumar, Founder of MohitDecodes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

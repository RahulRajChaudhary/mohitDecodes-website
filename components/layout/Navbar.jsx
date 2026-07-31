"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Videos", href: "/#videos" },
  { label: "Resources", href: "/#resources" },
  { label: "Blogs", href: "/#blogs" },
  { label: "Roadmaps", href: "/#roadmaps" },
  { label: "About", href: "/#about" },
];

const DOCK_RANGE = [0, 120];
const DOCKED_WIDTH = 1120; // wide enough for 7 links + Topmate + utility buttons
const FULL_WIDTH = 1600; // approximation of "full screen" on typical monitors

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const { scrollY } = useScroll();

  // Continuous, live scroll mapping — no lock, no memory. Reflects
  // wherever scrollY actually is right now, on whatever page you're on,
  // in both directions. A fresh page load legitimately starts at 0
  // (full width) even if the previous page was scrolled/docked.
  // Each raw transform is piped through useSpring so instant jumps in
  // scrollY (e.g. Next.js resetting scroll to 0 on navigation) animate
  // smoothly toward the new value instead of snapping in one frame.
  const spring = { stiffness: 260, damping: 32 };
  const maxWidth = useSpring(
    useTransform(scrollY, DOCK_RANGE, [FULL_WIDTH, DOCKED_WIDTH]),
    spring
  );
  const borderRadius = useSpring(
    useTransform(scrollY, DOCK_RANGE, [0, 9999]),
    spring
  );
  const marginTop = useSpring(
    useTransform(scrollY, DOCK_RANGE, [0, 16]),
    spring
  );
  const bgOpacity = useSpring(
    useTransform(scrollY, DOCK_RANGE, [0, 1]),
    spring
  );

  return (
    <header className="sticky top-0 z-50 px-4">
      <motion.div
        style={{ maxWidth, borderRadius, marginTop }}
        className="relative mx-auto flex h-16 w-full items-center justify-between px-6"
      >
        <motion.div
          aria-hidden="true"
          style={{ opacity: bgOpacity, borderRadius: "inherit" }}
          className="absolute inset-0 border border-border bg-surface/80 shadow-lg backdrop-blur"
        />

        <Link
          href="/"
          className="relative z-10 font-heading text-lg font-semibold"
        >
          MohitDecodes
        </Link>

        <nav
          aria-label="Main"
          className="relative z-10 hidden md:flex md:items-center md:gap-1"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.label)}
              className="relative rounded-full px-3 py-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              <span className="relative z-10">{link.label}</span>
              {hoveredLink === link.label && (
                <motion.div
                  layoutId="nav-hover"
                  className="absolute inset-0 rounded-full bg-surface-hover"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </Link>
          ))}
          <a
            href="https://topmate.io/mohitdecodes"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 rounded-full border border-current px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover"
          >
            Topmate
          </a>
        </nav>

        <div className="relative z-10 flex items-center gap-1">
          <button
            type="button"
            aria-label="Search"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-surface-hover"
          >
            <FiSearch size={20}  />
          </button>

          <ThemeToggle />

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-surface-hover md:hidden"
          >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </motion.div>

      {isOpen && (
        <nav
          aria-label="Mobile"
          className="relative z-10 mx-auto flex max-w-4xl flex-col gap-1 border-t border-border bg-surface/80 px-4 py-4 backdrop-blur md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-md px-2 py-2 text-sm text-foreground/80 transition-colors hover:bg-surface-hover hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://topmate.io/mohitdecodes"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="mt-1 rounded-md border border-current px-3 py-2 text-center text-sm font-medium text-foreground"
          >
            Topmate
          </a>
        </nav>
      )}
    </header>
  );
}

import Link from "next/link";
import {
  FiYoutube,
  FiLinkedin,
  FiInstagram,
  FiFacebook,
  FiMessageCircle,
} from "react-icons/fi";
import { socials } from "@/data/socials";
import { legalLinks, learnLinks } from "@/data/footerLinks";
import { pagesLinks } from "@/data/footerLinks";

const iconMap = {
  Youtube: FiYoutube,
  Linkedin: FiLinkedin,
  Instagram: FiInstagram,
  Facebook: FiFacebook,
  MessageCircle: FiMessageCircle,
};



export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:grid-cols-4">
          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">
              Connect
            </h3>
            <div className="mt-4 flex flex-col gap-3">
              {socials.map((social) => {
                let Icon = iconMap[social.icon];
                if (!Icon) return null;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    <Icon size={18} />
                    {social.name}
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">
              Pages
            </h3>
            <ul className="mt-4 space-y-2">
              {pagesLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">
              Learn
            </h3>
            <ul className="mt-4 space-y-2">
              {learnLinks.map((link) => {
                const isExternal = link.href.startsWith("http");
                return (
                  <li key={link.href}>
                    {isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-foreground/60">
          © {new Date().getFullYear()} MohitDecodes. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

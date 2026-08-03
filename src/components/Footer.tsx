import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold tracking-[0.08em] text-text-primary">
            DEVAN<span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-xs text-text-tertiary">
            The Eye of UJ — built and maintained by Ujwal Shyam Kantimohanthy.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/kantimohanthy"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-text-tertiary transition-colors hover:text-text-primary"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com/in/ujwalshyam-kantimohanthy"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-text-tertiary transition-colors hover:text-text-primary"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href="mailto:hello@kantimohanthy.dev"
            aria-label="Email"
            className="text-text-tertiary transition-colors hover:text-text-primary"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

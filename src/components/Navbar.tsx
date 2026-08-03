"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, HIDDEN_NAV_ITEM } from "@/data/nav";
import { SearchBar } from "@/components/ui/SearchBar";

export function Navbar() {
  const [active, setActive] = React.useState<string>(NAV_ITEMS[0].id);
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function goTo(id: string) {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border border-border px-4 py-2.5 transition-colors duration-300",
          scrolled ? "bg-background-secondary/80 backdrop-blur-xl" : "bg-background-secondary/40 backdrop-blur-lg"
        )}
      >
        <button
          onClick={() => goTo("top")}
          className="shrink-0 text-sm font-semibold tracking-[0.08em] text-text-primary"
        >
          DEVAN<span className="text-accent">.</span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => goTo(item.id)}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-200",
                  active === item.id ? "text-text-primary" : "text-text-tertiary hover:text-text-secondary"
                )}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-surface"
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => goTo(HIDDEN_NAV_ITEM.id)}
            aria-label="A quieter page"
            className="hidden px-1.5 text-[11px] font-medium tracking-wide text-text-tertiary/50 transition-colors duration-300 hover:text-accent sm:block"
          >
            {HIDDEN_NAV_ITEM.label}
          </button>
          <div className="hidden sm:block">
            <SearchBar />
          </div>
          <button
            className="rounded-full border border-border px-3 py-1.5 text-xs text-text-secondary lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation"
          >
            Menu
          </button>
        </div>
      </motion.nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute left-4 right-4 top-16 rounded-2xl border border-border bg-background-secondary/95 p-2 backdrop-blur-xl lg:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className={cn(
                "block w-full rounded-lg px-3 py-2.5 text-left text-sm",
                active === item.id ? "bg-surface text-text-primary" : "text-text-secondary"
              )}
            >
              {item.label}
            </button>
          ))}
        </motion.div>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Camera, FileText, FlaskConical, House, Layers, Mail, Orbit, Send, User } from "lucide-react";
import { person } from "@/content";

type View = "home" | "work" | "research" | "beyond" | "about" | "contact";

/** Maps every anchor id on the home page to the view that contains it. */
const HASH_TO_VIEW: Record<string, View> = {
  "": "home",
  hero: "home",
  work: "work",
  research: "research",
  thinking: "research",
  beyond: "beyond",
  about: "about",
  experience: "about",
  contact: "contact",
};

/** Runs before first paint so the right view is shown without a flash. */
export const VIEW_INIT_SCRIPT = `(function(){try{var m=${JSON.stringify(HASH_TO_VIEW)};var h=location.hash.slice(1);var d=document.documentElement;d.setAttribute("data-views","1");d.setAttribute("data-view",m[h]||"home");}catch(e){}})();`;

const VIEW_ITEMS: { view: View; label: string; href: string; Icon: ComponentType<{ className?: string; strokeWidth?: number }> }[] = [
  { view: "home", label: "Home", href: "/#hero", Icon: House },
  { view: "work", label: "Work", href: "/#work", Icon: Layers },
  { view: "research", label: "Research", href: "/#research", Icon: FlaskConical },
  { view: "beyond", label: "Beyond the code", href: "/#beyond", Icon: Camera },
  { view: "about", label: "About", href: "/#about", Icon: User },
  { view: "contact", label: "Contact", href: "/#contact", Icon: Mail },
];

const EXTRA_ITEMS = [
  { key: "atlas", label: "DEVAN Atlas", href: "/atlas/", Icon: Orbit },
  { key: "cv", label: "CV", href: "/cv/", Icon: FileText },
];

function viewFromHash(): View {
  return HASH_TO_VIEW[window.location.hash.slice(1)] ?? "home";
}

function DockIcon({
  mouseX,
  magnify,
  children,
}: {
  mouseX: MotionValue<number>;
  magnify: boolean;
  children: (ref: React.RefObject<HTMLDivElement | null>) => React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (x) => {
    const b = ref.current?.getBoundingClientRect();
    return b ? x - (b.x + b.width / 2) : 999;
  });
  const scaleRaw = useTransform(distance, [-110, 0, 110], magnify ? [1, 1.45, 1] : [1, 1, 1]);
  const scale = useSpring(scaleRaw, { mass: 0.1, stiffness: 180, damping: 14 });
  return (
    <motion.div ref={ref} style={{ scale, transformOrigin: "bottom center" }} className="relative">
      {children(ref)}
    </motion.div>
  );
}

export function ViewDock() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [active, setActive] = useState<View>("home");
  const mouseX = useMotionValue(Infinity);
  const onHome = pathname === "/";
  const [hello, setHello] = useState(false);
  const helloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hello) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setHello(false);
    const onDown = (e: MouseEvent) => {
      if (helloRef.current && !helloRef.current.contains(e.target as Node)) setHello(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, [hello]);

  const prevView = useRef<View>("home");
  const apply = useCallback((v: View, scrollTop = true) => {
    const order: View[] = ["home", "work", "research", "beyond", "about", "contact"];
    document.documentElement.setAttribute("data-dir", order.indexOf(v) >= order.indexOf(prevView.current) ? "fwd" : "back");
    prevView.current = v;
    document.documentElement.setAttribute("data-view", v);
    setActive(v);
    if (scrollTop) window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // Keep the view in step with the URL hash: first load, back/forward, header links.
  useEffect(() => {
    if (!onHome) return;
    apply(viewFromHash(), false);
    const id = window.location.hash.slice(1);
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    const onHash = () => {
      apply(viewFromHash());
      const target = window.location.hash.slice(1);
      if (target && target !== "hero") requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView());
    };
    window.addEventListener("hashchange", onHash);
    window.addEventListener("popstate", onHash);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("popstate", onHash);
    };
  }, [onHome, apply]);

  const go = (e: React.MouseEvent, item: (typeof VIEW_ITEMS)[number]) => {
    if (!onHome) return; // normal navigation to /#view
    e.preventDefault();
    window.history.pushState(null, "", item.href.replace("/", ""));
    apply(item.view);
  };

  return (
    <nav
      aria-label="Sections"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] print:hidden"
    >
      <motion.ul
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="pointer-events-auto flex items-end gap-1 rounded-2xl border border-ivory/15 bg-[#14120f]/80 px-2 py-2 shadow-[0_18px_50px_rgba(0,0,0,0.55)] backdrop-blur-xl"
      >
        {VIEW_ITEMS.map((item) => {
          const isActive = onHome && active === item.view;
          return (
            <li key={item.view}>
              <DockIcon mouseX={mouseX} magnify={!reduced}>
                {() => (
                  <Link
                    href={item.href}
                    onClick={(e) => go(e, item)}
                    aria-label={item.label}
                    aria-current={isActive ? "page" : undefined}
                    className="group relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors hover:bg-ivory/10 focus-visible:outline-2 focus-visible:outline-[#F2A65A] sm:h-12 sm:w-12"
                  >
                    <item.Icon className={`h-[22px] w-[22px] transition-colors ${isActive ? "text-[#F2A65A]" : "text-ivory-2 group-hover:text-ivory"}`} strokeWidth={1.7} />
                    <span aria-hidden="true" className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-ivory/15 bg-[#14120f] px-2 py-1 font-mono text-[11px] text-ivory opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      {item.label}
                    </span>
                    {isActive && <span aria-hidden="true" className="absolute -bottom-1 h-1 w-1 rounded-full bg-[#F2A65A]" />}
                  </Link>
                )}
              </DockIcon>
            </li>
          );
        })}
        <li aria-hidden="true" className="mx-1 hidden h-7 w-px self-center bg-ivory/15 sm:block" />
        {EXTRA_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href.replace(/\/$/, ""));
          return (
            <li key={item.key} className="hidden sm:block">
              <DockIcon mouseX={mouseX} magnify={!reduced}>
                {() => (
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    aria-current={isActive ? "page" : undefined}
                    className="group relative flex h-12 w-12 items-center justify-center rounded-xl transition-colors hover:bg-ivory/10 focus-visible:outline-2 focus-visible:outline-[#F2A65A]"
                  >
                    <item.Icon className={`h-[22px] w-[22px] transition-colors ${isActive ? "text-[#F2A65A]" : "text-ivory-2 group-hover:text-ivory"}`} strokeWidth={1.7} />
                    <span aria-hidden="true" className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-ivory/15 bg-[#14120f] px-2 py-1 font-mono text-[11px] text-ivory opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      {item.label}
                    </span>
                    {isActive && <span aria-hidden="true" className="absolute -bottom-1 h-1 w-1 rounded-full bg-[#F2A65A]" />}
                  </Link>
                )}
              </DockIcon>
            </li>
          );
        })}
        <li aria-hidden="true" className="mx-1 h-7 w-px self-center bg-ivory/15" />
        <li ref={helloRef as unknown as React.Ref<HTMLLIElement>} className="relative">
          <button
            type="button"
            onClick={() => setHello((v) => !v)}
            aria-expanded={hello}
            aria-controls="quick-connect"
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#F2A65A] px-3 font-mono text-[13px] font-medium text-[#11100E] transition-colors hover:bg-[#F2EBDC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2EBDC] sm:h-12 sm:px-4"
          >
            <Send className="h-[18px] w-[18px]" strokeWidth={1.9} aria-hidden="true" />
            <span className="hidden sm:inline">Say hello</span>
            <span className="sr-only sm:hidden">Say hello</span>
          </button>
          {hello && (
            <div
              id="quick-connect"
              role="group"
              aria-label="Contact me"
              className="absolute bottom-[calc(100%+0.75rem)] right-0 w-[min(20rem,calc(100vw-1.5rem))] rounded-2xl border border-ivory/15 bg-[#14120f]/95 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            >
              <p className="display text-[20px] leading-snug text-ivory">Software, networks or applied AI?</p>
              <p className="mt-1 text-[14px] text-ivory-2">I answer every message.</p>
              <ul className="mt-3 divide-y divide-ivory/10 border-y border-ivory/10 text-[14.5px]">
                <li><a href={`mailto:${person.email}`} className="flex min-h-[44px] items-center justify-between gap-3 text-ivory hover:text-[#F2A65A]"><span>Email</span><span className="font-mono text-[12.5px] text-ivory-3">{person.email}</span></a></li>
                <li><a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="flex min-h-[44px] items-center justify-between text-ivory hover:text-[#F2A65A]"><span>LinkedIn</span><span aria-hidden="true">↗</span></a></li>
                <li><a href={person.github} target="_blank" rel="noopener noreferrer" className="flex min-h-[44px] items-center justify-between text-ivory hover:text-[#F2A65A]"><span>GitHub</span><span aria-hidden="true">↗</span></a></li>
                <li><Link href="/cv/" className="flex min-h-[44px] items-center justify-between text-ivory hover:text-[#F2A65A]"><span>CV</span><span aria-hidden="true">→</span></Link></li>
              </ul>
            </div>
          )}
        </li>
      </motion.ul>
    </nav>
  );
}

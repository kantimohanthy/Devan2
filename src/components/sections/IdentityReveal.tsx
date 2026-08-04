"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, X } from "lucide-react";
import { identity } from "@/data/content";

export function IdentityReveal() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white">
          {identity.name}
        </h1>
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          aria-label={expanded ? "Hide mission" : "Show mission"}
          className="shrink-0 grid place-items-center w-9 h-9 rounded-full border border-white/15 text-white/60 hover:border-blue-400 hover:text-blue-400 transition-colors cursor-pointer bg-white/5 backdrop-blur-sm"
        >
          {expanded ? <X size={16} /> : <Info size={16} />}
        </button>
      </div>

      <p className="mt-2 text-white/50 font-mono text-sm">
        {identity.role}
      </p>

      <AnimatePresence>
        {expanded && (
          <motion.p
            key="mission"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mt-3 text-white/80 leading-relaxed text-sm overflow-hidden border-l-2 border-blue-500/40 pl-4 py-1"
          >
            {identity.mission}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

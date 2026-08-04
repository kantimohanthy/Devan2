"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { identity } from "@/data/content";

export function IdentityReveal() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white">
        {identity.name}
      </h1>
      <p className="mt-2 text-white/50 font-mono text-sm">
        {identity.role}
      </p>

      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-4 text-sm font-mono text-blue-400 hover:underline inline-flex items-center gap-1 transition-colors"
      >
        {expanded ? "close ↑" : "why →"}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-white/80 leading-relaxed text-sm overflow-hidden border-l-2 border-blue-500/40 pl-4 py-1"
          >
            {identity.mission}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

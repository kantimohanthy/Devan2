"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { identity } from "@/data/content";

export function PrincipleCards() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {identity.principles.map((p, i) => {
        const open = openIndex === i;
        return (
          <motion.button
            key={p.title}
            layout
            onClick={() => setOpenIndex(open ? null : i)}
            className="text-left rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-blue-500/40 transition-colors backdrop-blur-sm cursor-pointer"
          >
            <motion.div layout="position" className="flex items-center justify-between">
              <span className="text-xs font-mono text-blue-400 font-semibold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-xs text-white/40">{open ? "−" : "+"}</span>
            </motion.div>
            <motion.h3 layout="position" className="mt-2 font-mono text-sm text-white font-semibold">
              {p.title}
            </motion.h3>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="mt-3 text-xs text-white/70 leading-relaxed border-t border-white/10 pt-3"
              >
                <p>{p.description}</p>
                {p.related && (
                  <span className="block mt-2.5 text-[11px] font-mono text-blue-400 font-medium">
                    → {p.related.kind}: {p.related.ref}
                  </span>
                )}
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

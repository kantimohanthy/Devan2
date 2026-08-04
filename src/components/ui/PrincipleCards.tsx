"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gauge, AlertTriangle, Layers, Network } from "lucide-react";
import { identity } from "@/data/content";

const ICONS = [Gauge, AlertTriangle, Layers, Network];

export function PrincipleCards() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {identity.principles.map((p, i) => {
        const open = openIndex === i;
        const Icon = ICONS[i % ICONS.length];
        return (
          <motion.button
            key={p.title}
            layout
            type="button"
            onClick={() => setOpenIndex(open ? null : i)}
            className="text-left rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-blue-500/40 transition-colors backdrop-blur-sm cursor-pointer"
          >
            <motion.div layout="position" className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Icon size={16} className="text-blue-400 shrink-0" />
                <h3 className="font-mono text-sm text-white font-semibold">
                  {p.title}
                </h3>
              </div>
              <span className="text-xs text-white/40 font-mono">{open ? "−" : "+"}</span>
            </motion.div>
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

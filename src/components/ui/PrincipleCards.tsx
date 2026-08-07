"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gauge, AlertTriangle, Layers, Network } from "lucide-react";
import { identityClient } from "@/lib/api-client";
import type { IdentityViewModel } from "@/services/identity.service";

const ICONS = [Gauge, AlertTriangle, Layers, Network];

export function PrincipleCards() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [profile, setProfile] = useState<IdentityViewModel | null>(null);

  useEffect(() => {
    identityClient.getProfile().then(setProfile).catch(console.error);
  }, []);

  if (!profile) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {profile.principles.map((p, i) => {
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
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

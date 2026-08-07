"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import type { Artifact } from "@/data/artifact-schema";
import { ProjectGlyph } from "@/components/ui/ProjectGlyph";

const STATUS_COLOR: Record<Artifact["status"], string> = {
  planned: "var(--text-dim)",
  building: "var(--signal-amber)",
  completed: "var(--signal-blue)",
};

const DIFFICULTY_DOTS: Record<Artifact["difficulty"], number> = {
  "warm-up": 1,
  solid: 2,
  hard: 3,
  brutal: 4,
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-[var(--hairline)] pt-6 mt-6">
      <p className="text-xs font-mono uppercase tracking-wide text-[var(--text-dim)] mb-3">
        {title}
      </p>
      {children}
    </div>
  );
}

export function ArtifactView({ artifact }: { artifact: Artifact }) {
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const statusColor = STATUS_COLOR[artifact.status];

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto py-16 px-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: statusColor }}
            />
            <span
              className="text-xs font-mono uppercase"
              style={{ color: statusColor }}
            >
              {artifact.status}
            </span>
            <span className="text-xs text-[var(--text-dim)]">·</span>
            <span className="flex gap-1">
              {Array.from({ length: 4 }, (_, i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor:
                      i < DIFFICULTY_DOTS[artifact.difficulty]
                        ? "var(--signal-blue)"
                        : "var(--text-faint)",
                  }}
                />
              ))}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-medium text-[var(--text)]">
            {artifact.title}
          </h1>
          <p className="text-[var(--text-dim)] mt-2">{artifact.summary}</p>
        </div>
        <div className="w-24 shrink-0">
          <ProjectGlyph
            slug={artifact.id}
            domainCount={artifact.relatedConcepts.length}
          />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mt-4">
        {artifact.tags.map((t) => (
          <span
            key={t}
            className="text-xs font-mono px-2.5 py-1 rounded-full border border-[var(--hairline)] text-[var(--text-dim)]"
          >
            {t}
          </span>
        ))}
      </div>

      <Section title="Why">
        <p className="text-[var(--text)]/90 text-sm leading-relaxed">
          {artifact.motivation}
        </p>
      </Section>

      <Section title="The problem">
        <p className="text-[var(--text)]/90 text-sm leading-relaxed">
          {artifact.problem}
        </p>
      </Section>

      {artifact.architecture.length > 0 && (
        <Section title="Architecture">
          <div className="space-y-3">
            {artifact.architecture.map((a) => (
              <div key={a.component} className="flex gap-3">
                <span className="font-mono text-sm text-[var(--signal-blue)] shrink-0">
                  {a.component}
                </span>
                <span className="text-sm text-[var(--text-dim)]">
                  {a.description}
                </span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {artifact.benchmarks.length > 0 && (
        <Section title="Measured">
          <div className="grid grid-cols-2 gap-4">
            {artifact.benchmarks.map((b) => (
              <div
                key={b.metric}
                className="rounded-xl border border-[var(--hairline)] bg-[var(--surface-quiet)] p-3.5"
              >
                <p className="text-2xl font-mono text-[var(--text)]">{b.value}</p>
                <p className="text-xs text-[var(--text-dim)] mt-1">{b.metric}</p>
                <p className="text-xs text-[var(--text-faint)] mt-1">{b.context}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {artifact.lessonsLearned.length > 0 && (
        <Section title="What broke, what I'd change">
          <div className="space-y-2">
            {artifact.lessonsLearned.map((lesson, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setExpandedLesson(expandedLesson === i ? null : i)}
                className="w-full text-left text-sm text-[var(--text)]/90 leading-relaxed hover:text-[var(--signal-blue)] transition-colors cursor-pointer"
              >
                → {lesson}
              </button>
            ))}
          </div>
        </Section>
      )}

      {artifact.relatedConcepts.length > 0 && (
        <Section title="Connects to">
          <div className="flex gap-2 flex-wrap">
            {artifact.relatedConcepts.map((conceptId) => (
              <a
                key={conceptId}
                href={`/knowledge/${conceptId}`}
                className="text-xs font-mono px-3 py-1.5 rounded-full border border-[var(--signal-blue)]/30 text-[var(--signal-blue)] hover:bg-[var(--signal-blue)]/10 transition-colors uppercase"
              >
                {conceptId}
              </a>
            ))}
          </div>
        </Section>
      )}

      <Section title="Links">
        <div className="flex gap-4 flex-wrap text-sm font-mono">
          {artifact.repository && (
            <a
              href={artifact.repository}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--signal-blue)] hover:underline"
            >
              Repository →
            </a>
          )}
          {artifact.liveDemo && (
            <a
              href={artifact.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--signal-blue)] hover:underline"
            >
              Live demo →
            </a>
          )}
        </div>
      </Section>
    </motion.article>
  );
}

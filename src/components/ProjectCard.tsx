"use client";

import * as React from "react";
import { FileText, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GithubIcon } from "@/components/icons";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { DomainMotif } from "@/components/motion/DomainMotif";
import { ProjectGlyph } from "@/components/ui/ProjectGlyph";
import type { Project } from "@/data/types";

const statusTone: Record<Project["status"], "success" | "warning" | "accent" | "neutral"> = {
  Live: "success",
  Shipped: "success",
  "In build": "warning",
  Submitted: "accent",
};

export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  return (
    <>
      <Card
        className="group flex h-full flex-col overflow-hidden p-0 border border-[var(--hairline)] bg-[var(--surface)]"
        style={project.atmosphere ? { borderTopColor: project.atmosphere.tint } : undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="h-[3px] w-full"
          style={{ backgroundColor: project.atmosphere?.tint ?? "#4F8CFF" }}
          aria-hidden
        />
        <div className="relative border-b border-[var(--hairline)] bg-[var(--surface-quiet)] p-2">
          <ProjectGlyph slug={project.slug} domainCount={project.domain.length} />
          <DomainMotif domain={project.domain[0]} className="rounded-none opacity-40" />
          {project.atmosphere && (
            <span
              className="absolute right-3 top-3 rounded-full border border-white/10 bg-background/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide backdrop-blur-sm"
              style={{ color: project.atmosphere.tint }}
            >
              {project.atmosphere.label}
            </span>
          )}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex flex-col justify-center bg-[var(--surface)]/95 px-5 backdrop-blur-sm z-10"
              >
                <p className="mb-2 text-[10px] font-mono font-medium uppercase tracking-wide text-[var(--text-dim)]">
                  Architecture
                </p>
                <ol className="space-y-1">
                  {project.architecture.slice(0, 3).map((step, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.05 }}
                      className="flex gap-2 text-xs leading-snug text-text-secondary"
                    >
                      <span className="text-accent">{i + 1}.</span>
                      {step}
                    </motion.li>
                  ))}
                </ol>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-text-primary">{project.title}</h3>
            <Tag tone={statusTone[project.status]}>{project.status}</Tag>
          </div>
          <p className="mb-4 text-sm text-text-secondary">{project.tagline}</p>
          <p className="mb-5 flex-1 text-sm leading-relaxed text-text-secondary">
            {project.problem}
          </p>
          <div className="mb-5 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 3).map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
            {project.stack.length > 3 && <Tag>+{project.stack.length - 3}</Tag>}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
              <FileText className="h-3.5 w-3.5" />
              Case study
            </Button>
            <Button variant="ghost" size="sm">
              <GithubIcon className="h-3.5 w-3.5" />
              Repository
            </Button>
          </div>
        </div>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title={project.title}>
        <div className="max-h-[60vh] space-y-5 overflow-y-auto pr-1">
          <div>
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-text-tertiary">
              Problem
            </p>
            <p className="text-sm leading-relaxed text-text-secondary">{project.problem}</p>
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-text-tertiary">
              Solution
            </p>
            <p className="text-sm leading-relaxed text-text-secondary">{project.solution}</p>
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-text-tertiary">
              Architecture
            </p>
            <ol className="space-y-1.5">
              {project.architecture.map((step, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-text-secondary">
                  <span className="text-text-tertiary">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-text-tertiary">
              Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <Tag key={s} tone="accent">
                  {s}
                </Tag>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-text-tertiary">
              What I learned
            </p>
            <p className="text-sm leading-relaxed text-text-secondary">{project.lessons}</p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
          >
            View repository
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </Modal>
    </>
  );
}

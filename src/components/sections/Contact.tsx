"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { contact } from "@/data/content";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-border px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-accent"
        >
          12 · Get in touch
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-balance text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl"
        >
          {contact.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary"
        >
          {contact.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-text-primary px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-white"
          >
            <Mail className="h-4 w-4" />
            {contact.email}
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-3 text-sm text-text-secondary transition-colors hover:border-text-secondary hover:text-text-primary"
          >
            <LinkedinIcon className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-3 text-sm text-text-secondary transition-colors hover:border-text-secondary hover:text-text-primary"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
        </motion.div>

        <p className="mt-6 text-xs text-text-tertiary">{contact.schedulingNote}</p>
      </div>
    </section>
  );
}

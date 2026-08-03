import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { articles } from "@/data/content";

export function Writing() {
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a !== featured);

  return (
    <Section
      id="writing"
      eyebrow="07 · Writing"
      reveal="wipe"
      title="Build logs and field notes"
      description="Short, specific writing about decisions made while building — not general commentary."
    >
      <Card
        as="a"
        className="group mb-8 block overflow-hidden p-8 transition-transform duration-300 hover:-translate-y-0.5 sm:p-10"
        href="#"
      >
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.16em] text-text-tertiary">
          Featured
        </p>
        <Tag tone="accent">{featured.category}</Tag>
        <h3 className="mt-5 max-w-3xl text-3xl font-semibold leading-[1.15] tracking-tight text-text-primary transition-colors duration-300 group-hover:text-accent sm:text-4xl">
          {featured.title}
        </h3>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
          {featured.dek}
        </p>
        <div className="mt-6 flex items-center gap-3 border-t border-border pt-5 text-xs text-text-tertiary">
          <span>By Ujwal Shyam Kantimohanthy</span>
          <span>·</span>
          <span>{featured.date}</span>
          <span>·</span>
          <span>{featured.readTime} read</span>
        </div>
      </Card>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
        {rest.map((article) => (
          <Card
            as="a"
            key={article.title}
            href="#"
            className="group flex h-full flex-col rounded-none border-none bg-surface p-6 transition-colors duration-300 hover:bg-background-secondary"
          >
            <Tag>{article.category}</Tag>
            <h4 className="mt-3 flex-1 text-base font-semibold leading-snug text-text-primary transition-colors duration-300 group-hover:text-accent">
              {article.title}
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">{article.dek}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-text-tertiary">
              <span>{article.readTime} read</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

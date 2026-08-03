import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(2).max(100),

  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),

  summary: z.string().min(10).max(300),

  description: z.string().min(20),

  featured: z.boolean().default(false),

  github: z.string().url().optional(),

  liveDemo: z.string().url().optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
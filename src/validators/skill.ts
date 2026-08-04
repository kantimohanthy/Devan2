import { z } from "zod";

export const createSkillSchema = z.object({
  name: z.string().min(2).max(100),

  category: z.string().min(2).max(100),

  level: z.number().int().min(1).max(10),
});

export const updateSkillSchema = createSkillSchema.partial();

export type CreateSkillInput = z.infer<typeof createSkillSchema>;

export type UpdateSkillInput = z.infer<typeof updateSkillSchema>;

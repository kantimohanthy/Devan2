import { z } from "zod";

export const createExperienceSchema = z.object({
  company: z.string().min(2).max(100),

  role: z.string().min(2).max(100),

  description: z.string().min(20),

  startDate: z.coerce.date(),

  endDate: z.coerce.date().optional(),

  current: z.boolean().default(false),
});

export type CreateExperienceInput = z.infer<
  typeof createExperienceSchema
>;
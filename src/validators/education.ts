import { z } from "zod";

export const createEducationSchema = z.object({
  institution: z.string().min(2).max(150),

  degree: z.string().min(2).max(150),

  field: z.string().min(2).max(150),

  startYear: z.number().int().min(1900),

  endYear: z.number().int().min(1900).optional(),
});

export const updateEducationSchema =
  createEducationSchema.partial();

export type CreateEducationInput =
  z.infer<typeof createEducationSchema>;

export type UpdateEducationInput =
  z.infer<typeof updateEducationSchema>;
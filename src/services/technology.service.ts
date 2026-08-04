import { z } from "zod";

export const createTechnologySchema = z.object({
  name: z.string().min(2).max(100),

  icon: z.string().optional(),
});

export const updateTechnologySchema =
  createTechnologySchema.partial();

export type CreateTechnologyInput =
  z.infer<typeof createTechnologySchema>;

export type UpdateTechnologyInput =
  z.infer<typeof updateTechnologySchema>;
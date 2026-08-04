import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2).max(100),

  email: z.email(),

  headline: z.string().max(150).optional(),

  bio: z.string().max(2000).optional(),

  location: z.string().max(100).optional(),

  website: z.url().optional(),

  avatar: z.url().optional(),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
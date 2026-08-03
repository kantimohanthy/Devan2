import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),

  email: z.string().email("Invalid email address"),

  headline: z.string().max(150).optional(),

  bio: z.string().max(2000).optional(),

  location: z.string().max(100).optional(),

  website: z.string().url("Invalid website URL").optional(),

  avatar: z.string().url("Invalid avatar URL").optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
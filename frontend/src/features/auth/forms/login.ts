import {z} from "zod";

export const loginFormSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters")
    .max(25, "Password must be at most 25 characters"),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

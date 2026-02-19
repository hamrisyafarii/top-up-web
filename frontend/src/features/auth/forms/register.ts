import z from "zod";

export const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(25, "Username must be at most 25 characters"),
  email: z.email(),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters")
    .max(25, "Password must be at most 25 characters"),
});

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;

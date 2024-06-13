import { z } from "zod";

const createServiceValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    duration: z.number(),
    isDeleted: z.enum(["true", "false"]).optional(),
  }),
});

export const serviceValidation = { createServiceValidationSchema };

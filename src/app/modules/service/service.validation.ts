import { z } from "zod";

const createServiceValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    category: z.enum(["basic wash", "interior detailing", "exterior shine", "engine cleaning", "headlight restoration", "full service"]),
    price: z.number(),
    duration: z.number(),
    isDeleted: z.boolean().optional(),
  }),
});
const updateServiceValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    duration: z.number().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const serviceValidation = { createServiceValidationSchema,updateServiceValidationSchema };

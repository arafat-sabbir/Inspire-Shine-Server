import { z } from "zod";
const createSlotValidationSchema = z.object({
  body: z.object({
    service: z.string().optional(),
    date: z.date(),
    startDate: z.date(),
    endDate: z.date(),
    idBooked: z.enum(["available", "booked", "canceled"]),
  }),
});

export const slotValidation = { createSlotValidationSchema };

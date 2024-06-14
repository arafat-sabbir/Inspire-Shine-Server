import { z } from "zod";

const createSlotValidationSchema = z.object({
  body: z.object({
    service: z.string().optional(),
    date: z
      .string()
      .refine(
        (time) => /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(time),
        {
          message: "Invalid Date format, expected YYYY-MM-DD",
        }
      ),
    startTime: z
      .string()
      .refine((time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time), {
        message: "Invalid startTime format, expected HH:MM",
      }),
    endTime: z
      .string()
      .refine((time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time), {
        message: "Invalid endTime format, expected HH:MM",
      }),
    isBooked: z.enum(["available", "booked", "canceled"]).optional(),
  }),
});

export const slotValidation = { createSlotValidationSchema };

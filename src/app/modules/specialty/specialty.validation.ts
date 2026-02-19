import z from "zod";

export const createSpecialtyValidation = z.object({
    title: z.string(),
    description: z.string().optional()
});

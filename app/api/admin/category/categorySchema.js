
import { z } from "zod";

export const categorySchema = z.object({
    name: z.string().min(2, { message: "Name should be at least 2 characters long" }),
    slug: z.string(),
    banner: z.string()
        .nullable().optional(),
    picture: z.string()
        .nullable().optional(),
    status: z.string(),
});




import { z } from "zod";

export const categorySchema = z.object({
    name: z.string().min(2, { message: "Name should be at least 2 characters long" }),
    slug: z.string(),
    banner: z.file()
        .mime(["image/png", "image/jpeg"])
        .max(2 * 1024 * 1024)
        .nullable().optional(),
    picture: z.file()
        .mime(["image/png", "image/jpeg"])
        .max(2 * 1024 * 1024)
        .nullable().optional(),
    status: z.string(),
});




import { z } from "zod";

export const categorySchema = z.object({
    name: z.string(),
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


